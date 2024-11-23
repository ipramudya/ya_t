interface ServerResponse {
    message: string;
}

export type RegisterServerResponse = ServerResponse;

export type RegisterPayloadRequest = {
    email: string;
    username: string;
    password: string;
};

export type LoginPayloadRequest = {
    emailOrUsername: string;
    password: string;
};

export type LoginServerResponse = ServerResponse;

export interface RegisterFormInputs {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface LoginFormInputs {
    emailOrUsername: string;
    password: string;
}
