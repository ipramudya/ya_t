"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const TOKEN_COOKIE_NAME = "auth_token";
const MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const SECURE = false;
const SAME_SITE = "lax";
const HTTP_ONLY = true;

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
    httpOnly: HTTP_ONLY,
    secure: SECURE,
    sameSite: SAME_SITE,
    path: "/",
    maxAge: MAX_AGE
};

export async function tokenManager() {
    const cookie = await cookies();

    return {
        setToken: (token: string) => {
            cookie.set(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
        },
        getToken: () => {
            return cookie.get(TOKEN_COOKIE_NAME)?.value;
        },
        removeToken: () => {
            cookie.delete(TOKEN_COOKIE_NAME);
        }
    };
}
