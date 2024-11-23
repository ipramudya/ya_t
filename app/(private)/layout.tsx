import { UserProvider } from "@/components";
import { getUserProfile } from "@/lib/db/queries";
import { verifyToken } from "@/lib/jwt";
import { tokenManager } from "@/lib/tokenManager";
import { UserData } from "@/types/user";
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

    let profile: UserData | null = null;
    try {
        profile = await getUserProfile(payload.userId);
    } catch (e) {
        console.log("error getting user profile:", e);
    }

    return <UserProvider user={profile}>{children}</UserProvider>;
}
