"use server";

import { ID, Query } from "node-appwrite";
import { UserDatabaseRequest, UserDatabaseResponse } from "../types/user";
import { database } from "./appwrite";
import {
    ProfileDatabaseRequest,
    ProfileDatabaseResponse
} from "@/types/profile";

const DATABASE_ID = "66b8803000122551e2fb";
const USERS_COLLECTION_ID = "67401a5100232f523a49";
const PROFILE_COLLECTION_ID = "67404137001ce36cef4e";

export async function createUser(
    userData: UserDatabaseRequest
): Promise<UserDatabaseResponse> {
    try {
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

export async function upsertProfile(
    userId: string,
    profileData: Omit<ProfileDatabaseRequest, "userID">
): Promise<ProfileDatabaseResponse> {
    try {
        const existingProfiles = await database.listDocuments(
            DATABASE_ID,
            PROFILE_COLLECTION_ID,
            [Query.equal("userID", userId)]
        );

        // Convert height and weight to integers
        const formattedData = {
            ...profileData,
            height: parseInt(String(profileData.height)),
            weight: parseInt(String(profileData.weight)),
            birthday: new Date(profileData.birthday).toISOString() // Format date
        };

        if (existingProfiles.documents.length > 0) {
            // Update existing profile
            return (await database.updateDocument(
                DATABASE_ID,
                PROFILE_COLLECTION_ID,
                existingProfiles.documents[0].$id,
                formattedData
            )) as unknown as ProfileDatabaseResponse;
        } else {
            // Create new profile
            return (await database.createDocument(
                DATABASE_ID,
                PROFILE_COLLECTION_ID,
                ID.unique(),
                {
                    ...formattedData,
                    userID: userId
                }
            )) as unknown as ProfileDatabaseResponse;
        }
    } catch (error) {
        console.log("error upserting profile:", error);
        throw error;
    }
}

export async function getProfileByUserId(
    userId: string
): Promise<ProfileDatabaseResponse | null> {
    try {
        const profiles = await database.listDocuments(
            DATABASE_ID,
            PROFILE_COLLECTION_ID,
            [Query.equal("userID", userId)]
        );

        return (
            (profiles.documents[0] as unknown as ProfileDatabaseResponse) ||
            null
        );
    } catch (error) {
        console.log("error getting profile:", error);
        throw error;
    }
}
