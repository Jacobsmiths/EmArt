import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthContext";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });
    const baseurl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [signUpMessage, setSignupMessage] = React.useState("");
    const { login } = useAuth();

    const onSubmit = async (loginData) => {
        setIsRegistering(true);

        try {
            const response = await fetch(`${baseurl}/api-token-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            console.log("Login response:", data);
            login(data.token);
            setIsRegistering(false);
            setSignupMessage("You have successfully logged in!");
            navigate("/administration");
        } catch (error) {
            console.error("Login failed:", error);
            setSignupMessage("Login failed. Please try again.");
        }
    };

    return (
        <>
            <title>Emersons Art | Login</title>
            <div className="flex flex-col justify-center items-center ">
                <div className="w-md p-8 m-20 rounded-xl bg-fuchsia-300 border-2 border-fuchsia-500 shadow-md font-bold">
                    <div className="text-white">Admin Only</div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-4"
                    >
                        <FormInput
                            id="username"
                            type="username"
                            label="Username"
                            disabled={isRegistering}
                            error={errors.Email?.message}
                            {...register("username", {
                                required: "Username is required",
                                // pattern: {
                                //     value: /[A-Z0-9._%+-]/,
                                //     message: "Invalid username address",
                                // },
                            })}
                        />
                        <FormInput
                            id="password"
                            type="password"
                            label="Password"
                            disabled={isRegistering}
                            error={errors.Password?.message}
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <Button
                            type="submit"
                            loading={isRegistering}
                            width="full"
                            className="justify-self-center flex bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Log In
                        </Button>
                        {signUpMessage && (
                            <p className="mt-1 text-sm text-red-600">
                                {signUpMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
