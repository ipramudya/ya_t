"use client";

import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { MainButton } from "./MainButton";

type LoginFormInputs = {
    emailOrUsername: string;
    password: string;
};

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col" onSubmit={onSubmit}>
            <InputField
                {...register("emailOrUsername", {
                    required: "Username/Email is required"
                })}
                placeholder="Enter Username/Email"
                className="mb-3"
                error={!!errors.emailOrUsername}
            />
            <div className="mb-6">
                <InputField
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    placeholder="Enter Password"
                    type="password"
                    error={!!errors.password}
                />
            </div>

            <MainButton type="submit" disabled>
                Login
            </MainButton>
        </form>
    );
}
