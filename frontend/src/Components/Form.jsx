import React from "react";
import { useForm } from "react-hook-form";

/**
 * @abstract this basically is a super complex highly sophisticated form wrapper element
 * basically what it does it process all inputs and recursively steps through the children components
 * and find out which one is an input or select and then adds the register function to them
 * this allows users to wrap inputs with divs to allow for style and label association
 */

export function Input({ register, name, requirements, ...rest }) {
    return <input {...register(name, requirements)} {...rest} />;
}

export function Select({ register, name, options, requirements, ...rest }) {
    return (
        <select {...register(name, requirements)} {...rest}>
            {options.map((option, idx) => {
                // If it's a string, just use it as both value and label
                if (typeof option === "string") {
                    return (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    );
                }

                // If it's an object with value + label, use them properly
                return (
                    <option key={idx} value={option.value}>
                        {option.label}
                    </option>
                );
            })}
        </select>
    );
}

export function Form({ children, defaultValues, onSubmit, ...props }) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues });

    function processChild(child) {
        if (!React.isValidElement(child)) return child;
        if (
            child.props?.name &&
            (child.type === Input || child.type === Select)
        ) {
            return (
                <React.Fragment key={child.props.name}>
                    {React.createElement(child.type, {
                        ...child.props,
                        register,
                    })}
                    {errors[child.props.name] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[child.props.name]?.message}
                        </p>
                    )}
                </React.Fragment>
            );
        }
        if (child.props?.children) {
            return React.cloneElement(child, {
                ...child.props,
                children: React.Children.map(
                    child.props.children,
                    processChild
                ),
            });
        }
        return child;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
            {React.Children.map(children, processChild)}
        </form>
    );
}
