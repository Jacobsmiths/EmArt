import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import Button from "./Button";

const MultiImageDisplay = ({ paintingData }) => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const imageRef = useRef();

  const handleLeftButton = () => {
    setCurrentImage(
      currentImage - 1 >= 0 ? currentImage - 1 : images.length - 1
    );
  };

  const handleRightButton = () => {
    setCurrentImage(currentImage + 1 < images.length ? currentImage + 1 : 0);
  };

  useEffect(() => {
    if (!paintingData || !paintingData.images) return;
    setImages(paintingData.images.map((image) => image.image));
  }, [paintingData]);

  return (
    <div className="grid grid-cols-[minmax(80px,100px)_1fr] gap-4 items-start p-8 max-w-5xl">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <Button key={index} onClick={() => setCurrentImage(index)}>
            <img
              src={image}
              className={`rounded-sm w-[60px] h-[60px] object-cover hover:bg-green-200 ${
                currentImage === index
                  ? "border-2 border-green-400 p-0.5"
                  : "p-1"
              }`}
            />
          </Button>
        ))}
      </div>

      {/* Image Viewer with Arrows */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Hover Zone */}
        {images.length > 1 && (
          <div className="absolute left-0 top-0 w-1/4 h-full z-20 group">
            <button onClick={handleLeftButton}>
              <RiArrowDropLeftLine className="h-[30px] w-[20px] absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-300/70 rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70" />
            </button>
          </div>
        )}

        {/* Image */}
        <img
          src={images[currentImage]}
          draggable="false"
          className="object-contain max-h-[500px] w-full"
          ref={imageRef}
        />

        {/* Right Hover Zone */}
        {images.length > 1 && (
          <div className="absolute right-0 top-0 w-1/4 h-full z-20 group">
            <button onClick={handleRightButton}>
              <RiArrowDropRightLine className="h-[30px] w-[20px] absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-300/70 rounded-lg opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageDisplay;
