import React, { useState, useRef, useCallback, useEffect } from "react";

const Draggable = ({
    children,
    className,
    currentRef,
    onDrag,
    style,
    id,
    startingPos,
    constrainToParent = true, // Option to disable boundary constraints
    ...props
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

    const dragRef = currentRef || useRef();

    const getConstrainedPosition = useCallback(
        (newX, newY) => {
            if (!constrainToParent || !dragRef.current?.parentElement) {
                return { x: newX, y: newY };
            }

            const container =
                dragRef.current.parentElement.getBoundingClientRect();
            const element = dragRef.current.getBoundingClientRect();

            // Convert to relative coordinates within the container
            const containerStyle = window.getComputedStyle(
                dragRef.current.parentElement
            );
            const containerPaddingLeft =
                parseInt(containerStyle.paddingLeft, 10) || 0;
            const containerPaddingTop =
                parseInt(containerStyle.paddingTop, 10) || 0;

            const maxX = container.width - element.width - containerPaddingLeft;
            const maxY =
                container.height - element.height - containerPaddingTop;

            return {
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            };
        },
        [constrainToParent]
    );

    const handleMouseMove = useCallback(
        (e) => {
            if (!isDragging || !dragRef.current) return;
            e.preventDefault();

            const deltaX = e.clientX - dragStart.x;
            const deltaY = e.clientY - dragStart.y;

            const newX = initialPos.x + deltaX;
            const newY = initialPos.y + deltaY;

            const constrainedPos = getConstrainedPosition(newX, newY);

            // Update position
            dragRef.current.style.left = ` ${constrainedPos.x}px`;
            dragRef.current.style.top = `${constrainedPos.y}px`;

            // Call onDrag callback with the constrained position
            if (onDrag) {
                onDrag(constrainedPos.x, constrainedPos.y, id);
            }
        },
        [isDragging, getConstrainedPosition, onDrag]
    );

    const handleMouseUp = useCallback(
        (e) => {
            if (isDragging) {
                setIsDragging(false);
                document.body.style.userSelect = ""; // Re-enable text selection
            }
        },
        [isDragging]
    );

    const handleMouseDown = useCallback(
        (e) => {
            if (!dragRef.current || isDragging) return;

            // Only start dragging if clicking on the draggable element itself
            if (!dragRef.current.contains(e.target)) return;

            e.preventDefault();

            const rect = dragRef.current.getBoundingClientRect();
            const containerRect =
                dragRef.current.parentElement?.getBoundingClientRect();

            if (!containerRect) return;

            // Calculate current position relative to container
            const currentX = rect.left - containerRect.left;
            const currentY = rect.top - containerRect.top;

            setDragStart({
                x: e.clientX,
                y: e.clientY,
            });

            setInitialPos({
                x: currentX,
                y: currentY,
            });

            setIsDragging(true);
            document.body.style.userSelect = "none"; // Prevent text selection while dragging
        },
        [isDragging]
    );

    // Set up event listeners
    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove, {
                passive: false,
            });
            document.addEventListener("mouseup", handleMouseUp);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Set up mousedown listener on the element itself
    useEffect(() => {
        const element = dragRef.current;
        if (!element) return;

        element.addEventListener("mousedown", handleMouseDown);

        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
        };
    }, [handleMouseDown]);

    useEffect(() => {
        if (!dragRef.current || !startingPos) return;

        dragRef.current.style.left = `${startingPos.x}px`;
        dragRef.current.style.top = `${startingPos.y}px`;
    }, [startingPos]);

    return (
        <div
            className={`absolute ${className}`}
            ref={dragRef}
            style={{
                ...style,
                cursor: isDragging ? "grabbing" : "grab",
                position: "absolute",
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Draggable;
