"use client";

import { cn } from "@/lib";
import { forwardRef } from "react";
import { Icons } from "./Icons";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
}

export const SelectField = forwardRef<HTMLSelectElement, Props>(
    ({ className, children, error, ...props }, ref) => {
        return (
            <div className={cn("relative w-full", className)}>
                <select
                    ref={ref}
                    className={cn(
                        "flex h-9 w-full appearance-none items-center rounded-lg",
                        "border border-input-border bg-darken-input pl-5 pr-8",
                        "text-end text-sm text-white placeholder:text-[rgba(255,255,255,0.3)]",
                        "focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-offset-2",
                        error
                            ? "focus-visible:outline-red-500"
                            : "focus-visible:outline-input-border"
                    )}
                    {...props}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                    <Icons.ArrowDown />
                </div>
            </div>
        );
    }
);

SelectField.displayName = "Select";
