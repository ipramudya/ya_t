"use server";

import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey";
const JWT_EXPIRES_IN = "24h";

interface JWTPayload {
    userId: string;
    email: string;
}

export async function generateAccessToken(payload: JWTPayload): Promise<string> {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        console.error("error verifying token", error);
        return null;
    }
}

export async function decodeToken(token: string): Promise<JWTPayload | null> {
    try {
        return jwt.decode(token) as JWTPayload;
    } catch (error) {
        console.error("error decoding token", error);
        return null;
    }
}
