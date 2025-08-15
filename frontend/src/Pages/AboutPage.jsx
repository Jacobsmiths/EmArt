import React, { useState, useEffect, useRef } from "react";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaTwitch } from "react-icons/fa";
import { IoLogoVenmo } from "react-icons/io5";
import Button from "../Components/Button";
import { m } from "motion/react";

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
  const [page, setPage] = useState(0);

  // function darkenHex(hex, factor) {
  //   let r = parseInt(hex.slice(1, 3), 16);
  //   let g = parseInt(hex.slice(3, 5), 16);
  //   let b = parseInt(hex.slice(5, 7), 16);

  //   r = Math.max(0, Math.floor(r * factor));
  //   g = Math.max(0, Math.floor(g * factor));
  //   b = Math.max(0, Math.floor(b * factor));

  //   return (
  //     "#" +
  //     r.toString(16).padStart(2, "0") +
  //     g.toString(16).padStart(2, "0") +
  //     b.toString(16).padStart(2, "0")
  //   );
  // }

  // const color = "#e8e8e8";
  // const colors = socials.map((_, i) => darkenHex(color, 1 - i * 0.05));

  const socials = [
    {
      social: "Email",
      email: "emersonsartgallery@gmail.com",
      icon: <MdOutlineMail />,
      text: "If you have any business questions please feel free to reach me through my email: emersonsartgallery@gmail.com",
      textColor: "text-black",
      backgroundColor: "bg-gray-300",
    },
    {
      social: "Instagram",
      link: "https://www.instagram.com/emersonsartgallery/",
      icon: <FaInstagram />,
      text: "Keep up to date with all my works in progress in my highlights, and follow to keep up with me!",
      textColor: "text-white",
      backgroundColor: "bg-[#E1306C]",
    },
    {
      social: "Twitch",
      link: "https://m.twitch.tv/emersonsmithyy/home",
      icon: <FaTwitch />,
      text: "Follow me on twitch to be notified when I paint live!",
      textColor: "text-white",
      backgroundColor: "bg-[#9146FF]",
    },
    {
      social: "Venmo",
      link: "https://account.venmo.com/u/Emersonsmith379",
      icon: <IoLogoVenmo />,
      text: "Donate to me through my Venmo :)",
      textColor: "text-white",
      backgroundColor: "bg-[#008CFF]",
    },
  ];

  return (
    <>
      <title>Emersons Art | About</title>
      {/* <div className="grid grid-rows-[180px_1fr] h-full w-full"> */}
      <div className="flex flex-col justify-center items-center">
        <EmiCard />
        <div className="max-w-4xl mx-auto mt-12 px-10 flex flex-col w-full">
          <div className="flex flex-row gap-x-4 justify-end text-2xl px-2">
            {socials.map((social, index) => {
              return (
                <button onClick={() => setPage(index)}>
                  <div
                    className={`rounded-t-2xl flex px-2 pb-2 hover:translate-y-0 translate-2 transition-all duration-300 ${social.textColor} ${social.backgroundColor}`}
                  >
                    {social.social}
                  </div>
                </button>
              );
            })}
          </div>
          <div
            className={`h-32 z-100 transition-all duration-150 rounded-xl p-8 flex items-center ${socials[page].backgroundColor} ${socials[page].textColor}`}
          >
            <div className="grid grid-cols-[1fr_100px] w-full">
              <p className="text-lg">{socials[page].text}</p>
              <div className="w-24 h-24 flex items-center justify-center text-6xl ">
                <Button
                  href={socials[page].link || ""}
                  onClick={() => {
                    navigator.clipboard
                      .writeText("emersonsartgallery@gmail.com")
                      .then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000); // Hide tooltip after 2 seconds
                      });
                  }}
                  className="relative"
                >
                  {socials[page].icon}
                  {copied && (
                    <p className="text-sm absolute left-0 text-center font-medium">
                      Email Copied!
                    </p>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* 
          <div className="hover:bg-gray-200 transition-all duration-100 rounded-full p-2">
            <Button
              href={"https://www.instagram.com/emersonsartgallery/"}
            ></Button>
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
              {" "}
              
            </Button>
            {copied && (
              <p className="text-sm absolute left-0 text-center font-medium">
                Email Copied!
              </p>
            )}
          </div>
          <div className="hover:bg-gray-200 transition-all duration-100 rounded-full p-2">
            <Button href="https://m.twitch.tv/emersonsmithyy/home"></Button>
          </div>
          <div className="hover:bg-gray-200 transition-all duration-100 rounded-full p-2">
            <Button href="https://account.venmo.com/u/Emersonsmith379"></Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
