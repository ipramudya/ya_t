"use client";

import { useUser } from "@/hooks/useUser";
import { Header } from "./Header";
import { Icons } from "./Icons";

export function HomeHeader() {
    const { user } = useUser();

    return (
        <Header title={`@${user?.username || "johndoe123"}`}>
            <button className="flex size-6 items-center justify-center">
                <Icons.More />
            </button>
        </Header>
    );
}
