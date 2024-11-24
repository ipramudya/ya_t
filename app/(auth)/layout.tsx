import { verifyToken } from "@/lib/jwt";
import { tokenManager } from "@/lib/tokenManager";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
    const tokenization = await tokenManager();
    const token = tokenization.getToken();

    // If there's a valid token, redirect to home
    if (token) {
        const payload = await verifyToken(token);
        if (payload) {
            redirect("/");
        }
        // If token is invalid, remove it
        tokenization.removeToken();
    }

    return <>{children}</>;
}
