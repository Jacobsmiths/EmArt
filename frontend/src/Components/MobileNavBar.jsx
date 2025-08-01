import React, { useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import useClickedOutside from "../hooks/useClickedOutside";

const MobileNavBar = ({ navTabClass, navTabItems, className, ...props }) => {
  const mobileMenuRef = useRef();
  const [showMobileNav, setShowMobileNav] = useClickedOutside(
    mobileMenuRef,
    false
  );

  return (
    <div>
      <div className={className}>
        <div
          className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
            showMobileNav
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={mobileMenuRef}
            className={`antioutline fixed right-0 top-0 h-full w-[120px] bg-gray-100 shadow-lg p-4 flex flex-col gap-4 transform transition-transform duration-300 ${
              showMobileNav ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-center text-2xl font-bold antioutline text-pink-600">
              Menu
            </div>
            <div className="border"></div>
            {navTabItems.map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.toLowerCase()}`}
                className={`transition ${navTabClass} antioutline`}
                onClick={() => setShowMobileNav(false)}
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex md:hidden">
          <button
            onClick={() => {
              setShowMobileNav((prev) => !prev);
            }}
          >
            {showMobileNav ? (
              <IoIosClose className="text-pink-500" size={28} />
            ) : (
              <BiMenu className="text-pink-500" size={28} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
