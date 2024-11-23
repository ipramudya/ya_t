import { addInterest } from "@/lib/db/queries";
import { verifyToken } from "@/lib/jwt";
import { tokenManager } from "@/lib/tokenManager";
import { AddProfileInterestPayloadRequest } from "@/types/profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const [tokenization, jsonReq] = await Promise.all([tokenManager(), request.json()]);

        const token = tokenization.getToken();
        if (!token) {
            throw new Error("unauthorized: no token provided");
        }

        const payload = await verifyToken(token);
        if (!payload) {
            throw new Error("unauthorized: invalid token");
        }

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
