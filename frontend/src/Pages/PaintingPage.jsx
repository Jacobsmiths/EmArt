import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import MultiImageDisplay from "../Components/MultiImageDisplay";
import PaintingDetails from "../Components/PaintingDetails";

const PaintingPage = () => {
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
        <div className="justify-center">
            <SubHeader backRef={"/"} />
            <div className="flex md:flex-row flex-col md:justify-center">
                <MultiImageDisplay paintingData={paintingData} />
                <PaintingDetails paintingData={paintingData} />
            </div>
        </div>
    );
};

export default PaintingPage;
