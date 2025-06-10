import React, { useCallback, useRef, useState } from "react";
import Gallery from "../Components/Gallery";
import SubHeader from "../Components/SubHeader";

const GalleryPage = () => {
    return (
        <div className="">
            <SubHeader backRef={"/"} />
            <div className="flex flex-col items-center">
                <h1 className="flex p-4 font-semibold">Art Gallery</h1>
                <Gallery />
            </div>
        </div>
    );
};

export default GalleryPage;
