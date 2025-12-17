import { Router } from "express";
import rateLimit from "express-rate-limit";

export const publicRouter = Router();

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 menit
    limit: 5, // Hanya 5 kali percobaan
    message:
        "Terlalu banyak percobaan login, silakan coba lagi setelah 10 menit.",
    standardHeaders: "draft-7",
    legacyHeaders: false
});

publicRouter.post("/login", authLimiter);
publicRouter.post("/register", authLimiter);
