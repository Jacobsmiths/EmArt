import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const removeFromCart = (paintingItem) => {
        if (!cart) return;
        setCart(
            cart.filter((item) => {
                if (!paintingItem?.id) return;
                if (item.id !== paintingItem.id) return true;
            })
        );
    };

    const addToCart = (paintingItem) => {
        if (!cart && checkInCart(paintingItem)) {
            return false;
        }
        setCart([...cart, paintingItem]);
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
            value={{ getCart, addToCart, removeFromCart, checkInCart, cart }}
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
