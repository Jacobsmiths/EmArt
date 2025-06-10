import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const removeFromCart = (paintingItem) => {
        if (!cart) return;
        console.log("removed item");
        setCart(
            cart.filter((item) => {
                if (!paintingItem?.id) return;
                if (item.id !== paintingItem.id) return true;
            })
        );
    };

    const addToCart = (paintingItem) => {
        if (!cart && checkInCart(paintingItem)) {
            console.log("item already in cart");
            return false;
        }
        setCart([...cart, paintingItem]);
        console.log("added item");
        console.log(paintingItem);
        return true;
    };

    const checkInCart = (paintingItem) => {
        return cart.find((cartItem) => {
            if (cartItem.id == paintingItem.id) return true;
        });
    };

    const getCart = () => {
        return cart;
    };

    return (
        <CartContext.Provider
            value={{ getCart, addToCart, removeFromCart, checkInCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export default useCart;
