import { type PropsWithChildren } from "react";
import { BackButton } from "./BackButton";

interface Props extends PropsWithChildren {
    title?: string;
}

export function Header({ title, children }: Props) {
    return (
        <header className="relative mb-6 flex h-fit w-full flex-row items-center justify-between">
            <BackButton />
            <h2 className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                {title}
            </h2>
            {children}
        </header>
    );
}
