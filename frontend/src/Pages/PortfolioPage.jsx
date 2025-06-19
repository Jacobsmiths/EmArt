import React from "react";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { NavLink } from "react-router";
import PopUp from "../Components/PopUp";

const ProductListings = () => {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);

    const breakpointColumnsObj = {
        default: 5,
        1200: 4,
        900: 3,
        600: 2,
        350: 1,
    };

    useEffect(() => {
        // const fetchProducts = async () => {
        //     const apiUrl = "/api/products";
        //     try {
        //         const res = await fetch(apiUrl);
        //         const data = await res.json();
        //         setProducts(data);
        //     } catch (error) {
        //         console.log("Error fetching data", error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchProducts();
        setPaintings([
            {
                filepath: "./test.jpg",
                name: "painting1",
                height: 10,
                width: 18,
                x: 25,
                y: 25,
                id: 1,
            },
            {
                filepath: "./test2.jpg",
                name: "painting2",
                height: 15,
                width: 20,
                x: 100,
                y: 125,
                id: 2,
            },
        ]);
    }, []);

    return (
        <div>
            <div className="px-4">
                <h1 className="text-center font-semibold p-4">
                    Welcome to my Portfolio!
                </h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="pt-10 my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                    key={"masonry"}
                >
                    {paintings.map((painting, index) => {
                        console.log(painting);
                        return (
                            <div key={index} className="p-[1px]">
                                <PopUp message={painting.name}>
                                    <NavLink to={`/view/${painting.id}`}>
                                        <img
                                            draggable={false}
                                            src={painting.filepath}
                                            className="w-full h-auto"
                                        />
                                    </NavLink>
                                </PopUp>
                            </div>
                        );
                    })}
                </Masonry>
            </div>
        </div>
    );
};

export default ProductListings;
