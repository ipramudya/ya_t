import { AuthService } from "./services/authService";
import { ProfileService } from "./services/profileService";

const NEXT_API_URL = "http://localhost:3000";

export const api = {
    authService: new AuthService({ baseURL: NEXT_API_URL }),
    profileService: new ProfileService({ baseURL: NEXT_API_URL, useAuth: true })
};
