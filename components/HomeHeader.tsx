"use client";

import { useUser } from "@/hooks/useUser";
import { Header } from "./Header";

export function HomeHeader() {
    const { user } = useUser();

    return <Header title={`@${user?.username || "johndoe123"}`} />;
}
