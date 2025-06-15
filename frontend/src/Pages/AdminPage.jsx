import React, { useEffect, useState } from "react";
import AdminForm from "../Components/AdminForm";

const AdminPage = () => {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        setPaintings([
            {
                id: 1,
                name: "New Name",
                description: "test1",
                price: 400,
                size: {
                    height: 2,
                    width: 2,
                },
                filePaths: ["c712a067-6fbd-4771-a73b-7569b5cb2266.png"],
            },
            {
                id: 2,
                name: "Painting2",
                description: "test2",
                price: 30,
                size: {
                    height: 5,
                    width: 10,
                },
                filePaths: ["aa22bad4-0439-4965-af56-b3f605a35623.png"],
            },
        ]);
    }, []);

    return (
        <div className="grid grid-cols-[minmax(300px,1400px)] justify-center p-4">
            <h1 className="text-center font-bold text-2xl p-4">Admin Page</h1>
            <div className="text-lg font-bold pb-4">All Paintings</div>
            <AdminForm
                elements={paintings}
                headers={[
                    "Painting",
                    "Description",
                    "Price",
                    "Height x Width",
                    "Sold",
                    "For Sale",
                ]}
                isDatabaseForm={true}
            />
        </div>
    );
};

export default AdminPage;
