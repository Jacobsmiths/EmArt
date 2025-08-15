import React from "react";
import { NavLink } from "react-router";
import Dither from "../Components/Dither";
import Button from "../Components/Button";

const HomePage = () => {
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
            {/* <div className="flex flex-row gap-x-4 p-8 justify-end-safe text-xl items-center">
              <NavLink to="/portfolio">
                <div className="text-gray-100 hover:underline font-semibold">
                  See all my art
                </div>
              </NavLink>
            </div> */}
            <div className="text-6xl md:text-8xl font-bold text-[#39ff14] mb-10 mt-20">
              Emersons Art
            </div>
            {/* <div className="flex flex-col justify-between gap-y-12 md:flex-row md:gap-x-12 px-8"> */}
            <div
              className="bg-gray-500/10 bg-clip-padding backdrop-filter  backdrop-blur backdrop-saturate-100
                backdrop-contrast-100 max-w-xl rounded-2xl text-white font-semibold text-xl px-8 py-4"
            >
              Welcome to my website! The artwork on my digital art gallery is
              available for purchase. View all my pieces in my portfolio and
              keep up with my works in progress on my instagram! On my about
              page you can learn more about me and ways to connect.
            </div>
            {/* <div
                className="bg-gray-500/10 bg-clip-padding backdrop-filter  backdrop-blur backdrop-saturate-100
                backdrop-contrast-100 max-w-xl rounded-2xl text-white font-semibold text-xl px-8 py-4"
              >
                <h1>Fight for whats right</h1>
                <p className="text-sm">
                  Here I have a list of causes I think are important:
                  https://emersons.art
                </p>
              </div> */}
            {/* </div> */}
            <Button>
              <NavLink to="/gallery">
                <div className="flex mt-16 p-6 bg-white rounded-full text-center w-fit font-extrabold mx-auto">
                  {"Buy my Artwork ==>"}
                </div>
              </NavLink>
            </Button>
            <NavLink to="https://github.com/Jacobsmiths/EmArt">
              <div className="rounded-2xl bg-white/70 inline-block px-2 py-2 text-center hover:underline absolute right-0 m-2 md:m-8 bottom-0">
                Github Page
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
