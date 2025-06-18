import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AddToDatabase from "./AddToDatabase";
import ModalBackdrop from "./ModalBackdrop";
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
    const paintingFormRef = useRef(null);
    const [paintingFormFocused, setPaintingFormFocused] = useClickedOutside(
        paintingFormRef,
        false
    );

    const [painting, setPainting] = useState(null);

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

    // difference between this and addToPaintings is that these gaurenteed to have ids
    const onSubmit = (data) => {
        console.log("Form data:", data);
    };

    const paintingForm = (painting) => {
        return (
            <ModalBackdrop
                className=" flex items-center justify-center p-10 "
                ref={paintingFormRef}
            >
                <div className="bg-white border rounded-2xl w-full max-w-3xl">
                    <h1 className="text-center font-bold text-2xl p-2">
                        {painting
                            ? "Edit Painting"
                            : "Add Painting to Database"}
                    </h1>
                    {painting ? (
                        <AddToDatabase
                            columns={columns}
                            onSubmit={(data) => {
                                setPaintingFormFocused(false);
                                onSubmit(data);
                            }}
                            defaultValues={{
                                ...painting,
                                size: `${painting.size.height} x ${painting.size.width}`,
                            }}
                        />
                    ) : (
                        <AddToDatabase
                            columns={columns}
                            onSubmit={(data) => {
                                setPaintingFormFocused(false);
                                addToPaintings(data);
                            }}
                        />
                    )}
                </div>
            </ModalBackdrop>
        );
    };

    return (
        <div className="w-full">
            {/* Paintings Table */}
            <div className="overflow-hidden border border-gray-300 rounded-lg">
                {paintingFormFocused && paintingForm(painting)}
                <table className="w-full border-collapse">
                    {/* Header Row */}
                    <thead>
                        <tr className="bg-gray-200 divide-x divide-black">
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="p-3 text-center font-bold bg-gray-200 border-b border-gray-300"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Data Rows */}
                    <tbody>
                        {paintings.map((painting, index) => {
                            const {
                                name,
                                description,
                                price,
                                size,
                                sold,
                                forSale,
                                images,
                            } = painting;
                            const bg =
                                index % 2 === 0 ? "bg-gray-50" : "bg-white";
                            return (
                                <tr
                                    key={index}
                                    className={`${bg} border-b divide-x divide-gray-200 border-gray-200`}
                                >
                                    <td className="p-3">{name}</td>
                                    <td className="p-3">{description}</td>
                                    <td className="p-3 text-right">${price}</td>
                                    <td className="p-3 text-center">
                                        {size.height} x {size.width}
                                    </td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`inline-block w-3 h-3  ${
                                                sold
                                                    ? "bg-green-500"
                                                    : "bg-gray-300"
                                            }`}
                                        ></span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`inline-block w-3 h-3  ${
                                                forSale
                                                    ? "bg-blue-500"
                                                    : "bg-gray-300"
                                            }`}
                                        ></span>
                                    </td>
                                    <td className="p-3 text-center text-gray-600 text-sm">
                                        {images?.length > 0
                                            ? `${images}`
                                            : "No images"}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPainting(painting);
                                                setPaintingFormFocused(true);
                                            }}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex gap-2">
                <button
                    type="button"
                    onClick={() => {
                        setPainting(null);
                        setPaintingFormFocused(true);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Add New Painting
                </button>
            </div>
        </div>
    );
};

export default AdminForm;
