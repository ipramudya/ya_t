import { storeImage } from "@/lib/cloudinary";
import { upsertProfile } from "@/lib/db/queries";
import { verifyToken } from "@/lib/jwt";
import { tokenManager } from "@/lib/tokenManager";
import { ProfileDatabaseRequestV2 } from "@/types/profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const [tokenization, formData] = await Promise.all([
            tokenManager(),
            request.formData()
        ]);

        const token = tokenization.getToken();

        if (!token) {
            throw new Error("unauthorized: no token provided");
        }

        const payload = await verifyToken(token);
        if (!payload) {
            throw new Error("unauthorized: invalid token");
        }

        const profileImage = formData.get("profileImage") as File | null;
        if (!profileImage) {
            throw new Error("no image file provided");
        }

        const uploadedImage = await storeImage(payload.userId, profileImage);

        const data = {
            displayName: formData.get("displayName") as string,
            gender: formData.get("gender") as string,
            birthday: formData.get("birthday") as string,
            height: Number(formData.get("height")),
            weight: Number(formData.get("weight")),
            userID: payload.userId,
            profileURL: uploadedImage.secure_url
        } as ProfileDatabaseRequestV2;

        await upsertProfile(payload.userId, data);

        return NextResponse.json({
            message: "profile uploaded successfully"
        });
    } catch (error) {
        console.log("error updating profile:", error);
        return NextResponse.json(
            { message: "failed to update profile" },
            { status: 401 }
        );
    }
}
