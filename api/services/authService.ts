import { RegisterPayloadRequest, RegisterServerResponse } from "@/types/auth";
import { BaseApi } from "../baseApi";

export class AuthService extends BaseApi {
    async register(p: RegisterPayloadRequest): Promise<RegisterServerResponse> {
        return this.fetcher<RegisterServerResponse>("/api/register", {
            method: "POST",
            body: JSON.stringify(p)
        });
    }
}
