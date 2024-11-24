"use server";

import { tokenManager } from "@/lib/tokenManager";
import { verifyToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export interface AuthResult {
    userId: string; // user payload
}

export async function authenticateRequest(redirectOnFail: boolean = false): Promise<AuthResult> {
    const tokenization = await tokenManager();
    const token = tokenization.getToken();

    if (!token) {
        if (redirectOnFail) {
            redirect("/login");
        }
        throw new Error("unauthorized: no token provided");
    }

    const payload = await verifyToken(token);
    if (!payload) {
        if (redirectOnFail) {
            tokenization.removeToken();
            redirect("/login");
        }
        throw new Error("unauthorized: invalid token");
    }

    return payload;
}
