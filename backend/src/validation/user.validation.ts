import z, { ZodType } from "zod";
import { CreateUserRequest, LoginUserRequest } from "../model/user.model";

export class UserValidation {
    static readonly REGISTER: ZodType<CreateUserRequest> = z
        .object({
            username: z.string().min(1).max(100),
            name: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(1).max(100),
            password_confirmation: z.string().min(1).max(100)
        })
        .refine((data) => data.password === data.password_confirmation, {
            message: "Password and confirm password must match",
            path: ["password_confirmation"]
        })
        .refine((data) => data.password.length >= 8, {
            message: "Password must be at least 8 characters long",
            path: ["password"]
        });

    static readonly LOGIN: ZodType<LoginUserRequest> = z.object({
        email: z.string().email(),
        password: z.string().min(1)
    });
}
