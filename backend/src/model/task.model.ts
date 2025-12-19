import { Task, TaskStatus } from "../database/entity/Task";
import { User } from "../database/entity/User";

export type CreateTaskRequest = {
    title: string;
    description: string;
    status?: TaskStatus;
    deadline?: Date | null;
};

export type UpdateTaskRequest = {
    title?: string;
    description?: string;
    status?: TaskStatus;
    deadline?: Date | null;
};

export type ReadTaskRequest = {
    status?: TaskStatus;
    sortBy?: "deadline" | "created_at";
    sortOrder?: "ASC" | "DESC";
};

export type CreateTaskResponse = {
    task_id: string;
    title: string;
    description: string;
    status: TaskStatus;
    deadline: Date | null;
    created_by: string;
    created_at: Date;
};

export type ReadTaskResponse = {
    task_id: string;
    user_id: string;
    title: string;
    description: string;
    status: TaskStatus;
    deadline: Date | null;
    created_by: string;
    created_at: Date;
};

export function toCreateTaskResponse(
    data: Task,
    dataUser: User | null
): CreateTaskResponse {
    return {
        task_id: data.task_id,
        title: data.title,
        description: data.description,
        status: data.status,
        deadline: data.deadline,
        created_by: dataUser?.name || "unknown",
        created_at: data.created_at
    };
}

export function toReadTaskResponse(data: Task[]): ReadTaskResponse[] {
    return data.map((v): ReadTaskResponse => {
        return {
            task_id: v.task_id,
            user_id: v.user_id,
            title: v.title,
            description: v.description,
            deadline: v.deadline,
            status: v.status,
            created_by: v.created_by,
            created_at: v.created_at
        };
    });
}
