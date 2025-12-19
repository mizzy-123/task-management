import { Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../database/entity/User";
import { ResponseError } from "../error/response.error";
import {
    CreateUserRequest,
    CreateUserResponse,
    LoginUserRequest,
    LoginUserResponse,
    toCreateUserResponse,
    toLoginUserResponseWithToken,
    toUserResponse,
    toUserResponseWithToken,
    UserResponseWithToken
} from "../model/user.model";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../util/jwt";
import { UserValidation } from "../validation/user.validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

export class UserService {
    static async register(
        request: CreateUserRequest
    ): Promise<CreateUserResponse> {
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        );

        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        );

        const userRepository = AppDataSource.getRepository(User);

        await userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: registerRequest.username,
                name: registerRequest.name,
                email: registerRequest.email,
                password: registerRequest.password
            })
            .execute();

        return toCreateUserResponse(registerRequest);
    }

    static async login(
        request: LoginUserRequest,
        res: Response
    ): Promise<LoginUserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const userRespository = AppDataSource.getRepository(User);

        const user = await userRespository.findOne({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(400, "Username or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new ResponseError(400, "Username or password is wrong");
        }

        const loginResponse = toUserResponse(user);

        const accessToken = generateAccessToken(loginResponse);
        const refreshToken = generateRefreshToken(loginResponse);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api"
        });

        return toLoginUserResponseWithToken(user, accessToken);
    }

    static async refreshToken(
        tokenFromCookie: string
    ): Promise<UserResponseWithToken> {
        if (!tokenFromCookie) {
            throw new ResponseError(
                401,
                "Unauthorized: Refresh token not provided"
            );
        }

        let payload: string | JwtPayload;

        try {
            payload = verifyRefreshToken(tokenFromCookie);
            if (!payload || typeof payload !== "object" || !payload.id) {
                throw new Error("Invalid token payload");
            }
        } catch {
            throw new ResponseError(
                401,
                "Unauthorized: Invalid or expired refresh token"
            );
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { user_id: payload.id }
        });

        if (!user) {
            throw new ResponseError(401, "Unauthorized: User not found");
        }

        const loginResponse = toUserResponse(user);
        const newAccessToken = generateAccessToken(loginResponse);
        const newRefreshToken = generateRefreshToken(loginResponse);

        return toUserResponseWithToken(user, newAccessToken, newRefreshToken);
    }
}
