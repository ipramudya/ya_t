import { authenticateRequest } from "@/lib";
import { storeImage } from "@/lib/cloudinary";
import { upsertProfile } from "@/lib/db/queries";
import { ProfileDatabaseRequest } from "@/types/profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const [payload, formData] = await Promise.all([authenticateRequest(), request.formData()]);

        const data = {
            displayName: formData.get("displayName") as string,
            gender: formData.get("gender") as "male" | "female",
            birthday: new Date(formData.get("birthday") as string),
            height: Number(formData.get("height")),
            weight: Number(formData.get("weight")),
            userId: payload.userId,
            profileURL: ""
        } satisfies ProfileDatabaseRequest;

        // Handle image upload only if an image is provided
        const profileImage = formData.get("profileImage") as File | null;
        if (profileImage) {
            const uploadedImage = await storeImage(payload.userId, profileImage);
            data.profileURL = uploadedImage.secure_url;
        }

        const updated = await upsertProfile(payload.userId, data);

        return NextResponse.json({
            message: "profile uploaded successfully",
            data: updated
        });
    } catch (error) {
        console.log("error updating profile:", error);
        return NextResponse.json({ message: "failed to update profile" }, { status: 401 });
    }
}
