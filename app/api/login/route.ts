import { getUserByEmailOrUsername } from "@/lib/database";
import { verifyPassword } from "@/lib/hashPassword";
import { generateAccessToken } from "@/lib/jwt";
import { tokenManager } from "@/lib/tokenManager";
import { LoginPayloadRequest, LoginServerResponse } from "@/types/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const credentials: LoginPayloadRequest = await request.json();

        const user = await getUserByEmailOrUsername(
            credentials.emailOrUsername
        );
        if (!user) {
            throw new Error("invalid credentials, no user found");
        }

        const isPasswordCorrect = await verifyPassword(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new Error("invalid credentials, password is incorrect");
        }

        const token = await generateAccessToken({
            userId: user.$id,
            email: user.email
        });

        const tokenization = await tokenManager();
        tokenization.setToken(token);

        return NextResponse.json<LoginServerResponse>({
            message: "Login successful"
        });
    } catch (error) {
        const message = `login failed: ${(error as Error).message}`;
        return NextResponse.json({ message }, { status: 401 });
    }
}