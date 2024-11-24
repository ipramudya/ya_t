import { DOMAIN_URL } from "@/constant";
import { AuthService } from "./services/authService";
import { ProfileService } from "./services/profileService";

export const api = {
    authService: new AuthService({ baseURL: DOMAIN_URL }),
    profileService: new ProfileService({ baseURL: DOMAIN_URL, useAuth: true })
};
