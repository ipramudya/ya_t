"use client";

import { cn } from "@/lib";
import { useRouter } from "next/navigation";
import { Icons } from "./Icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    navigateTo?: string;
}

export function EditButton({ className, navigateTo, onClick, ...props }: Props) {
    const router = useRouter();

    function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
        if (navigateTo) {
            router.push(navigateTo);
        } else if (onClick) {
            onClick(e);
        }
    }

    return (
        <button
            onClick={(e) => handleEdit(e)}
            className={cn("flex size-6 items-center justify-center", className)}
            {...props}
        >
            <Icons.Edit width={16} height={16} />
        </button>
    );
}
