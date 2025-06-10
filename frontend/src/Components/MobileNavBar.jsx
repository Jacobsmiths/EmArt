import React, { useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Logotype from "./Logotype";

const MobileNavBar = ({ navTabClass, navTabItems, props }) => {
    const [showingMenu, setShowingMenu] = useState(false);
    const mobileMenuRef = useRef();

    const toggleShowingMenu = () => {
        setShowingMenu(!showingMenu);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target)
            ) {
                setShowingMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={mobileMenuRef}>
            <div className={props}>
                {/* Website Title and Logo */}
                <Logotype />
                {/* Navigation Links Mobile View */}
                <div className="block md:hidden">
                    <button onClick={toggleShowingMenu}>
                        {showingMenu ? (
                            <IoIosClose className="text-white" size={28} />
                        ) : (
                            <BiMenu className="text-white" size={28} />
                        )}
                    </button>
                </div>
            </div>
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    showingMenu
                        ? "max-h-20 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2"
                }`}
            >
                <div className="flex flex-row items-center justify-between mt-4">
                    {navTabItems.map((link, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={`/${link.toLowerCase()}`}
                                className={navTabClass}
                            >
                                {link}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileNavBar;
