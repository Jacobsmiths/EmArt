import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthContext";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const navigate = useNavigate();
    const password = watch("Password");
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [signUpMessage, setSignupMessage] = React.useState("");

    const { login } = useAuth();

    const onSubmit = async (loginData) => {
        setIsRegistering(true);
        try {
            const response = await fetch(`/api/Auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            console.log("Login response:", data);
            login(data.token, data.userId);
            setIsRegistering(false);
            setSignupMessage("You have successfully logged in!");
            navigate("/administration");
        } catch (error) {
            console.error("Login failed:", error);
            setSignupMessage("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col justify-self-center p-8 m-20 rounded-2xl bg-fuchsia-300 border-2 border-fuchsia-500 shadow-md ">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <FormInput
                    id="Email"
                    type="email"
                    label="Email Address"
                    disabled={isRegistering}
                    error={errors.Email?.message}
                    {...register("Email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                <FormInput
                    id="Password"
                    type="password"
                    label="Password"
                    disabled={isRegistering}
                    error={errors.Password?.message}
                    {...register("Password", {
                        required: "Password is required",
                    })}
                />
                <FormInput
                    id="ConfirmPassword"
                    type="password"
                    label="Confirm Password"
                    disabled={isRegistering}
                    error={errors.ConfirmPassword?.message}
                    {...register("ConfirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === password || "Passwords do not match",
                    })}
                />

                <Button
                    type="submit"
                    loading={isRegistering}
                    width="full"
                    className="justify-self-center flex bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Register
                </Button>
                {signUpMessage && (
                    <p className="mt-1 text-sm text-red-600">{signUpMessage}</p>
                )}
            </form>
        </div>
    );
};

export default RegisterPage;
