import { Router } from "express";
import rateLimit from "express-rate-limit";
import { UserController } from "../controller/user.controller";

export const publicRouter = Router();

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 menit
    limit: 5, // Hanya 5 kali percobaan
    message:
        "Terlalu banyak percobaan login, silakan coba lagi setelah 10 menit.",
    standardHeaders: "draft-7",
    legacyHeaders: false
});

publicRouter.post("/login", authLimiter, UserController.login);
publicRouter.post("/register", authLimiter, UserController.register);
// Refresh token
publicRouter.post("/refresh-token", UserController.refreshToken);
