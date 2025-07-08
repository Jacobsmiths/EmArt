import React, { useEffect, useState } from "react";
import AdminForm from "../Components/AdminForm";
import { useAuth } from "../Contexts/AuthContext";
import Spinner from "../Components/Spinner";
import GalleryForm from "../Components/GalleryForm";
import PortfolioForm from "../Components/PortfolioForm";

const AdminPage = () => {
    const [paintings, setPaintings] = useState([]);
    const [galleryPaintings, setGalleryPaintings] = useState([]);
    const [portfolioPaintings, setPortfolioPaintings] = useState([]);
    const [loading, setLoading] = useState(false);
    const { logout, token } = useAuth();
    const baseurl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const callApi = async () => {
            await fetchPaintings();
            await fetchGalleryPaintings();
            await fetchPortfolioPaintings();
        };
        callApi();
    }, []);

    const fetchPaintings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseurl}/paintings/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPaintings(data);
                console.log(data);
            } else {
                console.error(await response.text());
                logout(); // token might be invalid or expired
            }
        } catch (err) {
            console.error("Fetch error:", err);
            logout();
        }
        setLoading(false);
    };

    const fetchGalleryPaintings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseurl}/gallery-paintings/`, {
                method: "GET",
            });

            if (!response.ok) {
                console.log(await response.text());
                return;
            }
            const data = await response.json();
            setGalleryPaintings(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const fetchPortfolioPaintings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseurl}/portfolio-paintings/`, {
                method: "GET",
            });

            if (!response.ok) {
                console.log(await response.text());
                return;
            }
            const data = await response.json();
            setPortfolioPaintings(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const addPainting = async (paintingData) => {
        try {
            const formData = new FormData();
            formData.append("name", paintingData.name);
            formData.append("description", paintingData.description);
            formData.append("price", paintingData.price);
            formData.append("width", paintingData.width);
            formData.append("height", paintingData.height);
            formData.append("forSale", paintingData.forSale);
            formData.append("sold", paintingData.sold);

            paintingData.images.forEach((file, i) => {
                formData.append("images", file);
            });

            const metadata = paintingData.images.map((_, i) => ({ order: i }));
            formData.append("image_metadata", JSON.stringify(metadata));

            console.log(formData);
            const response = await fetch(`${baseurl}/paintings/`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            if (!response.ok) {
                console.error(await response.text());
                return;
            }
            const data = await response.json();
            console.log(data);

            // this code links the images to the painting

            await fetchPaintings();
        } catch (err) {
            console.log(err);
        }
    };

    const deletePainting = async (paintingID) => {
        try {
            await fetch(`${baseurl}/paintings/${paintingID}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            await fetchPaintings();
        } catch (err) {
            console.log(err);
        }
    };

    const updatePainting = async (paintingData) => {
        try {
            const formData = new FormData();
            formData.append("name", paintingData.name);
            formData.append("description", paintingData.description);
            formData.append("price", paintingData.price);
            formData.append("width", paintingData.width);
            formData.append("height", paintingData.height);
            formData.append("forSale", paintingData.forSale);
            formData.append("sold", paintingData.sold);

            paintingData.images.forEach((file, i) => {
                formData.append("images", file);
            });

            const metadata = paintingData.images.map((_, i) => ({ order: i }));
            formData.append("image_metadata", JSON.stringify(metadata));

            console.log(formData);
            const response = await fetch(
                `${baseurl}/paintings/${paintingData.id}/`,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            if (!response.ok) {
                console.error(await response.text());
                return;
            }
            const data = await response.json();
            await fetchPaintings();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const addPaintingToGallery = async (paintingID) => {
        try {
            const response = await fetch(`${baseurl}/gallery-paintings/`, {
                method: "POST",
                body: JSON.stringify({
                    gallery: 1,
                    painting: paintingID,
                    Xpos: 0,
                    Ypos: 0,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            if (!response.ok) {
                console.log(await response.text());
                return;
            }
            const data = await response.json();
            console.log(data);
            await fetchGalleryPaintings();
        } catch (err) {
            console.log(err);
        }
    };

    const removePaintingFromGallery = async (paintingID) => {
        try {
            const response = await fetch(
                `${baseurl}/gallery-paintings/${paintingID}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            await fetchGalleryPaintings();
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="grid grid-cols-[minmax(300px,1400px)] justify-center p-4">
            <h1 className="text-center font-bold text-2xl p-4">Admin Page</h1>
            <div className="flex justify-end p-4">
                <button
                    onClick={logout}
                    className="bg-green-400 hover:bg-green-500 p-2 rounded-lg text-white font-bold transition-all duration-200"
                >
                    Logout
                </button>
            </div>
            <div className="text-lg font-bold pb-4">All Paintings</div>

            <AdminForm
                paintings={paintings}
                addPainting={addPainting}
                deletePainting={deletePainting}
                updatePainting={updatePainting}
            />
            <div className="text-lg font-bold p-4">Gallery Paintings</div>
            <GalleryForm
                paintings={paintings}
                galleryPaintings={galleryPaintings}
                addToGallery={addPaintingToGallery}
                removePainting={removePaintingFromGallery}
            />
            <div className="text-lg font-bold p-4">Portfolio Paintings</div>
            <PortfolioForm portfolioPaintings={portfolioPaintings} />
        </div>
    );
};

export default AdminPage;
