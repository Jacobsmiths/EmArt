import React from "react";
import { useEffect, useState } from "react";
import MobileNavBar from "./MobileNavBar";
import NavBar from "./NavBar";
import { useAuth } from "../Contexts/AuthContext";
// hover:scale-x-120 hover:scale-y-200 overflow-visible
const Header = () => {
    //drop-shadow-[0_1.1px_1.1px_rgba(1,1,1,1)]
    const navTabClass =
        "relative overflow-hidden text-[#ff3cb2] group-hover:py-8 text-xl font-bold py-6 px-2 transition-all duration-300 font-[helvetica]";
    const navTabItems = ["Current", "About", "Login", "Register"];
    const adminNavTabItems = ["Current", "About", "Login", "Register", "Admin"];
    const [backgroundPosition, setBackgroundPosition] = useState(0);
    const { isAuthenticated, userRoles } = useAuth();

    useEffect(() => {
        setBackgroundPosition(Math.floor(Math.random() * 3000));
    }, []);

    return (
        <nav
            className=" outline [scrollbar-width:none] px-4 transform-all group duration-300 ease-in-out bg-[url(/IMG_1021.jpg)] bg-cover"
            style={{
                backgroundPosition: `center ${backgroundPosition}px`,
            }}
        >
            <NavBar
                navTabClass={navTabClass}
                navTabItems={
                    isAuthenticated && userRoles.includes("Administrator")
                        ? adminNavTabItems
                        : navTabItems
                }
            />
            <MobileNavBar
                navTabClass={navTabClass}
                navTabItems={
                    isAuthenticated && userRoles.includes("Administrator")
                        ? adminNavTabItems
                        : navTabItems
                }
                props="md:hidden flex justify-between mx-auto"
            />
        </nav>
    );
};

export default Header;
