import React, { useEffect } from "react";
import GalleryPainting from "./GalleryPainting";

const GalleryPaintings = ({
    MINIMAP_SCALE,
    PAINTING_SCALE = 10,
    pictureData,
    ...props
}) => {
    const INCH_TO_PIXELS = 96;

    const getImages = () => {
        return Object.values(pictureData).map((painting) => (
            <GalleryPainting
                key={painting.id}
                img={painting.filepath}
                id={painting.id} // Optional if using getElementById
                className="absolute bg-black"
                style={{
                    height: `${
                        (painting.height * INCH_TO_PIXELS) /
                        PAINTING_SCALE /
                        MINIMAP_SCALE
                    }px`,
                    width: `${
                        (painting.width * INCH_TO_PIXELS) /
                        PAINTING_SCALE /
                        MINIMAP_SCALE
                    }px`,
                    left: `${painting.x}px`,
                    top: `${painting.y}px`,
                }}
            />
        ));
    };

    useEffect(() => {
        Object.values(pictureData).forEach((painting) => {
            const paintingElement = document.getElementById(`${painting.id}`);
            if (paintingElement) {
                paintingElement.style.left = `${painting.x / MINIMAP_SCALE}px`;
                paintingElement.style.top = `${painting.y / MINIMAP_SCALE}px`;
            }
        });
    }, [pictureData]);

    return <div className="relative w-full h-full">{getImages()}</div>;
};

export default GalleryPaintings;
