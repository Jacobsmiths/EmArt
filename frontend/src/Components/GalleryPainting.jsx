import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const GalleryPainting = ({ painting, className, style, ...props }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const paintingRef = useRef();

    const handlePopUp = (e) => {
        setShowPopUp(true);
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClosePopUp = (e) => {
        setShowPopUp(false);
    };

    const handleMouseMove = (e) => {
        setHasDragged(true);
        if (showPopUp) {
            setMousePos({ x: e.clientX, y: e.clientY });
        }
    };

    useEffect(() => {
        const img = paintingRef.current;
        if (!img) return;

        const handleMouseDown = () => setHasDragged(false);

        img.addEventListener("mousedown", handleMouseDown);
        img.addEventListener("mousemove", handleMouseMove);

        return () => {
            img.removeEventListener("mousedown", handleMouseDown);
            img.removeEventListener("mousemove", handleMouseMove);
        };
    }, [showPopUp]);

    useEffect(() => {
        if (!paintingRef.current) return;

        paintingRef.current.addEventListener("mouseenter", handlePopUp);
        paintingRef.current.addEventListener("mouseleave", handleClosePopUp);
        return () => {
            if (paintingRef.current) {
                paintingRef.current.removeEventListener(
                    "mouseenter",
                    handlePopUp
                );
                paintingRef.current.removeEventListener(
                    "mouseleave",
                    handleClosePopUp
                );
            }
        };
    }, []);

    return (
        <div className="flex flex-col ">
            <NavLink
                to={`/painting/${painting.id}`}
                onClick={(e) => {
                    if (hasDragged) {
                        e.preventDefault();
                        setHasDragged(false);
                    }
                }}
            >
                <img
                    src={painting.filepath}
                    {...props}
                    draggable="false"
                    style={style}
                    ref={paintingRef}
                />
            </NavLink>
            {showPopUp && (
                <div
                    className="fixed z-10  text-right pointer-events-none"
                    style={{
                        left: mousePos.x,
                        top: mousePos.y - 25,
                    }}
                >
                    {painting.name}
                </div>
            )}
        </div>
    );
};

export default GalleryPainting;
