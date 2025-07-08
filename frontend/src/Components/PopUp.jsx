import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const PopUp = ({ message, disabled = false, children, ...props }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpPos, setPopUpPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const messageRef = useRef(null);

    const updatePos = (xPos, yPos, callback) => {
        if (!messageRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mes = messageRef.current.getBoundingClientRect();

        setPopUpPos({
            y: yPos - rect.top - mes.height - 15,
            x: xPos - rect.left - mes.width / 2,
        });
        if (callback) callback();
    };

    const handleMouseEnter = (e) => {
        updatePos(e.clientX, e.clientY, () => {
            setShowPopUp(true);
        });
    };
    const handleMouseExit = () => {
        setShowPopUp(false);
    };

    const handleMouseOver = (e) => {
        updatePos(e.clientX, e.clientY);
    };

    return (
        <div
            className={`relative  ${props.className}`}
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseExit}
            onMouseMove={handleMouseOver}
        >
            <div ref={messageRef} className="absolute invisible">
                {message}
            </div>
            <AnimatePresence>
                {showPopUp && !disabled && (
                    <motion.div
                        style={{ left: popUpPos.x, top: popUpPos.y }}
                        initial={{ scale: 0, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-black p-1 rounded-sm text-sm border-1 border-black bg-gray-100/90 absolute z-20 pointer-events-none whitespace-nowrap`}
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </div>
    );
};

export default PopUp;
