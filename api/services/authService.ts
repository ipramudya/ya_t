import {
    LoginPayloadRequest,
    LoginServerResponse,
    RegisterPayloadRequest,
    RegisterServerResponse
} from "@/types/auth";
import { BaseApi } from "../baseApi";

export class AuthService extends BaseApi {
    async register(p: RegisterPayloadRequest): Promise<RegisterServerResponse> {
        return this.fetcher<RegisterServerResponse>("/api/v2/register", {
            method: "POST",
            body: JSON.stringify(p)
        });
    }

    async login(p: LoginPayloadRequest): Promise<LoginServerResponse> {
        return this.fetcher<LoginServerResponse>("/api/v2/login", {
            method: "POST",
            body: JSON.stringify(p)
        });
    }
}
