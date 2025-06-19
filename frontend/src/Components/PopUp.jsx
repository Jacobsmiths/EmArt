import React, { useState, useEffect, useRef } from "react";

const PopUpMessage = ({ message }) => {
    return (
        <div className="text-black p-1 rounded-lg text-sm border-1 border-black bg-gray-100/90">
            {message}
        </div>
    );
};

const PopUp = ({ message = "testing", disabled, children }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpPos, setPopUpPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const popup = PopUpMessage(message);

    const handleMouseEnter = (e) => {
        if (disabled) return;
        updatePos(e.clientX, e.clientY);
        setShowPopUp(true);
    };
    const handleMouseExit = () => {
        setShowPopUp(false);
    };

    const handleMouseOver = (e) => {
        updatePos(e.clientX, e.clientY);
    };

    const updatePos = (xPos, yPos) => {
        if (!showPopUp) return;
        const rect = containerRef.current.getBoundingClientRect();
        setPopUpPos({
            y: yPos - rect.top,
            x: xPos - rect.left,
        });
    };

    return (
        <div
            className="relative"
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseExit}
            onMouseMove={handleMouseOver}
        >
            {showPopUp && (
                <div
                    className="absolute z-10"
                    style={{ left: popUpPos.x, top: popUpPos.y }}
                >
                    {popup}
                </div>
            )}
            {children}
        </div>
    );
};

export default PopUp;
