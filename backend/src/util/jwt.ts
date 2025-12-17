import "dotenv/config";
import jsonWebToken from "jsonwebtoken";
import { UserResponse } from "../model/user.model";

export const generateAccessToken = (user: UserResponse): string => {
    return jsonWebToken.sign(user, process.env.JWT_SECRET ?? "defaultSecret", {
        expiresIn: "3h" // Gunakan default 1800s jika tidak diatur
    });
};

export const generateRefreshToken = (user: UserResponse): string => {
    const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 hari (sesuaikan dgn umur token)
    return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SECRET!), {
        expiresIn: expiresIn
    });
};

export const verifyRefreshToken = (
    token: string
): string | jsonWebToken.JwtPayload => {
    return jsonWebToken.verify(token, String(process.env.JWT_REFRESH_SECRET!));
};

export const parseJWT = (token: string) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const verifyAcessToken = (
    token: string
): string | jsonWebToken.JwtPayload | null => {
    try {
        return jsonWebToken.verify(token, String(process.env.JWT_SECRET));
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
};
