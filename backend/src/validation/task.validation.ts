import z, { ZodType } from "zod";
import {
    CreateTaskRequest,
    ReadTaskRequest,
    UpdateTaskRequest
} from "../model/task.model";
import { TaskStatus } from "../database/entity/Task";

export class TaskValidation {
    static readonly CREATE: ZodType<CreateTaskRequest> = z.object({
        title: z.string().min(1).max(255),
        description: z.string().min(1),
        status: z.nativeEnum(TaskStatus).optional(),
        deadline: z.coerce.date().nullable().optional()
    });

    static readonly UPDATE: ZodType<UpdateTaskRequest> = z
        .object({
            title: z.string().min(1).max(255).optional(),
            description: z.string().min(1).optional(),
            status: z.nativeEnum(TaskStatus).optional(),
            deadline: z.coerce.date().nullable().optional()
        })
        .refine(
            (data) =>
                data.title !== undefined ||
                data.description !== undefined ||
                data.status !== undefined ||
                data.deadline !== undefined,
            {
                message: "At least one field must be provided for update"
            }
        );

    static readonly READ: ZodType<ReadTaskRequest> = z.object({
        status: z.nativeEnum(TaskStatus).optional(),
        sortBy: z.enum(["deadline", "created_at"]).optional(),
        sortOrder: z.enum(["ASC", "DESC"]).optional(),
        page: z.coerce.number().int().min(1).optional(),
        limit: z.coerce.number().int().min(1).max(100).optional()
    });
}
