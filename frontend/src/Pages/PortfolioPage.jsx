import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import PopUp from "../Components/PopUp";
import { animate, AnimatePresence, motion } from "motion/react";
import useClickedOutside from "../hooks/useClickedOutside";
import MultiImageDisplay from "../Components/MultiImageDisplay";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";

const PortfolioTile = ({ painting }) => {
    const [focused, setFocused] = useState(false);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const imageRef = useRef();

    const handleLeftButton = () => {
        setCurrentImage(
            currentImage - 1 >= 0 ? currentImage - 1 : images.length - 1
        );
    };

    const handleRightButton = () => {
        setCurrentImage(
            currentImage + 1 < images.length ? currentImage + 1 : 0
        );
    };

    useEffect(() => {
        if (!painting || !painting.filepath) return;
        console.log(painting);
        setImages(painting.filepath);
    }, [painting]);

    return (
        <div className="relative">
            <AnimatePresence>
                {focused ? (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={() => setFocused(false)}
                    >
                        <motion.div
                            className="flex flex-col justify-center items-center"
                            initial={{ opacity: 0, scale: 1.1, y: 25 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -25 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                            }}
                        >
                            <div
                                className="flex flex-row items-center justify-center px-12"
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                {painting.filepath.length > 1 && (
                                    <button
                                        onClick={handleLeftButton}
                                        className="m-4 h-[40px] w-[30px]  min-w-[30px] bg-gray-300/70 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70"
                                    >
                                        <RiArrowDropLeftLine className="h-full w-full" />
                                    </button>
                                )}

                                {/* Image */}
                                <img
                                    src={images[currentImage]}
                                    draggable="false"
                                    className="object-contain h-full z-100 w-auto"
                                    ref={imageRef}
                                />

                                {painting.filepath.length > 1 && (
                                    <button
                                        onClick={handleRightButton}
                                        className="m-4 h-[40px] w-[30px] min-w-[30px] bg-gray-300/70 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70"
                                    >
                                        <RiArrowDropRightLine className="h-full w-full" />
                                    </button>
                                )}
                            </div>
                            <div className="border border-gray-100 my-2 w-[140px] justify-center flex" />
                            <div className="font-extrabold text-2xl bg-transparent text-white z-200">
                                {painting.name}
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <PopUp
                        message={painting.name}
                        key={painting.id}
                        disabled={focused}
                    >
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -25 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                            }}
                            onClick={() => setFocused(true)}
                            className="overflow-hidden border border-gray-300 hover:border-pink-400 cursor-pointer aspect-square"
                        >
                            <img
                                src={painting.filepath[0]}
                                alt={painting.name}
                                className="object-cover w-full h-full"
                                draggable={false}
                            />
                        </motion.div>
                    </PopUp>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProductListings = () => {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set paintings data
        setPaintings(fart);
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-center font-semibold p-4">
                Welcome to my Portfolio!
            </h1>
            <div className="px-2 flex justify-center">
                <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {paintings.map((painting) => (
                        <PortfolioTile painting={painting} key={painting.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListings;

const fart = [
    {
        filepath: ["./test.jpg"],
        name: "painting1",
        height: 10,
        width: 18,
        x: 25,
        y: 25,
        id: 1,
    },
    {
        filepath: ["./test2.jpg", "./test.jpg"],
        name: "painting2",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 2,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting3",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 3,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting4",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 4,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting5",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 5,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting6",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 6,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting7",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 7,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting8",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 8,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting9",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 9,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting10",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 10,
    },
    {
        filepath: ["./test2.jpg"],
        name: "painting11",
        height: 15,
        width: 20,
        x: 100,
        y: 125,
        id: 11,
    },
];
