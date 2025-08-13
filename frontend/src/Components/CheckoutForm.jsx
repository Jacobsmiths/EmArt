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

  // This code was an attempt at validating pickup locations
  // this didnt work because it asked you location before you did shipping type or something

  // const onShippingDetailsChange = async (shippingDetailsChangeEvent) => {
  //     const { checkoutSessionId, shippingDetails } =
  //         shippingDetailsChangeEvent;
  //     console.log(shippingDetails);
  //     const response = await fetch(`${baseurl}/validate-shipping/`, {
  //         method: "POST",
  //         body: JSON.stringify({
  //             checkout_session_id: checkoutSessionId,
  //             shipping_details: shippingDetails,
  //         }),
  //     });

  //     if (response.type === "error") {
  //         return Promise.resolve({
  //             type: "reject",
  //             errorMessage: response.message,
  //         });
  //     } else {
  //         return Promise.resolve({ type: "accept" });
  //     }
  // };

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="w-full block">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
