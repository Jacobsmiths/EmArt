import React, { useState } from "react";
import { Form, Input } from "./Form";
import Button from "./Button";
import { IoIosAdd } from "react-icons/io";

const AddToDatabase = ({
  className,
  onSubmit,
  onDelete,
  defaultValues,
  ...props
}) => {
  const [images, setImages] = useState([]);

  return (
    <Form
      className={`bg-white p-8 shadow-md rounded-xl w-full max-w-2xl mx-auto space-y-6 ${className}`}
      onSubmit={(data) => {
        onSubmit({ ...data, images: images });
      }}
      defaultValues={defaultValues}
    >
      {/* Painting Name */}
      <label className="flex flex-col gap-1">
        <span className="font-medium">Painting</span>
        <Input
          className="input"
          placeholder="Name"
          name="name"
          requirements={{ required: "...um you forgot a name" }}
        />
      </label>

      {/* Description */}
      <label className="flex flex-col gap-1">
        <span className="font-medium">Description</span>
        <Input
          className="input"
          placeholder="Description"
          name="description"
          requirements={{ required: "add a description bruh" }}
        />
      </label>

      {/* Price */}
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

      {/* Size */}
      <label className="flex flex-col gap-1">
        <span className="font-medium">Size</span>
        <div className="flex flex-row items-center gap-2">
          <Input
            className="input w-20 px-2"
            placeholder="Width"
            name="width"
            requirements={{ required: "u forgot to add the size" }}
          />
          <span>x</span>
          <Input
            className="input w-20 px-2"
            placeholder="Height"
            name="height"
            requirements={{ required: "u forgot to add the size" }}
          />
        </div>
      </label>

      {/* Status Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <Input type="checkbox" className="checkbox" name="sold" />
          <span className="text-sm">Sold</span>
        </label>

        <label className="flex items-center gap-2">
          <Input type="checkbox" className="checkbox" name="forSale" />
          <span className="text-sm">For Sale</span>
        </label>
      </div>

      {/* Image Upload */}
      <label className="flex flex-col gap-1">
        <span className="font-medium">
          Images <span className="text-sm">(add images in order)</span>
        </span>

        {/* Image List */}
        {images.length > 0 && (
          <div className="flex flex-col gap-1 mt-4">
            {images.map((image, index) => (
              <div key={index} className="flex justify-between items-center">
                {console.log(image)}
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <Button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="bg-red-500 rounded-full w-8 h-8 text-center text-white font-bold"
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Plus button */}
        <button
          type="button"
          onClick={() => document.getElementById("imageUpload").click()}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-xl hover:bg-gray-300 transition"
        >
          <IoIosAdd size={20} />
        </button>

        {/* Hidden file input */}
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          name="images"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setImages((prev) => [...prev, ...files]); // append instead of replace
          }}
        />
      </label>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm transition-colors"
        >
          Add
        </Button>
        <Button
          type="button"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition-colors"
          onClick={() => onDelete(defaultValues.id)}
        >
          Delete
        </Button>
      </div>
    </Form>
  );
};

export default AddToDatabase;
