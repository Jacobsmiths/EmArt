import React, {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
    useMemo,
} from "react";
import Draggable from "./Draggable";

const Minimap = ({
    className,
    minimapRef,
    galleryViewRef,
    style,
    MINIMAP_SCALE,
    PAINTING_SCALE,
    pictureData,
}) => {
    const [viewWidth, setViewWidth] = useState(0);
    const [viewPos, setViewPos] = useState(0);
    const draggingRef = useRef(false);
    const hideTimeoutRef = useRef();
    const viewRef = useRef(null);
    const hoveringRef = useRef(false);
    const INCH_TO_PIXELS = 96;

    const updateView = useCallback(() => {
        if (!galleryViewRef.current || !minimapRef.current) return;

        const gallery = galleryViewRef.current;
        const minimap = minimapRef.current;

        const galleryWidth = gallery.getBoundingClientRect().width;
        const scrollWidth = gallery.scrollWidth;
        const minimapWidth = minimap.getBoundingClientRect().width;

        const thumbSize = (galleryWidth / scrollWidth) * minimapWidth;
        setViewWidth(thumbSize);

        const scrollPos = (gallery.scrollLeft / scrollWidth) * minimapWidth;
        setViewPos(scrollPos);
    }, [galleryViewRef, minimapRef]);

    const handleSynchronization = useCallback(
        (xCord) => {
            if (!galleryViewRef.current || !minimapRef.current) return;
            draggingRef.current = true;

            const minimap = minimapRef.current;
            const gallery = galleryViewRef.current;
            const minimapWidth = minimap.getBoundingClientRect().width;

            const scrollRatio = xCord / minimapWidth;
            const newScrollLeft = scrollRatio * gallery.scrollWidth;

            gallery.scrollLeft = Math.max(
                0,
                Math.min(
                    newScrollLeft,
                    gallery.scrollWidth - gallery.offsetWidth
                )
            );
            setViewPos(xCord);
            draggingRef.current = false;
        },
        [galleryViewRef, minimapRef]
    );

    const handleGalleryScroll = useCallback(() => {
        if (draggingRef.current) return;
        updateView();
    }, [updateView]);

    useEffect(() => {
        if (viewRef.current && !draggingRef.current) {
            viewRef.current.style.left = `${viewPos}px`;
        }
    }, [viewPos]);

    useEffect(() => {
        if (!viewRef.current || draggingRef.current) return;

        showDraggable();
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            if (!hoveringRef.current) {
                hideDraggable();
            }
        }, 500);
    }, [viewPos]);

    const showDraggable = () => {
        if (viewRef.current) {
            viewRef.current.style.opacity = "0.4";
            viewRef.current.style.pointerEvents = "auto";
        }
    };

    const hideDraggable = () => {
        if (viewRef.current) {
            viewRef.current.style.opacity = "0";
            viewRef.current.style.pointerEvents = "none";
        }
    };

    const handleMouseEnter = useCallback(() => {
        hoveringRef.current = true;
        clearTimeout(hideTimeoutRef.current);
        showDraggable();
    }, []);

    const handleMouseLeave = useCallback(() => {
        hoveringRef.current = false;
        hideTimeoutRef.current = setTimeout(() => {
            if (!hoveringRef.current) {
                hideDraggable();
            }
        }, 0);
    }, []);

    useEffect(() => {
        const map = minimapRef.current;
        const gallery = galleryViewRef.current;

        if (!map || !gallery) return;

        map.addEventListener("mouseenter", handleMouseEnter);
        map.addEventListener("mouseleave", handleMouseLeave);
        gallery.addEventListener("scroll", handleGalleryScroll);

        updateView();
        window.addEventListener("resize", updateView);

        return () => {
            map.removeEventListener("mouseenter", handleMouseEnter);
            map.removeEventListener("mouseleave", handleMouseLeave);
            if (gallery) {
                gallery.removeEventListener("scroll", handleGalleryScroll);
            }
            window.removeEventListener("resize", updateView);
        };
    }, [handleMouseEnter, handleMouseLeave, handleGalleryScroll, updateView]);

    return (
        <div
            className={`relative bg-gray-300 m-4 ${className}`}
            ref={minimapRef}
            style={style}
        >
            <Draggable
                className={`absolute justify-center h-full bg-gray-50 z-10 transition-opacity ease-in-out duration-300 hover:bg-white `}
                currentRef={viewRef}
                onDrag={handleSynchronization}
                style={{
                    width: `${viewWidth}px`,
                }}
                draggable={true}
            />
            {Object.values(pictureData).map((galleryPainting) => (
                <div
                    key={`minimap-${galleryPainting.id}`}
                    className="absolute overflow-hidden"
                    style={{
                        height: `${
                            (galleryPainting.painting.height * INCH_TO_PIXELS) /
                            PAINTING_SCALE /
                            MINIMAP_SCALE
                        }px`,
                        width: `${
                            (galleryPainting.painting.width * INCH_TO_PIXELS) /
                            PAINTING_SCALE /
                            MINIMAP_SCALE
                        }px`,
                        left: `${galleryPainting.Xpos / MINIMAP_SCALE}px`,
                        top: `${galleryPainting.Ypos / MINIMAP_SCALE}px`,
                    }}
                >
                    <img
                        src={galleryPainting.painting.images[0].image}
                        alt={galleryPainting.painting.name}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                    />
                </div>
            ))}
        </div>
    );
};

export default Minimap;
