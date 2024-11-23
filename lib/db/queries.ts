/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ProfileDatabaseRequest } from "@/types/profile";
import { UserDatabaseRequest } from "@/types/user";
import { eq, sql } from "drizzle-orm";
import { db } from "./client";
import { profilesTable as profiles, usersTable as users } from "./schema";

export async function createUser(userData: UserDatabaseRequest) {
    try {
        const [existingUser] = await db
            .select()
            .from(users)
            .where(
                sql`email = ${userData.email} OR username = ${userData.username}`
            );

        if (existingUser) {
            throw new Error("email or username already registered");
        }

        await db.insert(users).values({
            email: userData.email,
            username: userData.username,
            password: userData.password
        });
    } catch (error) {
        console.log("error creating user:", error);
        throw error;
    }
}

export async function getUserByEmailOrUsername(emailOrUsername: string) {
    try {
        const [user] = await db
            .select()
            .from(users)
            .where(
                sql`email = ${emailOrUsername} OR username = ${emailOrUsername}`
            );

        return user;
    } catch (error) {
        console.log("error getting user by email or username:", error);
        return null;
    }
}

export async function upsertProfile(
    userId: string,
    profileData: ProfileDatabaseRequest
) {
    try {
        const [existingProfile] = await db
            .select()
            .from(profiles)
            .where(eq(profiles.userId, userId));

        const remappedData = {
            displayName: profileData.displayName,
            gender: profileData.gender,
            birthday: profileData.birthday,
            height: profileData.height,
            weight: profileData.weight,
            userId
        } as ProfileDatabaseRequest;

        // Only include profileURL if it's provided
        if (profileData.profileURL) {
            remappedData.profileURL = profileData.profileURL;
        }

        if (existingProfile) {
            const [updated] = await db
                .update(profiles)
                .set(remappedData)
                .where(eq(profiles.userId, userId))
                .returning();

            return updated;
        } else {
            // For new profile, ensure profileURL is set
            if (!remappedData.profileURL) {
                remappedData.profileURL = ""; // or a default image URL
            }
            const [inserted] = await db
                .insert(profiles)
                .values(remappedData)
                .returning();

            return inserted;
        }
    } catch (error) {
        console.log("error upserting profile:", error);
        throw error;
    }
}

export async function getUserProfile(userId: string) {
    try {
        const [profile] = await db
            .select({
                id: users.id,
                username: users.username,
                email: users.email,
                displayName: profiles.displayName,
                gender: profiles.gender,
                birthday: profiles.birthday,
                height: profiles.height,
                weight: profiles.weight,
                profileId: profiles.id,
                profileURL: profiles.profileURL,
                interests: profiles.interests
            })
            .from(users)
            .innerJoin(profiles, eq(users.id, profiles.userId))
            .where(eq(profiles.userId, userId));

        if (!profile) {
            throw new Error("user not found");
        }

        return profile;
    } catch (error) {
        console.log("error getting user profile:", error);
        throw error;
    }
}
