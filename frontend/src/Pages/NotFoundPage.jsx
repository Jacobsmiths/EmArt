import React from "react";
import { FcVlc } from "react-icons/fc";

const NotFoundPage = () => {
    return (
        <>
            <title>Emersons Art | Not Found</title>
            <div className="flex flex-col items-center p-8">
                <FcVlc className="text-6xl mb-4" />
                <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
                <p className="text-lg text-gray-600">
                    Sorry, the page you are looking for does not exist.
                </p>
            </div>
        </>
    );
};

export default NotFoundPage;
