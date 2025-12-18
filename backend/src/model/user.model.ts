import { User } from "../database/entity/User";

export type UserResponse = {
    id: string;
    name: string;
    username: string;
    email: string;
};

export type CreateUserRequest = {
    username: string;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type CreateUserResponse = {
    username: string;
    name: string;
    email: string;
};

export type LoginUserRequest = {
    email: string;
    password: string;
};

export type LoginUserResponse = {
    username: string;
    name: string;
    email: string;
    access_token: string;
};

export function toCreateUserResponse(
    data: CreateUserRequest
): CreateUserResponse {
    return {
        username: data.username,
        name: data.name,
        email: data.email
    };
}

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.user_id,
        email: user.email,
        name: user.name,
        username: user.username
    };
}

export function toLoginUserResponseWithToken(
    user: User,
    accessToken: string
): LoginUserResponse {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        access_token: accessToken
    };
}
