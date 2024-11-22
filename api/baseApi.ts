import { tokenManager } from "@/lib/tokenManager";

export type ApiConfig = {
    accessToken?: string;
    baseURL: string;
    useAuth?: boolean;
};

export class BaseApi {
    protected config: ApiConfig;

    constructor(config: ApiConfig) {
        this.config = config;
    }

    protected async fetcher<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const headers: HeadersInit = {
            "Content-Type": "application/json"
        };

        if (this.config.useAuth) {
            const token = (await tokenManager()).getToken();
            if (token) {
                headers["x-access-token"] = token;
            }
        }

        const response = await fetch(`${this.config.baseURL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "API request failed");
        }

        return data;
    }
}
