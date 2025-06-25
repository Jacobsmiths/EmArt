import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const MainLayout = () => {
    return (
        <div className="min-h-screen min-w-[350px] flex flex-col ">
            <Header className="" />
            <main className="grow flex-1 bg-gray-100">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
