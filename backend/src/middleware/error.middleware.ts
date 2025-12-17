import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response.error";

export const errorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ZodError) {
        const errorMessges = error.issues.map((err) => ({
            field: String(err.path[0] ?? "unknown"),
            message: err.message
        }));
        res.status(400).json({
            code: 400,
            message: `${String(error.issues[0].path[0] ?? "field")} ${
                error.issues[0].message
            }`,
            error: errorMessges
        });
        return;
    } else if (error instanceof ResponseError) {
        res.status(error.status).json({
            code: error.status,
            message: error.message
        });
        return;
    } else {
        res.status(500).json({
            code: 500,
            message: error.message
        });
        return;
    }

    next();
};
