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
        const headers: HeadersInit = {};

        // Check if the body is FormData
        if (!(options?.body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(`${this.config.baseURL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options?.headers
            },
            credentials: this.config.useAuth ? "include" : "same-origin"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "API request failed");
        }

        return data;
    }
}
