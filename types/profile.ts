export interface ProfileFormInputs {
    displayName: string;
    gender: "male" | "female";
    birthday: string;
    horoscope: string;
    zodiac: string;
    height: string;
    weight: string;
    profileImage?: File;
}

export interface ProfileDatabaseRequest {
    displayName: string;
    gender: "male" | "female";
    birthday: string; // ISO string
    height: number;
    weight: number;
    interest?: string[];
    userID: string;
    profilePictureID?: string;
}

export interface ProfileDatabaseResponse extends ProfileDatabaseRequest {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
}

export interface EnhancedProfileResponse
    extends Omit<ProfileDatabaseResponse, "profilePictureID"> {
    profilePictureURL?: string;
}

export interface ProfileResponse {
    profile: ProfileDatabaseResponse;
    message: string;
}
