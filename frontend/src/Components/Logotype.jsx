import React from "react";
import { NavLink } from "react-router-dom";

const Logotype = () => {
    return (
        <NavLink to="/">
            <div className="group-hover:py-8 flex items-center space-x-2 lg:mx-8 py-4  transition-all duration-300 ease-in-out">
                <img
                    className="max-h-[40px] w-atuo rounded-sm border border-black"
                    src="/src/assets/logo.jpg"
                />
                <h1 className="font-[helvetica] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] font-bold text-2xl hover:text-shadow-pink-400 hover:text-pink-500 hover:transition-colors duration-300">
                    Emersons Art Gallery
                </h1>
            </div>
        </NavLink>
    );
};

export default Logotype;
