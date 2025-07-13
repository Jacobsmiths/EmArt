import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCart } from "../Contexts/CartContext";

const CheckoutForm = ({ stripePromise }) => {
    const { cart } = useCart();
    const baseurl = import.meta.env.VITE_API_URL;

    const fetchClientSecret = useCallback(() => {
        console.log("cart changed");
        const cartItemIds = cart.map((item) => item.id);
        console.log(JSON.stringify({ painting_ids: cartItemIds }));
        return fetch(`${baseurl}/create-checkout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ painting_ids: cartItemIds }),
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, [cart]);

    const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
};

export default CheckoutForm;
