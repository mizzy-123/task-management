import { Response } from "express";

export const notFoundMiddleware = (res: Response) => {
    res.status(404).json({
        code: 404,
        message: "Not found"
    });
};
