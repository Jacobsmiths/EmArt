import React, { useState, useEffect, useRef } from "react";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaTwitch } from "react-icons/fa";
import { IoLogoVenmo } from "react-icons/io5";
import Button from "../Components/Button";

function EmiCard() {
  const textElement = (
    <p className="text-lg md:text-md text-gray-500">
      I’m a multi-discipline, mixed-media artist with a BA in art and minor in
      sociology. I focus mainly on oil and acrylic painting. My interests and
      topics include self-discovery, politics, religion, and growth/change. In
      addition to painting, I enjoy sculpture, collage, and graphite drawing.
      Please reach out for any commission ideas or work!
    </p>
  );

  return (
    <div className="max-w-4xl mx-auto mt-12 px-10">
      {/** HORIZONTAL BAR */}
      <div className="hidden sm:flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start shadow-sm">
        <div className="w-32 relative flex-shrink-0 place-items-center">
          <img src={"/EmPic.jpg"} className="object-fit overflow-hidden" />
        </div>
        <div className="flex flex-col gap-2 py-2 px-4">{textElement}</div>
      </div>

      {/** VERTICAL BAR */}
      <div className="flex flex-col gap-y-2 max-w-sm sm:hidden items-center">
        <div className="grid grid-cols-[32px_120px_32px] gap-2 items-center justify-center w-[184px]">
          <div className="border-1 border-gray-400 h-0" />
          <img src={"/EmPic.jpg"} className="object-fit rounded-full w-28" />
          <div className="border-1 border-gray-400 h-0" />
        </div>
        <div className="flex flex-col gap-2 bg-white border-gray-300 rounded-xl items-center shadow-sm py-4 px-8">
          {textElement}
        </div>
      </div>
    </div>
  );
}

const AboutPage = () => {
  const [copied, setCopied] = useState(false);
  const socails = [
    {
      social: "Instagram",
      link: "https://www.instagram.com/emersonsartgallery/",
    },
    {
      social: "Twitch",
      link: "https://m.twitch.tv/emersonsmithyy/home",
    },
    {
      social: "Venmo",
      link: "https://account.venmo.com/u/Emersonsmith379",
    },
  ];

  return (
    <>
      <title>Emersons Art | About</title>
      {/* <div className="grid grid-rows-[180px_1fr] h-full w-full"> */}
      <div className="flex flex-col justify-center items-center">
        <EmiCard />
        <div className="max-w-4xl mx-auto mt-12 px-10 flex flex-row text-black font-black text-4xl gap-x-8">
          <div className="hover:bg-gray-200 transition-all duration-100 rounded-full p-2">
            <Button href={"https://www.instagram.com/emersonsartgallery/"}>
              <FaInstagram />
            </Button>
          </div>
          <div className="hover:bg-gray-200 transition-all duration-100 rounded-full p-2 relative">
            <Button
              onClick={() => {
                navigator.clipboard
                  .writeText("emersonsartgallery@gmail.com")
                  .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000); // Hide tooltip after 2 seconds
                  });
              }}
            >
              <MdOutlineMail />
            </Button>
            {copied && (
              <p className="text-sm absolute left-0 text-center font-medium">
                Email Copied!
              </p>
            )}
          </div>
          <div className="hover:bg-gray-200 transition-all duration-100 rounded-full p-2">
            <Button href="https://m.twitch.tv/emersonsmithyy/home">
              <FaTwitch />
            </Button>
          </div>
          <div className="hover:bg-gray-200 transition-all duration-100 rounded-full p-2">
            <Button href="https://account.venmo.com/u/Emersonsmith379">
              <IoLogoVenmo />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
