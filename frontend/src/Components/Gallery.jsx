import React, { useRef, useState, useEffect } from "react";
import GalleryPainting from "../Components/GalleryPainting";
import Minimap from "./Minimap";
import GalleryView from "./GalleryView";
import Draggable from "./Draggable";

const Gallery = () => {
    const GALLERY_HEIGHT = 650;
    const GALLERY_WIDTH = 2500;
    const PAINTING_SCALE = 8;
    const MINIMAP_SCALE = 15;

    const minimapHeight = Math.floor(GALLERY_HEIGHT / MINIMAP_SCALE);
    const minimapWidth = Math.floor(GALLERY_WIDTH / MINIMAP_SCALE);

    const minimapRef = useRef(null);
    const galleryViewRef = useRef(null);

    const [pictureData, setPictureData] = useState({});

    useEffect(() => {
        // const fetchPaintings = async () => {
        //     try {
        //         const response = await fetch("/api/Paintings", {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         });
        //         const data = await response.json();
        //         const paintingsById = Object.fromEntries(
        //             data.map((painting) => [painting.id, painting])
        //         );
        //         console.log(paintingsById);
        //         setPictureData(paintingsById);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };

        // fetchPaintings();
        setPictureData({
            1: {
                filepath: "./test.jpg",
                name: "painting1",
                height: 10,
                width: 18,
                x: 25,
                y: 25,
                id: 1,
                sold: false,
            },
            2: {
                filepath: "./test2.jpg",
                name: "painting2",
                height: 15,
                width: 20,
                x: 100,
                y: 125,
                id: 2,
                sold: true,
            },
        });
    }, []);

    // this is because the gallery view was still scrolling up and down instead of horizontal
    useEffect(() => {
        if (!galleryViewRef) return;
        galleryViewRef.current.addEventListener("wheel", (e) => {
            e.preventDefault();
        });
    }, []);

    const handleDrag = (x, y, id) => {
        setPictureData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                x,
                y,
            },
        }));
    };

    return (
        <>
            <GalleryView
                galleryViewRef={galleryViewRef}
                className="w-full "
                galleryStyle={{
                    width: `${GALLERY_WIDTH}px`,
                    height: `${GALLERY_HEIGHT}px`,
                }}
                PAINTING_SCALE={PAINTING_SCALE}
                pictureData={pictureData}
                setPictureData={setPictureData}
                onDrag={handleDrag}
            />
            <Minimap
                PAINTING_SCALE={PAINTING_SCALE}
                minimapRef={minimapRef}
                galleryViewRef={galleryViewRef}
                className="justify-center hover:opacity-80 opacity-40 transition-opacity duration-300 "
                MINIMAP_SCALE={MINIMAP_SCALE}
                style={{
                    width: `${minimapWidth}px`,
                    height: `${minimapHeight}px`,
                }}
                pictureData={pictureData}
            ></Minimap>
        </>
    );
};

export default Gallery;
