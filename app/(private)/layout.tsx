import { AuthProvider, UserProvider } from "@/components";
import { getUserProfile } from "@/lib/db/queries";
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

    const profile = await getUserProfile(payload.userId);

    return (
        <UserProvider user={profile}>
            <AuthProvider user={payload}>{children}</AuthProvider>
        </UserProvider>
    );
}
