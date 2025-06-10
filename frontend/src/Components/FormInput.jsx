import React from "react";

const FormInput = (props) => {
    return (
        <div>
            <label
                htmlFor={props.id}
                className="block text-sm font-medium text-gray-700"
            >
                {props.label}
            </label>
            <input
                {...props}
                id={props.id}
                className={`mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    props.className ?? ""
                }`}
            />
            {props.error && (
                <p className="mt-1 text-sm text-red-600">{props.error}</p>
            )}
        </div>
    );
};

export default FormInput;
