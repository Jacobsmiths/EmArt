import React from "react";
import { NavLink } from "react-router-dom";
import Logotype from "./Logotype";

const NavBar = ({ navTabClass, navTabItems, className }) => {
    return (
        <div className="grid grid-cols-1 max-w-[1200px] w-full h-full mx-auto">
            <div className="hidden md:flex justify-between ">
                <Logotype />
                <div className="flex space-x-6 lg:mx-8 items-center relative h-full">
                    {navTabItems.map((link, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={`/${link.toLowerCase()}`}
                                className={`${navTabClass} relative overflow-hidden h-full items-center before:content-[''] before:absolute before:inset-0 before:bg-black before:transform before:-translate-y-full before:transition-transform before:duration-300 before:ease-in-out hover:before:translate-y-0`}
                            >
                                {/* Text content */}
                                <span className="relative z-10 pt-8">
                                    {link}
                                </span>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
