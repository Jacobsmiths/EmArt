import React, { useState, useRef, useEffect } from "react";
import useClickedOutside from "../hooks/useClickedOutside";
import ModalBackdrop from "./ModalBackdrop";
import { Form, Select } from "./Form";

const PortfolioForm = ({
    portfolioPaintings,
    paintings,
    addToPortfolio,
    removeFromPortfolio,
}) => {
    const headers = ["Painting", "Order", "Actions"];
    const paintingFormRef = useRef(null);
    const portfolioPaintingIDs = new Set(
        portfolioPaintings.map((pp) => pp.painting.id)
    );
    const [paintingFormFocused, setPaintingFormFocused] = useClickedOutside(
        paintingFormRef,
        false
    );

    const paintingForm = () => {
        return (
            <ModalBackdrop
                className=" flex items-center justify-center p-10 "
                ref={paintingFormRef}
            >
                <div className="bg-white rounded-2xl w-full max-w-3xl">
                    <h1 className="text-center font-bold text-2xl p-2">
                        Add Painting to Gallery
                    </h1>
                    <Form
                        onSubmit={(data) => {
                            if (
                                !data.painting ||
                                isNaN(Number(data.painting))
                            ) {
                                alert("Please select a painting.");
                                return;
                            }
                            console.log("Selected painting id:", data);
                            addToPortfolio({
                                paintingID: data.painting,
                                order: portfolioPaintingIDs.size + 1,
                            });
                        }}
                        className="p-4 flex flex-col space-y-4"
                        defaultValues={{ painting: "" }}
                    >
                        <label>
                            <span>Select Painting: </span>
                            <Select
                                name="painting"
                                options={[
                                    {
                                        value: "",
                                        label: "Select a painting...",
                                    },
                                    ...paintings
                                        .filter(
                                            (p) =>
                                                !portfolioPaintingIDs.has(p.id)
                                        )
                                        .map((p) => ({
                                            value: p.id,
                                            label: p.name,
                                        })),
                                ]}
                                className="w-32"
                            />
                        </label>

                        <button
                            type="submit"
                            className="w-fit self-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm transition-colors"
                        >
                            Add
                        </button>
                    </Form>
                </div>
            </ModalBackdrop>
        );
    };

    return (
        <div className="w-full">
            {/* Paintings Table */}
            <div className="overflow-hidden border border-gray-300 rounded-lg">
                {paintingFormFocused && paintingForm()}
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
                        {portfolioPaintings.map((painting, index) => {
                            const { order } = painting;
                            const name = painting.painting.name;
                            const bg =
                                index % 2 === 0 ? "bg-gray-50" : "bg-white";
                            return (
                                <tr
                                    key={index}
                                    className={`${bg} border-b divide-x divide-gray-200 border-gray-200`}
                                >
                                    <td className="p-3 text-center">{name}</td>
                                    <td className="p-3 text-center">{order}</td>
                                    <td
                                        className="p-3 text-center"
                                        style={{ width: "200px" }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromPortfolio(painting.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Remove
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
                        setPaintingFormFocused(true);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Add Painting
                </button>
            </div>
        </div>
    );
};

export default PortfolioForm;
