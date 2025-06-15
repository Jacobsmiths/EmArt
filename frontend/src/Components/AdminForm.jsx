import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AddToDatabase from "./AddToDatabase";
import useClickedOutside from "../hooks/useClickedOutside";

const AdminForm = ({
    headers,
    elements,
    addFunc,
    deleteFunc,
    isDatabaseForm,
}) => {
    const allHeaders = [...headers, "Images", "Actions"];
    const [isEditing, setIsEditing] = useState(false);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const addPaintingRef = useRef(null);
    const { focused, setFocused } = useClickedOutside(addPaintingRef);

    const columns = {
        display: "grid",
        gridTemplateColumns: "1.5fr 1.5fr 80px 120px 60px 60px 1fr 100px",
    };

    const onSubmit = (data) => {
        console.log("Form data:", data);
    };

    const focusFormInput = () => {
        return (
            <div className="fixed inset-0 left-0 w-full h-full bg-black/50 flex items-center justify-center p-20 z-50">
                <AddToDatabase
                    className={"bg-white "}
                    ref={addPaintingRef}
                    columns={columns}
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
                    {allHeaders.map((header, index) => (
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
                {elements.map(
                    (
                        { id, name, description, price, size, sold, forSale },
                        index
                    ) => {
                        const bg = index % 2 === 0 ? "bg-gray-50" : "bg-white";
                        return (
                            <div
                                key={id}
                                style={columns}
                                className={`${bg} border-b divide-x divide-gray-200 border-gray-200 overflow-clip`}
                            >
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={name}
                                    {...register(`name${id}`)}
                                    placeholder="Name"
                                />
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={description}
                                    {...register(`description${id}`)}
                                    placeholder="Description"
                                />
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number"
                                    defaultValue={price}
                                    {...register(`price${id}`)}
                                    placeholder="Price"
                                />
                                <input
                                    className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={`${size.height} x ${size.width}`}
                                    {...register(`size${id}`)}
                                    placeholder="H x W"
                                />
                                <div className="p-3 flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={sold}
                                        {...register(`sold${id}`)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={forSale}
                                        {...register(`forSale${id}`)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                </div>
                                <div className="p-3">
                                    <input
                                        type="file"
                                        multiple={true}
                                        {...register(`images${id}`)}
                                        className="w-full text-xs"
                                        accept="image/*"
                                    />
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => deleteFunc(id)}
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
