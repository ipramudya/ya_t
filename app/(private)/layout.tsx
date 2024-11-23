import { UserProvider } from "@/components";
import { authenticateRequest } from "@/lib";
import { getUserProfile } from "@/lib/db/queries";
import { UserData } from "@/types/user";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
    const payload = await authenticateRequest(true);

    let profile: UserData | null = null;
    try {
        profile = await getUserProfile(payload.userId);
    } catch (error) {
        console.log("error getting user profile:", error);
    }

    return <UserProvider user={profile}>{children}</UserProvider>;
}
