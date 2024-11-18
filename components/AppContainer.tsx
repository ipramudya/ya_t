import { cn } from "@/lib";
import { type PropsWithChildren } from "react";

type ClassNames = {
    Main?: string;
    Container?: string;
};

interface Props extends PropsWithChildren {
    inputPage?: boolean;
    classNames?: ClassNames;
}

export function AppContainer({
    children,
    classNames,
    inputPage = false
}: Props) {
    return (
        <main
            className={cn(
                "min-h-dvh text-white",
                inputPage
                    ? "from-gradient-from via-gradient-mid to-gradient-to bg-gradient-to-l"
                    : "bg-brand-900",
                classNames?.Main
            )}
        >
            <div
                className={cn(
                    "mx-auto max-w-screen-sm px-2 py-10",
                    classNames?.Container
                )}
            >
                {children}
            </div>
        </main>
    );
}
