import React, { useState } from "react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";

// this expects to get a list of image urls and then will handle them in a neat way
// this assumes it will be put in a specific height and width box and will adapt to that
const ManyImages = ({ images }) => {
    const [currImage, setCurrImage] = useState(0);

    const handleLeftButton = () => {
        setCurrImage(currImage - 1 >= 0 ? currImage - 1 : images.length - 1);
    };

    const handleRightButton = () => {
        setCurrImage(currImage + 1 < images.length ? currImage + 1 : 0);
    };

    return (
        <div className="w-full flex justify-center">
            {images.length > 1 && (
                <button
                    onClick={handleLeftButton}
                    className="m-4 h-[30px] w-[20px] min-w-[20px] bg-gray-300/70 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70"
                >
                    <RiArrowDropLeftLine className="h-full w-full" />
                </button>
            )}
            <img
                src={images[currImage].image}
                className="h-[60px] w-[60px] object-cover"
            />
            {images.length > 1 && (
                <button
                    onClick={handleRightButton}
                    className="m-4 h-[30px] w-[20px]  min-w-[20px] bg-gray-300/70 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70"
                >
                    <RiArrowDropRightLine className="h-full w-full" />
                </button>
            )}
        </div>
    );
};

export default ManyImages;
