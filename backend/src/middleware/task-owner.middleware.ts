import { NextFunction, Response } from "express";
import { AuthRequest } from "../request/auth.request";
import { AppDataSource } from "../data-source";
import { Task } from "../database/entity/Task";
import { ResponseError } from "../error/response.error";

export const taskOwnerMiddleware = async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id || "";
        const taskId = req.params?.id || "";

        if (!taskId) {
            throw new ResponseError(400, "Task id not identified");
        }

        const taskRepository = AppDataSource.getRepository(Task);

        const task = await taskRepository.findOneBy({
            task_id: taskId
        });

        if (!task) {
            throw new ResponseError(404, "Task not found");
        }

        if (task.user_id !== userId) {
            throw new ResponseError(
                403,
                "You do not have permission to modify this task"
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};
