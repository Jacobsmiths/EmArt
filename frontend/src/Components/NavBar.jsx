import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ navTabClass = "", navTabItems = [], className = "" }) => {
    return (
        <div
            className={`hidden md:flex justify-between items-center ${className}`}
        >
            <div className="flex items-center justify-center h-full relative">
                {navTabItems.map((link, index) => (
                    <NavLink
                        key={index}
                        to={`/${link.toLowerCase()}`}
                        className={`relative h-full flex items-center justify-center overflow-hidden group ${navTabClass}`}
                    >
                        <span className="absolute inset-0 bg-black transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                        <span className="relative z-10 px-4">{link}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default NavBar;
