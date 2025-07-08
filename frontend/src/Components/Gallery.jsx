import React, { useRef, useState, useEffect } from "react";
import Minimap from "./Minimap";
import GalleryView from "./GalleryView";
import Spinner from "./Spinner";
import { useAuth } from "../Contexts/AuthContext";

const Gallery = () => {
    const GALLERY_HEIGHT = 650;
    const GALLERY_WIDTH = 2500;
    const PAINTING_SCALE = 8;
    const MINIMAP_SCALE = 15;

    const baseurl = import.meta.env.VITE_API_URL;

    const minimapHeight = Math.floor(GALLERY_HEIGHT / MINIMAP_SCALE);
    const minimapWidth = Math.floor(GALLERY_WIDTH / MINIMAP_SCALE);

    const minimapRef = useRef(null);
    const galleryViewRef = useRef(null);
    const { token, isAuthenticated } = useAuth();

    const [pictureData, setPictureData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await fetch(`${baseurl}/gallery-paintings/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                const paintingsById = Object.fromEntries(
                    data.map((painting) => [painting.id, painting])
                );
                setPictureData(paintingsById);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        setLoading(true);
        fetchPaintings();
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
                Xpos: x,
                Ypos: y,
            },
        }));
    };

    const updatePositions = async () => {
        setLoading(true);
        try {
            await Promise.all(
                Object.values(pictureData).map(async (galleryPainting) => {
                    const response = await fetch(
                        `${baseurl}/gallery-paintings/${galleryPainting.id}/`,
                        {
                            method: "PUT",
                            body: JSON.stringify({
                                Xpos: galleryPainting.Xpos,
                                Ypos: galleryPainting.Ypos,
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${token}`,
                            },
                        }
                    );
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error(
                            `Failed to update ${galleryPainting.id}:`,
                            errorText
                        );
                    }
                })
            );
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
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
            {isAuthenticated && (
                <div className="w-full flex justify-end px-12">
                    <button
                        onClick={() => {
                            console.log(pictureData);
                            updatePositions();
                        }}
                        className="bg-green-400 font-bold text-white p-4 rounded-lg cursor-auto"
                    >
                        Update Positions
                    </button>
                </div>
            )}
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
            />
        </>
    );
};

export default Gallery;
