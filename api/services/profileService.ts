import { ProfileResponse } from "@/types/profile";
import { ApiConfig, BaseApi } from "../baseApi";

export class ProfileService extends BaseApi {
    constructor(config: ApiConfig) {
        super({ ...config, useAuth: true });
    }

    async upsertProfile(formData: FormData): Promise<ProfileResponse> {
        return this.fetcher<ProfileResponse>("/api/v2/profile", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });
    }
}
