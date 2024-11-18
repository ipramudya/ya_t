import { cn } from "@/lib";
import { type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className?: string;
}

export function AppContainer({ children, className }: Props) {
    return (
        <div className={cn("mx-auto max-w-screen-sm px-4 py-10", className)}>
            {children}
        </div>
    );
}
