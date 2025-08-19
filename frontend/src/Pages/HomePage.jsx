import React from "react";
import { NavLink } from "react-router";
import Dither from "../Components/Dither";
import Button from "../Components/Button";

const HomePage = () => {
    const buttons = [
        "Buy my Artwork ==>",
        "PRESS ME!!!",
        "Click me for a surprise!",
        "Show Me More",
    ];
    const text = buttons[Math.floor(Math.random() * buttons.length)];

    return (
        <>
            <title>Emersons Art</title>

            <div className="relative w-full min-h-screen">
                <div className="absolute inset-0 z-0">
                    <Dither
                        waveColor={[0.5, 0.5, 0.5]}
                        disableAnimation={false}
                        enableMouseInteraction={false}
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.01}
                    />
                </div>

                <div className="relative z-10">
                    <div className="max-w-6xl flex flex-col mx-auto min-h-screen">
                        <div className="text-6xl md:text-8xl font-bold text-[#39ff14] mb-10 mt-20">
                            Emersons Art
                        </div>
                        <div
                            className="bg-gray-500/10 bg-clip-padding backdrop-filter  backdrop-blur backdrop-saturate-100
                backdrop-contrast-100 max-w-xl rounded-2xl text-white font-semibold text-xl px-8 py-4"
                        >
                            Welcome to my website! The artwork on my digital art
                            gallery is available for purchase. View all my
                            pieces in my portfolio and keep up with my works in
                            progress on my instagram! On my about page you can
                            learn more about me and ways to connect. Click below
                            to See whatsup.
                        </div>

                        <button className="cursor-pointer hover:scale-110 transition-transform duration-200">
                            <NavLink to="/gallery">
                                <div className="flex mt-16 p-6 bg-white rounded-full text-center w-fit font-extrabold mx-auto">
                                    {text}
                                </div>
                            </NavLink>
                        </button>
                        <NavLink to="https://github.com/Jacobsmiths/EmArt">
                            <div className="rounded-2xl bg-white/70 inline-block px-2 py-2 text-center hover:underline absolute right-0 m-2 md:m-8 bottom-0">
                                Site's Github
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
