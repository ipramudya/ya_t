"use client";

import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { MainButton } from "./MainButton";
import { loginSchema } from "@/lib/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/api";

type LoginFormInputs = {
    emailOrUsername: string;
    password: string;
};

export function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid }
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await api.authService.login({
                emailOrUsername: data.emailOrUsername,
                password: data.password
            });
            router.push("/");
            toast.success(response.message);
        } catch (error) {
            toast.error((error as Error).message);
        }
    });

    return (
        <form className="flex flex-col" onSubmit={onSubmit}>
            <InputField
                {...register("emailOrUsername")}
                placeholder="Enter Username/Email"
                className="mb-3"
                error={!!errors.emailOrUsername}
            />
            <div className="mb-6">
                <InputField
                    {...register("password")}
                    placeholder="Enter Password"
                    type="password"
                    error={!!errors.password}
                />
            </div>

            <MainButton type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
            </MainButton>
        </form>
    );
}
