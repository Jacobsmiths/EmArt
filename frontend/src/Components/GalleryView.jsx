import React, { useRef, useEffect, useState } from "react";
import Draggable from "./Draggable";
import GalleryPainting from "./GalleryPainting";
import { useAuth } from "../Contexts/AuthContext";

const GalleryView = ({
    galleryViewRef,
    className,
    galleryStyle,
    pictureData,
    PAINTING_SCALE,
    setPictureData,
    onDrag,
    ...props
}) => {
    const INCH_TO_PIXELS = 96;
    const galleryRef = useRef(null);
    const { isAuthenticated, userRoles } = useAuth();
    const handleScroll = (e) => {
        if (!galleryViewRef.current) return;
        galleryViewRef.current.scrollLeft += e.deltaY;
    };

    useEffect(() => {
        const gallery = galleryRef.current;
        const galleryView = galleryViewRef.current;
        if (!gallery || !galleryView) return;
        galleryView.scrollLeft =
            gallery.getBoundingClientRect().width / 2 -
            galleryView.getBoundingClientRect().width / 2;

        let startX = 0;
        let scrollStart = 0;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            scrollStart = galleryView.scrollLeft;
        };

        const handleTouchMove = (e) => {
            const currentX = e.touches[0].clientX;
            const delta = currentX - startX;
            galleryView.scrollLeft = scrollStart - delta;
        };

        gallery.addEventListener("wheel", handleScroll);
        gallery.addEventListener("touchstart", handleTouchStart);
        gallery.addEventListener("touchmove", handleTouchMove);

        return () => {
            gallery.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const galleryPaintings = () => {
        return Object.values(pictureData).map((painting) => (
            <Draggable
                key={`${painting.id}`}
                id={painting.id}
                onDrag={(x, y, id) => {
                    onDrag(x, y, id);
                }}
                startingPos={{ x: painting.x, y: painting.y }}
                draggable={
                    isAuthenticated == true &&
                    userRoles.includes("Administrator")
                        ? true
                        : false
                }
            >
                <GalleryPainting
                    painting={painting}
                    container={galleryRef}
                    style={{
                        height: `${
                            (painting.height * INCH_TO_PIXELS) / PAINTING_SCALE
                        }px`,
                        width: `${
                            (painting.width * INCH_TO_PIXELS) / PAINTING_SCALE
                        }px`,
                    }}
                />
            </Draggable>
        ));
    };

    return (
        <div
            className={`relative overflow-auto z-10  ${className}`}
            ref={galleryViewRef}
            {...props}
            style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#888 #f3f3f3", // [scrollbar-width:none]
            }}
        >
            <div
                className="relative overflow-hidden z-10 "
                ref={galleryRef}
                style={galleryStyle}
            >
                {galleryPaintings()}
            </div>
        </div>
    );
};

export default GalleryView;
