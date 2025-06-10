import React, { useState } from "react";

const AdminForm = ({ headers, elements, addFunc, deleteFunc, updateFunc }) => {
    const allHeaders = [...headers, "Actions"];
    const [isEditing, setIsEditing] = useState(false);

    const columns = {
        display: "grid",
        gridTemplateColumns: `repeat(${allHeaders.length}, minmax(0, 1fr))`,
    };

    const handleEdit = (painting) => {
        if (updateFunc) {
            updateFunc(painting);
        }
    };

    const handleDelete = (paintingId) => {
        if (deleteFunc) {
            deleteFunc(paintingId);
        }
    };

    return (
        <div>
            {}
            <div className="border overflow-clip rounded-xl">
                <div className="bg-white border-b" style={columns}>
                    {allHeaders.map((header, index) => (
                        <div
                            className="border-gray-300 border-l p-4 text-center font-bold"
                            key={index}
                        >
                            {header}
                        </div>
                    ))}
                </div>

                {elements.map((painting, index) => {
                    const bg =
                        index % 2 === 0 ? "bg-[#f5f5f5]" : "bg-[#fafafa]";
                    return (
                        <div
                            key={painting.id}
                            className={`${bg} border-t border-gray-300`}
                            style={columns}
                        >
                            <div className="p-4 border-l border-gray-300">
                                {painting.name}
                            </div>
                            <div className="p-4 border-l border-gray-300">
                                {painting.description}
                            </div>
                            <div className="p-4 border-l border-gray-300">
                                ${painting.price}
                            </div>
                            <div className="p-4 border-l border-gray-300">
                                {`${painting.size.height}" x ${painting.size.width}"`}
                            </div>
                            <div className="p-4 border-l border-gray-300">
                                {`${painting.sold}`}
                            </div>
                            <div className="p-4 border-l border-gray-300">
                                {`${painting.forSale}`}
                            </div>
                            <div className="p-4 border-l border-gray-300 flex gap-2 justify-center items-center">
                                <button
                                    onClick={() => handleEdit(painting)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(painting.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {addFunc && (
                <div className="mt-4">
                    <button
                        onClick={addFunc}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                    >
                        Add New Painting
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminForm;
