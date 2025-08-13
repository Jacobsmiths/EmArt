import React from "react";
import CheckoutForm from "../Components/CheckoutForm";
import CartSidebar from "../Components/CartSidebar";
import { CartList } from "../Components/CartList";
import ResizeablePane from "../Components/ResizeablePane";

const CheckoutPage = ({ stripePromise }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr] h-full">
      <title>Emersons Art | Checkout</title>
      <ResizeablePane>
        <CheckoutForm stripePromise={stripePromise} />
      </ResizeablePane>
      <CartSidebar />
    </div>
  );
};

export default CheckoutPage;
