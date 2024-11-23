"use client";

import { api } from "@/api";
import { InputField, MainButton } from "@/components";
import { registerSchema } from "@/lib/validations";
import { RegisterFormInputs } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function RegisterForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    });

    const onSubmit = handleSubmit(async ({ email, password, username }) => {
        try {
            const response = await api.authService.register({
                username,
                email,
                password
            });
            router.push("/login");
            toast(response.message);
        } catch (error) {
            toast.error((error as Error).message);
        }
    });

    return (
        <form className="flex flex-col" onSubmit={onSubmit}>
            <InputField
                placeholder="Enter Email"
                className="mb-3"
                error={!!errors.email}
                {...register("email")}
            />
            <InputField
                placeholder="Create Username"
                className="mb-3"
                error={!!errors.username}
                {...register("username")}
            />
            <div className="mb-3">
                <InputField
                    placeholder="Create Password"
                    type="password"
                    error={!!errors.password}
                    {...register("password")}
                />
            </div>
            <div className="mb-6">
                <InputField
                    placeholder="Confirm Password"
                    type="password"
                    error={!!errors.confirmPassword}
                    {...register("confirmPassword")}
                />
            </div>
            <MainButton type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
            </MainButton>
        </form>
    );
}
