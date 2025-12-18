import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFoundMiddleware } from "../middleware/notfound.middleware";
import { errorMiddleware } from "../middleware/error.middleware";
import { appRouter } from "../route";

export const web = express();

web.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS?.split(","),
        credentials: true,
        preflightContinue: false,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);

web.options("/{*any}", cors());
web.use(express.json());
web.use(cookieParser());
web.use(express.urlencoded({ extended: true }));
web.use(appRouter);
web.use(notFoundMiddleware);
web.use(errorMiddleware);
