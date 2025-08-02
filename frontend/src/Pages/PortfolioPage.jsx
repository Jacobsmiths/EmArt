import React, { useEffect, useRef, useState } from "react";
import PopUp from "../Components/PopUp";
import { AnimatePresence, motion } from "motion/react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import Spinner from "../Components/Spinner";
import Button from "../Components/Button";

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
    setCurrentImage(currentImage + 1 < images.length ? currentImage + 1 : 0);
  };

  useEffect(() => {
    if (!painting || !painting.images) return;
    setImages(painting.images);
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
                {images.length > 1 && (
                  <Button
                    onClick={handleLeftButton}
                    className="m-4 h-[40px] w-[30px]  min-w-[30px] bg-gray-300/70 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70"
                  >
                    <RiArrowDropLeftLine className="h-full w-full" />
                  </Button>
                )}

                {/* Image */}
                <img
                  src={images[currentImage].image}
                  draggable="false"
                  className="object-contain h-auto max-h-156 z-100 w-3xl"
                  ref={imageRef}
                />

                {images.length > 1 && (
                  <Button
                    onClick={handleRightButton}
                    className="m-4 h-[40px] w-[30px] min-w-[30px] bg-gray-300/70 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200/70"
                  >
                    <RiArrowDropRightLine className="h-full w-full" />
                  </Button>
                )}
              </div>
              <div className="border border-gray-100 my-2 w-[140px] justify-center flex" />
              <div className="font-extrabold text-2xl bg-transparent text-white z-200">
                {painting.name}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <PopUp message={painting.name} key={painting.id} disabled={focused}>
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
                src={painting.images[0].image}
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
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPortfolioPaintings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseurl}/paintings/`, {
          method: "GET",
          "Content-Type": "application/json",
        });
        if (!response.ok) {
          console.log(await response.text());
          return;
        }
        const data = await response.json();
        console.log(data);
        setPaintings(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchPortfolioPaintings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <title>Emersons Art | Portflio</title>
      <h1 className="text-center font-semibold p-4">
        Welcome to my Portfolio!
      </h1>
      <div className="px-2 flex justify-center">
        <div className="max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {paintings.map((painting) => (
            <PortfolioTile painting={painting} key={painting.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListings;
