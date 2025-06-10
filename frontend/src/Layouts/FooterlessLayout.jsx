import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../Components/Header";

const FooterlessLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header className="" />
            <main className="grow flex-1 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default FooterlessLayout;
