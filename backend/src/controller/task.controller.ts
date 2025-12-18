import { NextFunction, Response } from "express";
import { AuthRequest } from "../request/auth.request";
import {
    CreateTaskRequest,
    ReadTaskRequest,
    UpdateTaskRequest
} from "../model/task.model";
import { TaskService } from "../service/task.service";

export class TaskController {
    static async read(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const request: ReadTaskRequest = {
                status: req.query.status as ReadTaskRequest["status"],
                sortOrder: req.query.sortOrder as ReadTaskRequest["sortOrder"]
            };

            const response = await TaskService.read(request, req.user);

            res.status(200).json({
                code: 200,
                message: "Tasks retrieved successfully",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateTaskRequest = req.body as CreateTaskRequest;

            const response = await TaskService.create(request, req.user);

            res.status(201).json({
                code: 201,
                message: "Task has been created",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;
            const request: UpdateTaskRequest = req.body as UpdateTaskRequest;

            const response = await TaskService.update(
                taskId,
                request,
                req.user
            );

            res.status(200).json({
                code: 200,
                message: "Task has been updated",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;

            await TaskService.delete(taskId, req.user);

            res.status(200).json({
                code: 200,
                message: "Task has been deleted"
            });
        } catch (error) {
            next(error);
        }
    }
}
