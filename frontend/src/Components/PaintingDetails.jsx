import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useCart from "../Contexts/CartContext";

const PaintingDetails = ({ paintingData }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [cost, setCost] = useState(NaN);
    const [id, setId] = useState(NaN);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart, checkInCart } = useCart();
    const [alreadyInCart, setAlreadyInCart] = useState(false);

    useEffect(() => {
        setTitle(paintingData.name);
        setDescription(paintingData.description);
        setDimensions(`${paintingData.width} x ${paintingData.height}`);
        setCost(paintingData.price);
        setId(paintingData.id);
        setAlreadyInCart(checkInCart(paintingData));
    }, [paintingData]);

    return (
        <div className="flex flex-col md:p-4 min-w-80 px-8 md:py-8 py-2 pb-8 md:items-start items-end space-y-2">
            <div className="font-bold text-2xl">{title}</div>
            <div>{`$${cost}`}</div>
            <div>{dimensions}</div>
            <div>{description}</div>

            {addedToCart || alreadyInCart ? (
                <>
                    {alreadyInCart && (
                        <p className="text-sm text-red-600">
                            Item is already in cart
                        </p>
                    )}
                    <NavLink to="/checkout">
                        <div className="cursor-pointer rounded-lg py-2 px-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-150 text-white font-semibold">
                            Checkout
                        </div>
                    </NavLink>
                </>
            ) : (
                <div>
                    <button
                        onClick={() => {
                            if (addToCart(paintingData)) {
                                setAlreadyInCart(false);
                            }
                            setAddedToCart(true);
                        }}
                        className="cursor-pointer rounded-lg py-2 px-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-150 text-white font-semibold"
                    >
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaintingDetails;
