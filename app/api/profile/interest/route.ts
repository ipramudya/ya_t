import { authenticateRequest } from "@/lib";
import { addInterest } from "@/lib/db/queries";
import type { AddProfileInterestPayloadRequest } from "@/types/profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const [payload, jsonReq] = await Promise.all([authenticateRequest(), request.json()]);

        const { interests } = jsonReq as AddProfileInterestPayloadRequest;

        if (!Array.isArray(interests)) {
            throw new Error("interests must be an array");
        }

        const updated = await addInterest(payload.userId, interests);

        return NextResponse.json({
            message: "interests added successfully",
            data: updated
        });
    } catch (error) {
        console.log("error updating profile:", error);
        return NextResponse.json({ message: "failed to update profile" }, { status: 401 });
    }
}
