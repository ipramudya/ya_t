"use server";

import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password: " + (error as Error).message);
    }
}

export async function verifyPassword(password: string, hashedPassword: string) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error(
            "Error verifying password: " + (error as Error).message
        );
    }
}
