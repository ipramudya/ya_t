"use client";

import { cn } from "@/lib";
import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Icons } from "./Icons";

const inputVariants = tv({
    base: [
        "flex w-full items-center rounded-lg border px-5 text-sm text-white",
        "focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-offset-2"
    ],
    variants: {
        color: {
            primary: "border-transparent bg-white-input",
            outlined: "border-input-border bg-darken-input"
        },
        dimmension: {
            sm: "h-9",
            base: "h-[51px]"
        },
        error: {
            true: "focus-visible:outline-red-500",
            false: "focus-visible:outline-input-border"
        }
    },
    defaultVariants: {
        color: "primary",
        dimmension: "base",
        error: false
    },
    compoundVariants: [
        {
            color: "outlined",
            dimmension: "sm",
            className: "text-end placeholder:text-[rgba(255,255,255,0.3)]"
        }
    ]
});

type InputVariants = VariantProps<typeof inputVariants>;

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
    color?: InputVariants["color"];
    dimmension?: InputVariants["dimmension"];
    readOnly?: boolean;
    error?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            className,
            color,
            dimmension,
            readOnly,
            error,
            type = "text",
            ...props
        },
        ref
    ) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const togglePasswordVisibility = () => {
            setIsPasswordVisible((prev) => !prev);
        };

        const inputProps = {
            ref,
            className: cn(
                inputVariants({ color, dimmension, error }),
                className
            ),
            disabled: readOnly,
            ...props
        };

        if (type !== "password") {
            return <input type={type} {...inputProps} />;
        }

        return (
            <div className="relative w-full">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    {...inputProps}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 size-fit -translate-y-1/2"
                    disabled={readOnly}
                    aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                    }
                >
                    <Icons.Eye />
                </button>
            </div>
        );
    }
);
InputField.displayName = "InputField";
