import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const SubHeader = ({ backRef }) => {
    return (
        <div className="flex justify-center px-8">
            <div className="grid grid-cols-[minmax(100px,1100px)] mt-4 px-4">
                <div className="flex  justify-between flex-row">
                    <NavLink className="font-black" to={backRef}>
                        <div className="hover:underline">Back</div>
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className=" p-2 rounded-xl hover:bg-gray-300"
                    >
                        <FaShoppingCart className="" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
