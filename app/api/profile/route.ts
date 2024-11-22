import { getProfileByUserId, upsertProfile } from "@/lib/database";
import { uploadImage, enhanceProfileWithImageUrl } from "@/lib/storage";
import { tokenManager } from "@/lib/tokenManager";
import { verifyToken } from "@/lib/jwt";
import { ProfileDatabaseRequest, ProfileResponse } from "@/types/profile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const tokenization = await tokenManager();
        const token = tokenization.getToken();
        if (!token) {
            throw new Error("unauthorized: no token provided");
        }

        const payload = await verifyToken(token);
        if (!payload) {
            throw new Error("unauthorized: invalid token");
        }

        const formData = await request.formData();
        const profileData: Partial<Omit<ProfileDatabaseRequest, "userID">> = {
            displayName: formData.get("displayName") as string,
            gender: (formData.get("gender") as "male" | "female") || "male",
            birthday: new Date(
                formData.get("birthday") as string
            ).toISOString(),
            height: parseInt(formData.get("height") as string),
            weight: parseInt(formData.get("weight") as string)
        };

        const profileImage = formData.get("profileImage") as File;
        if (profileImage) {
            const fileId = await uploadImage(profileImage);
            profileData.profilePictureID = fileId;
        }

        await upsertProfile(
            payload.userId,
            profileData as Omit<ProfileDatabaseRequest, "userID">
        );

        return NextResponse.json({
            message: "Profile updated successfully"
        });
    } catch (error) {
        const message = `failed to update profile: ${(error as Error).message}`;
        return NextResponse.json({ message }, { status: 401 });
    }
}

export async function GET() {
    try {
        const tokenization = await tokenManager();
        const token = tokenization.getToken();
        if (!token) {
            throw new Error("No authentication token provided");
        }

        if (!token) {
            throw new Error("unauthorized: no token provided");
        }

        const payload = await verifyToken(token);
        if (!payload) {
            throw new Error("unauthorized: invalid token");
        }

        const decoded = await verifyToken(token);
        if (!decoded || decoded.userId !== payload.userId) {
            throw new Error("Unauthorized");
        }

        const profile = await getProfileByUserId(payload.userId);
        if (!profile) {
            throw new Error("Profile not found");
        }

        const enhancedProfile = await enhanceProfileWithImageUrl(profile);

        return NextResponse.json<ProfileResponse>({
            profile: enhancedProfile,
            message: "Profile fetched successfully"
        });
    } catch (error) {
        const message = `Failed to fetch profile: ${(error as Error).message}`;
        return NextResponse.json({ message }, { status: 400 });
    }
}
