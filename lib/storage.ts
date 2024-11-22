"use server";

import { ID } from "node-appwrite";
import { APPWRITE_PROJECT_ID, storage } from "./appwrite";
import {
    EnhancedProfileResponse,
    ProfileDatabaseResponse
} from "@/types/profile";

const BUCKET_ID = "6740542c0031e6f0333b";

export async function uploadImage(file: File): Promise<string> {
    try {
        const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
        return response.$id;
    } catch (error) {
        console.error("error uploading image:", error);
        throw error;
    }
}

export async function getProfileImageUrl(fileId: string) {
    return `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}&mode=admin`;
}

export async function enhanceProfileWithImageUrl(
    profile: ProfileDatabaseResponse
): Promise<EnhancedProfileResponse> {
    const { profilePictureID, ...rest } = profile;
    let profilePictureURL: string | undefined;

    if (profilePictureID) {
        profilePictureURL = await getProfileImageUrl(profilePictureID);
    }

    return {
        ...rest,
        profilePictureURL
    };
}
