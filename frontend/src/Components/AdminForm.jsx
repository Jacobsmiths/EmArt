import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AddToDatabase from "./AddToDatabase";
import useClickedOutside from "../hooks/useClickedOutside";

const AdminForm = ({ paintings, setPaintings }) => {
    const headers = [
        "Painting",
        "Description",
        "Price",
        "Height x Width",
        "Sold",
        "For Sale",
        "Images",
        "Actions",
    ];

    const columns = {
        display: "grid",
        gridTemplateColumns: "1.5fr 1.5fr 100px 120px 70px 70px 1fr 100px",
    };

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const addPaintingRef = useRef(null);
    const { focused, setFocused } = useClickedOutside(addPaintingRef);

    const addToPaintings = (painting) => {
        const format = painting.size.trim();
        const fart = {
            ...painting,
            size: {
                height: format.split("x")[0],
                width: format.split("x")[1],
            },
        };
        setPaintings([...paintings, fart]);
    };

    const onSubmit = (data) => {
        console.log("Form data:", data);
    };

    const focusFormInput = () => {
        return (
            <div className="fixed inset-0 left-0 w-full h-full bg-black/50 flex items-center justify-center p-10 z-50">
                <AddToDatabase
                    className={"bg-white "}
                    ref={addPaintingRef}
                    columns={columns}
                    addToPaintings={addToPaintings}
                    onHandleSubmit={() => {
                        setFocused(false);
                    }}
                />
            </div>
        );
    };

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-xl border border-gray-400 bg-white">
                {/* Header Row */}
                <div
                    className="bg-gray-300 divide-x divide-black overflow-hidden"
                    style={columns}
                >
                    {headers.map((header, index) => (
                        <div
                            key={index}
                            className="p-3 text-center font-bold bg-gray-200 border-b border-gray-300"
                        >
                            {header}
                        </div>
                    ))}
                </div>

                {focused && focusFormInput()}

                {/* Data Rows */}
                {paintings.map(
                    (
                        { name, description, price, size, sold, forSale },
                        index
                    ) => {
                        const bg = index % 2 === 0 ? "bg-gray-50" : "bg-white";
                        return (
                            <div
                                key={index}
                                style={columns}
                                className={`${bg} border-b divide-x divide-gray-200 border-gray-200 overflow-clip`}
                            >
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={name}
                                    {...register(`name${index}`)}
                                    placeholder="Name"
                                />
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={description}
                                    {...register(`description${index}`)}
                                    placeholder="Description"
                                />
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number"
                                    defaultValue={price}
                                    {...register(`price${index}`)}
                                    placeholder="Price"
                                />
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={`${size.height} x ${size.width}`}
                                    {...register(`size${index}`)}
                                    placeholder="HxW"
                                />
                                <div className="p-3 flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={sold}
                                        {...register(`sold${index}`)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={forSale}
                                        {...register(`forSale${index}`)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                </div>
                                <div className="p-3">
                                    <input
                                        type="file"
                                        multiple={true}
                                        {...register(`images${index}`)}
                                        className="w-full text-xs"
                                        accept="image/*"
                                    />
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => deleteFunc(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    type="button"
                    onClick={() => {
                        console.log("true");
                        setFocused(true);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Add New Painting
                </button>
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default AdminForm;
