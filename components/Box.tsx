import { cn } from "@/lib";
import { type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className?: string;
}

export function Box({ children, className }: Props) {
    return (
        <section className={cn("relative rounded-[14px] p-[14px]", className)}>
            {children}
        </section>
    );
}
