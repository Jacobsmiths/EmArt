import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import FolderImages from "../Components/ImageCarousel";

const Folder = ({
  color = "#ffcf80",
  items = [],
  className = "",
  size = 1,
  paintings,
}) => {
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
      : { transform: `scale(${size}) translateY(-20px)` };
  };

  return (
    <div
      className={`relative w-full h-full flex justify-center items-center ${className}`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative translate-y-[-60px]"
          >
            <FolderImages baseWidth={size * 150} items={paintings} />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        style={getFolderState(open)}
        className={`transition-all absolute duration-200 ease-in-out `}
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
                      i === 0 ? paper1 : i === 1 ? paper2 : paper3,
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
  const textElement = (
    <p className="text-lg md:text-md text-gray-500">
      I’m a multi-discipline, mixed-media artist with a BA in art and minor in
      sociology. I focus mainly on oil and acrylic painting. My interests and
      topics include self-discovery, politics, religion, and growth/change. In
      addition to painting, I enjoy sculpture, collage, and graphite drawing.
      Please reach out for any commission ideas or work!
    </p>
  );
  
  return (
    <div className="max-w-4xl mx-auto mt-12 px-10">
      {/** HORIZONTAL BAR */}
      <div className="hidden sm:flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start shadow-sm">
        <div className="w-32 relative flex-shrink-0 place-items-center">
          <img src={"/EmPic.jpg"} className="object-fit overflow-hidden" />
        </div>
        <div className="flex flex-col gap-2 py-2 px-4">{textElement}</div>
      </div>

      {/** VERTICAL BAR */}
      <div className="flex flex-col gap-y-2 max-w-sm sm:hidden items-center">
        <div className="grid grid-cols-[32px_120px_32px] gap-2 items-center justify-center w-[184px]">
          <div className="border-1 border-gray-400 h-0" />
          <img src={"/EmPic.jpg"} className="object-fit rounded-full w-28" />
          <div className="border-1 border-gray-400 h-0" />
        </div>
        <div className="flex flex-col gap-2 bg-white border-gray-300 rounded-xl items-center shadow-sm py-4 px-8">
          {textElement}
        </div>
      </div>
    </div>
  );
}

const AboutPage = () => {
  const baseurl = import.meta.env.VITE_API_URL;
  const [paintings, setPaintings] = useState([]);
  useEffect(() => {
    const fetchAboutPaintings = async () => {
      try {
        const response = await fetch(`${baseurl}/portfolio-paintings/`, {
          method: "GET",
        });
        if (!response.ok) {
          console.log(await response.text());
          return;
        }
        const data = await response.json();

        console.log(data);
        const orderedNames = data
          .sort((a, b) => a.order - b.order)
          .map((item) => item.painting.images[0].image);
        setPaintings(orderedNames);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAboutPaintings();
  }, []);

  return (
    <>
      <title>Emersons Art | About</title>
      {/* <div className="grid grid-rows-[180px_1fr] h-full w-full"> */}
      <div className="flex justify-center items-center">
        <EmiCard />
      </div>
      {/* <Folder
          color="#ffcf80"
          className={`hidden sm:flex`}
          size={3}
          paintings={paintings}
        />
        <Folder
          color="#ffcf80"
          className={`flex sm:hidden`}
          size={2}
          paintings={paintings}
        />
      </div> */}
    </>
  );
};

export default AboutPage;
