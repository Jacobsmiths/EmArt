import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const GalleryPainting = ({ painting, className, style, ...props }) => {
  const [hasDragged, setHasDragged] = useState(false);

  return (
    <div
      className="border-2 border-transparent hover:border-pink-400"
      style={style}
      onMouseDown={() => setHasDragged(false)}
      onMouseMove={() => setHasDragged(true)}
    >
      <NavLink
        to={painting.sold ? "" : `/painting/${painting.id}`}
        onClick={(e) => {
          if (hasDragged) {
            e.preventDefault();
            setHasDragged(false);
          }
        }}
      >
        <div className="z-10 bg-black/30 inset font-extrabold text-2xl text-white w-full h-full relative">
          <img
            src={painting.images[0].image}
            {...props}
            draggable="false"
            className="h-full w-full object-fill"
          />
          {painting.sold && (
            <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center text-2xl font-extrabold text-white bg-black/50 z-60">
              SOLD
            </div>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default GalleryPainting;
