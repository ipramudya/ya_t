import { createUser } from "@/lib/db/queries";
import { hashPassword } from "@/lib/hashPassword";
import type { RegisterPayloadRequest, RegisterServerResponse } from "@/types/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const credentials: RegisterPayloadRequest = await request.json();

        const hashedPassword = await hashPassword(credentials.password);

        await createUser({
            email: credentials.email,
            username: credentials.username,
            password: hashedPassword
        });

        return NextResponse.json<RegisterServerResponse>({
            message: "Registration successful"
        });
    } catch (error) {
        const message = `error registering user, ${(error as Error).message}`;
        return NextResponse.json({ message }, { status: 400 });
    }
}
