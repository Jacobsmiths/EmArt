import React, { useEffect, useState, useRef } from "react";
import useClickedOutside from "../hooks/useClickedOutside";

const ModalBackdrop = ({ children, className, ref, ...props }) => {
    return (
        <div
            className={`fixed inset-0 left-0 w-full h-full bg-black/50 z-50 flex ${className}`}
            {...props}
        >
            <div ref={ref}>{children}</div>
        </div>
    );
};

export default ModalBackdrop;
