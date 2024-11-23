export interface UserDatabaseRequest {
    email: string;
    username: string;
    password: string;
}

export interface UserDatabaseResponse {
    email: string;
    username: string;
    password: string;
    $id: string;
    $permissions: [];
    $createdAt: string;
    $updatedAt: string;
    $databaseId: string;
    $collectionId: string;
}

export interface UserData {
    id: string;
    username: string;
    email: string;
    displayName: string;
    gender: "male" | "female";
    birthday: Date;
    height: number;
    weight: number;
    profileId: string;
    profileURL: string | null;
    interests: string[];
}
