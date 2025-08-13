import React from "react";
import { useEffect, useState, useRef } from "react";
import MobileNavBar from "./MobileNavBar";
import NavBar from "./NavBar";
import { useAuth } from "../Contexts/AuthContext";
import Logotype from "./Logotype";
const Header = () => {
  const navTabClass =
    "text-[#E0E722] hover:text-yellow-300 transition-discrete duration-300 font-playfair text-xl";
  const navTabItems = ["Gallery", "Portfolio", "About", "Login"];
  const adminNavTabItems = ["Gallery", "Portfolio", "About", "Administration"];
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setBackgroundPosition(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <nav
      className={
        "outline transition-discrete duration-300 w-full h-12 hover:h-20"
      }
    >
      <div
        className="bg-[url(/IMG_1021.jpg)] bg-cover h-full w-full flex flex-col"
        style={{
          backgroundPosition: `center ${backgroundPosition}px`,
        }}
      >
        <div className="flex flex-row justify-between items-center h-full px-6 ">
          <Logotype className={"outline"} />
          <div className="h-full flex items-center justify-center ">
            <NavBar
              className={"w-full h-full "}
              navTabClass={navTabClass}
              navTabItems={isAuthenticated ? adminNavTabItems : navTabItems}
            />
            <MobileNavBar
              navTabClass={navTabClass}
              navTabItems={isAuthenticated ? adminNavTabItems : navTabItems}
              className="md:hidden flex justify-between mx-auto"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
