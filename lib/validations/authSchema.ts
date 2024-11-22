import { z } from "zod";

export const registerSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must not exceed 20 characters"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(50, "Password must not exceed 50 characters"),
        confirmPassword: z.string().min(1, "Password confirmation is required")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    });

export const loginSchema = z.object({
    emailOrUsername: z
        .string()
        .min(1, "Username/Email is required")
        .refine((value) => {
            // Check if it's a valid email or a valid username
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const isUsername = value.length >= 3 && value.length <= 20;
            return isEmail || isUsername;
        }, "Invalid email or username format"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must not exceed 50 characters")
});
