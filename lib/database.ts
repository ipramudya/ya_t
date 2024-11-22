"use server";

import { ID, Query } from "node-appwrite";
import { UserDatabaseRequest, UserDatabaseResponse } from "../types/user";
import { database } from "./appwrite";

const DATABASE_ID = "66b8803000122551e2fb";
const USERS_COLLECTION_ID = "67401a5100232f523a49";

export type UserCollection = {
    $id: string;
    email: string;
    username: string;
    password: string;
    $createdAt?: string;
    $updatedAt?: string;
};

export async function createUser(
    userData: UserDatabaseRequest
): Promise<UserDatabaseResponse> {
    try {
        // Check if email exists
        const existingEmail = await database.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal("email", userData.email)]
        );

        if (existingEmail.documents.length > 0) {
            throw new Error("email already registered");
        }

        // Check if username exists
        const existingUsername = await database.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal("username", userData.username)]
        );

        if (existingUsername.documents.length > 0) {
            throw new Error("username already taken");
        }

        // Create user document
        const user = await database.createDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            ID.unique(),
            {
                email: userData.email,
                username: userData.username,
                password: userData.password
            }
        );

        return user as unknown as UserDatabaseResponse;
    } catch (error) {
        console.log("error creating user:", error);
        throw error;
    }
}

export async function getUserById(
    userId: string
): Promise<UserDatabaseResponse | null> {
    try {
        const user = await database.getDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            userId
        );
        return user as unknown as UserDatabaseResponse;
    } catch (error) {
        console.log("error getting user by ID:", error);
        return null;
    }
}

export async function deleteUser(userId: string): Promise<boolean> {
    try {
        await database.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);
        return true;
    } catch (error) {
        console.log("error deleting user:", error);
        throw error;
    }
}

export async function getUserByEmailOrUsername(
    emailOrUsername: string
): Promise<UserDatabaseResponse | null> {
    try {
        const users = await database.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [
                Query.or([
                    Query.equal("email", emailOrUsername),
                    Query.equal("username", emailOrUsername)
                ])
            ]
        );

        return users.documents[0] as unknown as UserDatabaseResponse;
    } catch (error) {
        console.log("error getting user by email or username:", error);
        return null;
    }
}
