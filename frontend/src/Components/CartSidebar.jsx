import React from "react";
import ResizeablePane from "./ResizeablePane";
import { CartList } from "./CartList";

const CartSidebar = () => {
    return (
        <div className="justify-end h-full hidden md:flex">
            <ResizeablePane
                bgColor="bg-gray-150"
                initialSize={325}
                minSize={290}
                maxSize={500}
                grow={false}
            >
                <div className="p-4 h-full">
                    <CartList addCheckoutButton={false} />
                </div>
            </ResizeablePane>
        </div>
    );
};

export default CartSidebar;
