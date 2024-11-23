import { cn } from "@/lib";
import { type PropsWithChildren } from "react";
import { BackgrounGradient } from "./BackgrounGradient";

type ClassNames = {
    Main?: string;
    Container?: string;
};

interface Props extends PropsWithChildren {
    inputPage?: boolean;
    classNames?: ClassNames;
}

export function AppContainer({ children, classNames, inputPage = false }: Props) {
    return (
        <>
            {inputPage && <BackgrounGradient />}
            <main
                className={cn(
                    "z-[1] min-h-dvh text-white",
                    inputPage ? "bg-transparent" : "bg-brand-900",
                    classNames?.Main
                )}
            >
                <div
                    className={cn(
                        "mx-auto max-w-screen-sm py-10",
                        inputPage ? "px-4" : "px-2",
                        classNames?.Container
                    )}
                >
                    {children}
                </div>
            </main>
        </>
    );
}
