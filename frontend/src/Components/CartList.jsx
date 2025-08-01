import React, { useEffect, useState } from "react";
import useCart from "../Contexts/CartContext";
import { NavLink } from "react-router-dom";
import { IoRemoveCircleOutline } from "react-icons/io5";
import Button from "./Button";

export const CartList = ({ addCheckoutButton = true, className }) => {
  const [cart, setCart] = useState([]);
  const { getCart, removeFromCart } = useCart();

  useEffect(() => {
    if (!getCart) return;
    setCart(getCart());
  }, [getCart, removeFromCart]);

  return (
    <div
      className={`flex flex-col items-center p-8 font-semibold text-xl font-[helvetica] h-9/12 ${className}`}
    >
      Whats in your cart?
      {cart.length > 0 ? (
        <div className="grid grid-cols-[minmax(200px,800px)]">
          <div className="flex flex-col pb-4">
            <div className="space-y-8">
              {cart.map((cartItem, index) => {
                return (
                  <div
                    key={cartItem.id || index}
                    className="flex justify-between py-4 items-center"
                  >
                    <div className="font-medium text-black text-xl font-[helvetica]">
                      {cartItem.name}
                    </div>
                    <div className="flex flex-row">
                      <Button
                        onClick={() => {
                          removeFromCart(cartItem);
                        }}
                        className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full m-2 hover:bg-gray-200 transition-all ease-in-out duration-250"
                      >
                        <IoRemoveCircleOutline />
                      </Button>
                      <img
                        className="h-[60px] w-[60px] object-center"
                        src={cartItem.images[0].image}
                      />
                    </div>
                  </div>
                );
              })}
              {addCheckoutButton && (
                <NavLink to={"/checkout"}>
                  <Button className="cursor-pointer rounded-lg py-2 px-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-150 text-white font-semibold">
                    Checkout
                  </Button>
                </NavLink>
              )}
            </div>
          </div>{" "}
        </div>
      ) : (
        <p className="text-center max-w-[300px] font-light py-12 ">
          Add something to your cart, we would greatly appreciate it :)
        </p>
      )}
    </div>
  );
};
