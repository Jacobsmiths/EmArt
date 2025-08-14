import React from "react";
import { NavLink } from "react-router-dom";

const Logotype = ({ className }) => {
  return (
    <NavLink to="/" className={`flex items-center justify-center `}>
      <div className="flex flex-row items-center justify-center space-x-2 transition-all duration-300 ease-in-out">
        <img
          className="max-h-[40px] w-atuo rounded-sm border border-black"
          src="/Faces.jpg"
        />
        <h1 className={`font-playfair  font-bold text-2xl ${className}`}>
          Emersons Art Gallery
        </h1>
      </div>
    </NavLink>
  );
};

export default Logotype;
