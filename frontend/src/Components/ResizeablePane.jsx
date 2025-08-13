import React, { useEffect, useState } from "react";

const ResizeablePane = ({
    minSize,
    initialSize,
    maxSize,
    grow = true,
    bgColor,
    ...props
}) => {
    const [size, setSize] = useState(initialSize);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = () => setIsResizing(true);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const movement = -e.movementX; // Reverse movement for right-side panel
            let newSize = size + movement;

            newSize = Math.max(minSize, Math.min(newSize, maxSize));
            setSize(newSize);
        };

        const handleMouseUp = () => setIsResizing(false);

        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [size, isResizing, minSize, maxSize]);

    const ResizableHandle = ({ isResizing, handleMouseDown }) => {
        return (
            <div
                className={`absolute w-1 top-0 bottom-0 left-0 cursor-col-resize hover:bg-blue-400 transition-colors ${
                    isResizing ? "bg-blue-400" : "bg-gray-200"
                }`}
                onMouseDown={handleMouseDown}
            />
        );
    };

    return (
        <div
            className={`relative ${bgColor} ${grow ? "grow" : ""} shrink-0`}
            style={{ width: `${size}px` }}
        >
            {!grow && (
                <ResizableHandle
                    isResizing={isResizing}
                    handleMouseDown={handleMouseDown}
                />
            )}
            {props.children}
        </div>
    );
};

export default ResizeablePane;
