import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import MultiImageDisplay from "../Components/MultiImageDisplay";
import PaintingDetails from "../Components/PaintingDetails";
import Spinner from "../Components/Spinner";

const PaintingPage = () => {
    const { id } = useParams();
    const baseurl = import.meta.env.VITE_API_URL;
    const [paintingData, setPaintingData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPainting = async () => {
            try {
                const response = await fetch(`${baseurl}/paintings/${id}`, {
                    method: "GET",
                });
                if (!response.ok) {
                    console.log(response.text());
                    return;
                }
                const data = await response.json();
                console.log(data);
                setPaintingData(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        setLoading(true);
        fetchPainting();
    }, []);

    if (loading) {
        return <Spinner />;
    }

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
