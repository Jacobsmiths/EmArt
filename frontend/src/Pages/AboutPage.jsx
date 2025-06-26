import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import FolderImages from "../Components/ImageCarousel";

const Folder = ({ color = "#ffcf80", items = [], className = "" }) => {
    const maxItems = 3;
    const papers = items.slice(0, maxItems);
    while (papers.length < maxItems) {
        papers.push(null);
    }
    const [open, setOpen] = useState(false);
    const [buttonDown, setButtonDown] = useState(false);
    const folderBackColor = "#ffc566";
    const paper1 = "#f2f2f2";
    const paper2 = "#fafafa";
    const paper3 = "#ffffff";

    const folderStyle = {
        "--folder-color": color,
        "--folder-back-color": folderBackColor,
        "--paper-1": paper1,
        "--paper-2": paper2,
        "--paper-3": paper3,
    };

    const handleClick = () => {
        setOpen((prev) => !prev);
        console.log("hanlded Click");
    };

    const getFolderState = (open) => {
        return open
            ? { transform: `scale(1) translateY(300px)` }
            : { transform: `scale(3) translateY(-20px)` };
    };

    return (
        <div className="relative w-full h-full flex justify-center items-center">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.2 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative translate-y-[-60px]"
                    >
                        <button
                            onClick={() => setOpen(false)}
                            onMouseDown={() => setButtonDown(true)}
                            onMouseUp={() => setButtonDown(false)}
                            className={`border-[1px] flex text-center justify-center items-center absolute z-50 top-[-10px] right-[-2px]
                        hover:bg-red-500 transition-all duration-200 hover:translate-y-[-2px] p-3 rounded-xl shadow-md bg-red-400 w-[16px] h-[16px] 
                         ${buttonDown && "scale-90"}`}
                        >
                            X
                        </button>
                        <FolderImages />
                    </motion.div>
                )}
            </AnimatePresence>
            <div
                style={getFolderState(open)}
                className={`transition-all absolute duration-200 ease-in-out ${className}`}
            >
                <div
                    className="group relative transition-all duration-200 ease-in cursor-pointer hover:-translate-y-2"
                    style={folderStyle}
                    onClick={handleClick}
                >
                    <div
                        className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
                        style={{ backgroundColor: folderBackColor }}
                    >
                        <span
                            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
                            style={{ backgroundColor: folderBackColor }}
                        ></span>
                        {papers.map((item, i) => {
                            let sizeClasses = "";
                            if (i === 0) sizeClasses = "w-[70%] h-[80%]";
                            if (i === 1) sizeClasses = "w-[80%] h-[70%]";
                            if (i === 2) sizeClasses = "w-[90%] h-[60%] ";

                            return (
                                <div
                                    key={i}
                                    className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out transform 
                                        -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0 ${sizeClasses}`}
                                    style={{
                                        backgroundColor:
                                            i === 0
                                                ? paper1
                                                : i === 1
                                                ? paper2
                                                : paper3,
                                        borderRadius: "10px",
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}

                        <div
                            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out group-hover:[transform:skew(15deg)_scaleY(0.6)] ${
                                open && "[transform:skew(15deg)_scaleY(0.6)]"
                            }`}
                            style={{
                                backgroundColor: color,
                                borderRadius: "5px 10px 10px 10px",
                            }}
                        ></div>
                        <div
                            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out group-hover:[transform:skew(-15deg)_scaleY(0.6)] ${
                                open && "[transform:skew(-15deg)_scaleY(0.6)]"
                            }`}
                            style={{
                                backgroundColor: color,
                                borderRadius: "5px 10px 10px 10px",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function EmiCard() {
    return (
        <div className="w-full p-8">
            <div className=" grid grid-cols-[130px_1fr] bg-gray-50 w-full h-full border">
                <div className="border border-red-800 rounded-full w-full h-full"></div>
                <div className="text-center border border-green-800 w-full h-full">
                    text
                </div>
            </div>
        </div>
    );
}

const AboutPage = () => {
    return (
        <div className="grid grid-rows-[180px_1fr] h-full w-full">
            <EmiCard />
            <Folder color="#ffcf80" />
        </div>
    );
};

export default AboutPage;
