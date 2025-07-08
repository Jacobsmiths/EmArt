import React, { useState } from "react";
import { Form, Input } from "./Form";

const AddToDatabase = ({
    className,
    columns,
    onSubmit,
    onDelete,
    defaultValues,
    ...props
}) => {
    const [images, setImages] = useState([]);
    const [imageOrder, setImageOrder] = useState([]);

    return (
        <Form
            className={`bg-white p-8 shadow-md rounded-xl w-full max-w-2xl mx-auto space-y-6 ${className}`}
            onSubmit={(data) => {
                onSubmit({ ...data, images: imageOrder });

                // setImages(imageOrder);
            }}
            defaultValues={defaultValues}
        >
            <label className="flex flex-col gap-1">
                <span className="font-medium">Painting</span>
                <Input
                    className="input"
                    placeholder="Name"
                    name="name"
                    requirements={{ required: "...um you forgot a name" }}
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Description</span>
                <Input
                    className="input"
                    placeholder="Description"
                    name="description"
                    requirements={{ required: "add a description bruh" }}
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Price</span>
                <Input
                    type="number"
                    className="input w-32"
                    placeholder="Price"
                    name="price"
                    requirements={{ required: "yo you forgot a price" }}
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Size</span>
                <div className="flex flex-row">
                    <Input
                        className="input w-20 px-2"
                        placeholder="Width"
                        name="width"
                        requirements={{
                            required: "u forgot to add the size",
                        }}
                    />{" "}
                    x{" "}
                    <Input
                        className="input w-20 px-2"
                        placeholder="Height"
                        name="height"
                        requirements={{
                            required: "u forgot to add the size",
                        }}
                    />
                </div>
            </label>

            <div className="flex gap-6">
                <label className="flex items-center gap-2">
                    <Input
                        type="checkbox"
                        // defaultChecked={false}
                        className="checkbox"
                        name="sold"
                    />
                    <span className="text-sm">Sold</span>
                </label>

                <label className="flex items-center gap-2">
                    <Input
                        type="checkbox"
                        // defaultChecked={true}
                        className="checkbox"
                        name="forSale"
                    />
                    <span className="text-sm">For Sale</span>
                </label>
            </div>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Images</span>
                <Input
                    type="file"
                    multiple
                    accept="image/*"
                    className="text-sm"
                    name="images"
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setImages(files);
                    }}
                />
            </label>

            {images.length > 0 && (
                <div className="flex flex-col gap-2 mt-4">
                    <span className="font-medium">Select Images in Order:</span>
                    <div className="grid grid-cols-2 gap-2">
                        {images.map((image, index) => (
                            <label
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    type="checkbox"
                                    className="checkbox"
                                    requirements={{ required: "*" }}
                                    value={image.name}
                                    name={image.name}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setImageOrder((prev) => [
                                                ...prev,
                                                image,
                                            ]);
                                        } else {
                                            setImageOrder((prev) =>
                                                prev.filter(
                                                    (el) =>
                                                        el.name !== image.name
                                                )
                                            );
                                        }
                                    }}
                                />
                                <span className="text-sm">{image.name}</span>
                            </label>
                        ))}
                    </div>
                    {imageOrder.length > 0 && (
                        <div className="text-sm text-gray-600 mt-2">
                            <strong>Order:</strong>{" "}
                            {imageOrder.map((image, idx) => (
                                <span key={idx} className="mr-1">
                                    {image.name}
                                    {idx < imageOrder.length - 1 ? "," : ""}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="w-fit self-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm transition-colors"
                >
                    Add
                </button>
                <button
                    type="button"
                    className="w-fit self-center bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm transition-colors"
                    onClick={() => {
                        onDelete(defaultValues.id);
                    }}
                >
                    Delete
                </button>
            </div>
        </Form>
    );
};

export default AddToDatabase;
