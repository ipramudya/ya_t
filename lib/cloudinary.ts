"use server";

import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME
} from "@/constant";
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export type CloudinaryUploadResult = {
    secure_url: string;
    public_id: string;
    format: string;
    width: number;
    height: number;
};

const validateInputs = (file: File, userId: string) => {
    if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image");
    }

    if (!userId) {
        throw new Error("UserId is required");
    }
};

const getCloudinaryOptions = (
    userId: string
): UploadApiOptions & { public_id: string } => ({
    folder: "youapp",
    resource_type: "auto",
    public_id: `user_${userId}`,
    overwrite: true
});

const checkExistingImage = async (filename: string) => {
    try {
        await cloudinary.api.resource(`youapp/${filename}`);
        await cloudinary.uploader.destroy(`youapp/${filename}`);
    } catch (err) {
        const error = err as {
            error?: {
                http_code?: number;
                message?: string;
            };
        };
        // Only throw if error is not "resource not found"
        if (error?.error?.http_code !== 404) {
            throw err;
        }
    }
};

const uploadToCloudinary = (
    buffer: Buffer,
    options: UploadApiOptions
): Promise<CloudinaryUploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (error) reject(error);
                resolve(result as CloudinaryUploadResult);
            }
        );

        uploadStream.end(buffer);
    });
};

export async function storeImage(
    userId: string,
    file: File
): Promise<CloudinaryUploadResult> {
    try {
        // Validate inputs
        validateInputs(file, userId);

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Get upload options
        const options = getCloudinaryOptions(userId);

        // Check and remove existing image if any
        await checkExistingImage(options.public_id);

        // Upload new image
        return await uploadToCloudinary(buffer, options);
    } catch (error) {
        console.error("Error in storeImage:", error);
        throw new Error(`Failed to store image: ${(error as Error).message}`);
    }
}
