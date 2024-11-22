interface ServerResponse {
    message: string;
}

export type RegisterServerResponse = ServerResponse;

export type RegisterPayloadRequest = {
    email: string;
    username: string;
    password: string;
};

export interface RegisterFormInputs {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
