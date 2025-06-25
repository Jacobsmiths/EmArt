import React from "react";
import { useEffect, useState, useRef } from "react";
import MobileNavBar from "./MobileNavBar";
import NavBar from "./NavBar";
import { useAuth } from "../Contexts/AuthContext";
import Logotype from "./Logotype";
const Header = () => {
    const navTabClass =
        "text-[#ff3cb2] hover:text-pink-600 transition-discrete duration-300 font-[helvetica] text-xl";
    const navTabItems = ["Gallery", "Portfolio", "About", "Login", "Register"];
    const adminNavTabItems = [
        "Gallery",
        "Portfolio",
        "About",
        "Login",
        "Admin",
    ];
    const [backgroundPosition, setBackgroundPosition] = useState(0);
    const { isAuthenticated, userRoles } = useAuth();

    useEffect(() => {
        setBackgroundPosition(Math.floor(Math.random() * 5000));
    }, []);

    return (
        <nav
            className={
                "outline transition-discrete duration-300 w-full h-20 hover:h-28 min-h-16"
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
                            navTabItems={
                                isAuthenticated &&
                                userRoles.includes("Administrator")
                                    ? adminNavTabItems
                                    : navTabItems
                            }
                        />
                        <MobileNavBar
                            navTabClass={navTabClass}
                            navTabItems={
                                isAuthenticated &&
                                userRoles.includes("Administrator")
                                    ? adminNavTabItems
                                    : navTabItems
                            }
                            className="md:hidden flex justify-between mx-auto"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
