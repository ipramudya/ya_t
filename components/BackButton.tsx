"use client";

import { cn } from "@/lib";
import { useRouter } from "next/navigation";
import { Icons } from "./Icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export function BackButton({ className, ...props }: Props) {
    const router = useRouter();

    function handleBack() {
        router.back();
    }

    return (
        <button
            className={cn("flex items-center justify-center gap-1", className)}
            onClick={handleBack}
            {...props}
        >
            <Icons.ArrowBack />
            <span className="text-sm font-semibold">Back</span>
        </button>
    );
}
