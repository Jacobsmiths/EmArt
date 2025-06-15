import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const AddToDatabase = ({ className, ref, columns }) => {
    const el = useRef(null);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form className={className} ref={ref} style={columns}>
            <input
                className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={"Name"}
                {...register("name")}
            />
            <input
                className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("description")}
                placeholder="Description"
            />
            <input
                className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                {...register("price")}
                placeholder="Price"
            />
            <input
                className="p-3 w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("size")}
                placeholder="H x W"
            />
            <div className="p-3 flex items-center justify-center">
                <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("sold")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
            </div>
            <div className="p-3 flex items-center justify-center">
                <input
                    type="checkbox"
                    defaultChecked={true}
                    {...register("forSale")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
            </div>
            <div className="p-3">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images")}
                    className="w-full text-sm"
                />
            </div>
            <div className="p-3 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => deleteFunc(id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default AddToDatabase;
