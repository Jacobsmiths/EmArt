import React from "react";
import CheckoutForm from "../Components/CheckoutForm";
import { CartList } from "../Components/CartList";
import ResizeablePane from "../Components/ResizeablePane";

const CheckoutPage = ({ stripePromise }) => {
  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Checkout Pane */}
      <ResizeablePane
        bgColor="bg-white"
        initialSize={500}
        minSize={300}
        maxSize={800}
        resizeSide="right"
      >
        <div className="p-4 h-full">
          <CheckoutForm stripePromise={stripePromise} />
        </div>
      </ResizeablePane>

      {/* Cart Pane */}
      <ResizeablePane
        bgColor="bg-gray-150"
        initialSize={325}
        minSize={290}
        maxSize={500}
        resizeSide="left"
      >
        <div className="p-4 h-full">
          <CartList addCheckoutButton={false} />
        </div>
      </ResizeablePane>
    </div>
  );
};

export default CheckoutPage;
