import React from "react";
import { useForm } from "react-hook-form";

export function Form({ children, defaultValues, onSubmit, ...props }) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues });
    return (
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
            {Array.isArray(children)
                ? children.map((child, index) => {
                      return (
                          <React.Fragment key={child.props?.name || index}>
                              {child.props?.name
                                  ? React.createElement(child.type, {
                                        register,
                                        ...child.props,
                                        key: child.props.name,
                                    })
                                  : child}
                              {errors[child.props?.name] && (
                                  <span className="mt-1 text-sm text-red-600">
                                      {errors[child.props.name].message}
                                  </span>
                              )}
                          </React.Fragment>
                      );
                  })
                : children}
        </form>
    );
}

export function Input({ register, name, requirements, ...rest }) {
    return <input {...register(name, requirements)} {...rest} />;
}

export function Select({ register, name, options, requirements, ...rest }) {
    return (
        <select {...register(name, requirements)} {...rest}>
            {options.map((option) => {
                return <option value={option}>{option}</option>;
            })}
        </select>
    );
}
