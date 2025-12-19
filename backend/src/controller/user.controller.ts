import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user.model";
import { UserService } from "../service/user.service";
import { ResponseError } from "../error/response.error";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;

            const response = await UserService.register(request);

            res.status(201).json({
                code: 201,
                message: "Register successfull",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request, res);

            res.status(200).json({
                code: 200,
                message: "Login successfull",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenFromCookie = req.cookies.refreshToken;

            if (!tokenFromCookie) {
                throw new ResponseError(
                    401,
                    "Unauthorized: Refresh token not found"
                );
            }

            const refreshResult = await UserService.refreshToken(
                tokenFromCookie
            );

            const { access_token, refresh_token, email, id, name } =
                refreshResult;

            res.cookie("refreshToken", refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari (sesuaikan dgn login)
                path: "/api"
            });

            res.status(200).json({
                code: 200,
                message: "Token refreshed successfully",
                data: {
                    id: id,
                    email: email,
                    name: name,
                    accessToken: access_token
                }
            });
        } catch (error) {
            next(error);
        }
    }
}
