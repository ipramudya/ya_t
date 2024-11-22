import { externalApi } from "@/api/client";
import { AuthCredentials } from "@/api/services/authService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const credentials: AuthCredentials = await request.json();
        const response = await externalApi.authService.login(credentials);

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 400 }
        );
    }
}
