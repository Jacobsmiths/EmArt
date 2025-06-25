import React, { useState, useEffect } from "react";
import MultiImageDisplay from "../Components/MultiImageDisplay";
import { useParams } from "react-router";
import SubHeader from "../Components/SubHeader";

const ViewPaintingPage = () => {
    const paintingParams = useParams();
    const [paintingData, setPaintingData] = useState({});

    useEffect(() => {
        setPaintingData({
            title: "painting1",
            cost: 500,
            description: "Oil on cotton canvas",
            dimensions: "10x25",
            filepaths: ["/test.jpg", "/nav.jpg"],
            id: 1,
        });
    }, []);

    return (
        <div className="justify-center items-center">
            <SubHeader backRef={"/portfolio"} />
            <div className="flex justify-center">
                <MultiImageDisplay paintingData={paintingData} />
            </div>
            <div className="w-full flex flex-col items-center justify-center p-4">
                <h1 className="font-bold text-2xl text-center">
                    {paintingData.title}
                </h1>
                <div className="flex border-black/20 border w-8/10" />
                <div className="text-md text-center font-medium p-4">
                    {paintingData.description}
                </div>
            </div>
        </div>
    );
};

export default ViewPaintingPage;
