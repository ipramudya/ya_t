import { AuthProvider } from "@/components";
import { verifyToken } from "@/lib/jwt";
import { tokenManager } from "@/lib/tokenManager";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
    const tokenization = await tokenManager();
    const token = tokenization.getToken();

    if (!token) {
        redirect("/login");
    }

    const payload = await verifyToken(token);

    if (!payload) {
        tokenization.removeToken();
        redirect("/login");
    }

    return <AuthProvider user={payload}>{children}</AuthProvider>;
}
