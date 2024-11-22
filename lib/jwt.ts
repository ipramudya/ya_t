import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret-key";
const JWT_EXPIRES_IN = "24h";

interface JWTPayload {
    userId: string;
    email: string;
}

export class JWTService {
    static generateAccessToken(payload: JWTPayload): string {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });
    }

    static verifyToken(token: string): JWTPayload | null {
        try {
            return jwt.verify(token, JWT_SECRET) as JWTPayload;
        } catch (error) {
            console.error("error verifying token", error);
            return null;
        }
    }

    static decodeToken(token: string): JWTPayload | null {
        try {
            return jwt.decode(token) as JWTPayload;
        } catch (error) {
            console.error("error decoding token", error);
            return null;
        }
    }
}
