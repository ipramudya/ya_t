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
