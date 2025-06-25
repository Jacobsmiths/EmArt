import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const AboutPage = () => {
    const [open, setOpen] = useState(null);
    return (
        <div className="w-full h-[40rem] flex justify-center">
            <motion.div
                onClick={() => {
                    setOpen((prev) => !prev);
                }}
                style={open ? { y: 50, scale: 2 } : { y: 250, scale: 1 }}
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
                className="bg-blue-300 flex justify-center items-center text-center w-24 h-24"
            >
                About Page
            </motion.div>
        </div>
    );
};

export default AboutPage;
