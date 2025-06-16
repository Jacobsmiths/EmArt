import React from "react";
import { Form, Input } from "./Form";

const AddToDatabase = ({
    className,
    ref,
    columns,
    addToPaintings,
    ...props
}) => {
    return (
        <Form
            className={`grid grid-cols-2 gap-y-4 gap-x-8 px-12 py-8 ${className} border rounded-2xl w-full max-w-3xl
              [&>label]:text-right [&>label]:pr-4 [&>input]:col-span-1 [&>select]:col-span-1
              [&>button]:col-span-2 items-center`}
            ref={ref}
            onSubmit={(data) => {
                props.onHandleSubmit();
                addToPaintings(data);
            }}
        >
            <label>Painting</label>
            <Input
                className="w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                name="name"
                requirements
            />

            <label>Description</label>
            <Input
                className="w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                name="description"
            />

            <label>Price</label>
            <Input
                type="number"
                className="w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
                name="price"
            />

            <label>Size</label>
            <Input
                className="w-full bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="HxW"
                name="size"
            />

            <label>Sold</label>
            <Input
                type="checkbox"
                defaultChecked={false}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                name="sold"
            />

            <label>For Sale</label>
            <Input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                name="forSale"
            />

            <label>Images</label>
            <Input
                type="file"
                multiple
                accept="image/*"
                className="col-span-1 w-full text-sm"
                name="images"
            />

            <label></label>
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors justify-self-center"
            >
                Add
            </button>
        </Form>
    );
};

export default AddToDatabase;
