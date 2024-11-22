import { AuthService } from "./services/authService";

const NEXT_API_URL = "http://localhost:3000";

export const api = {
    authService: new AuthService({ baseURL: NEXT_API_URL })
};
