import React from "react";
import CheckoutForm from "../Components/CheckoutForm";
import CartSidebar from "../Components/CartSidebar";
import { CartList } from "../Components/CartList";

const CheckoutPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] h-full">
            <CheckoutForm />
            <CartSidebar />
            <CartList className="md:hidden flex" addCheckoutButton={false} />
        </div>
    );
};

export default CheckoutPage;
