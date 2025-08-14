import React from "react";
import CheckoutForm from "../Components/CheckoutForm";
import { CartList } from "../Components/CartList";
import SplitPane from "../Components/SplitPane";

const CheckoutPage = ({ stripePromise }) => {
  return (
    <div className="h-full">
      <title>Emersons Art | Checkout</title>

      <SplitPane
        initialLeft={1100} // tweak to taste
        leftMin={500}
        rightMin={320}
        className="bg-gray-100"
        left={
          <div className="h-full p-4 overflow-auto">
            <CheckoutForm stripePromise={stripePromise} />
          </div>
        }
        right={
          <div className="h-full p-4 bg-gray-200 overflow-auto">
            <CartList addCheckoutButton={false} />
          </div>
        }
      />
    </div>
  );
};

export default CheckoutPage;
