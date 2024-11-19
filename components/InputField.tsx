"use client";

import { cn } from "@/lib";
import { forwardRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Icons } from "./Icons";

const variants = tv({
    base: [
        "flex w-full items-center rounded-lg border px-5 text-sm text-white",
        "focus-visible:outline-input-border focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-offset-2"
    ],
    variants: {
        color: {
            primary: "bg-white-input border-transparent",
            outlined: "border-input-border bg-darken-input"
        },
        dimmension: {
            sm: "h-9",
            base: "h-[51px]"
        }
    },
    defaultVariants: {
        color: "primary",
        dimmension: "base"
    }
});

type ColorProps = VariantProps<typeof variants>["color"];
type DimensionsProps = VariantProps<typeof variants>["dimmension"];

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    color?: ColorProps;
    dimmension?: DimensionsProps;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
    ({ className, color, dimmension, type = "text", ...props }, ref) => {
        const [passwordShown, setPasswordShown] = useState(false);

        return type === "password" ? (
            <div className="relative w-full">
                <input
                    ref={ref}
                    className={cn(variants({ color, dimmension }), className)}
                    type={passwordShown ? "text" : "password"}
                    {...props}
                />
                <button
                    onClick={() => setPasswordShown((state) => !state)}
                    className="absolute right-4 top-1/2 size-fit -translate-y-1/2"
                    type="button"
                >
                    <Icons.Eye />
                </button>
            </div>
        ) : (
            <input
                ref={ref}
                className={cn(variants({ color, dimmension }), className)}
                {...props}
            />
        );
    }
);

InputField.displayName = "InputField";
