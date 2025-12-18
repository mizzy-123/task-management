import { AppDataSource } from "../data-source";
import { Task } from "../database/entity/Task";
import { User } from "../database/entity/User";
import { ResponseError } from "../error/response.error";
import {
    CreateTaskRequest,
    CreateTaskResponse,
    ReadTaskRequest,
    toCreateTaskResponse,
    toReadTaskResponse,
    UpdateTaskRequest
} from "../model/task.model";
import { UserResponse } from "../model/user.model";
import { TaskValidation } from "../validation/task.validation";
import { Validation } from "../validation/validation";

export class TaskService {
    static async read(
        request: ReadTaskRequest,
        user: UserResponse | undefined | null
    ) {
        if (!user) throw new ResponseError(403, "User not found");

        const taskRepository = AppDataSource.getRepository(Task);
        const userRepository = AppDataSource.getRepository(User);

        const queryBuilder = taskRepository
            .createQueryBuilder("task")
            .orderBy(`task.created_at`, "DESC")
            .where("task.user_id = :userId", { userId: user.id });

        if (request.status) {
            queryBuilder.andWhere("task.status = :status", {
                status: request.status
            });
        }

        const sortOrder = request.sortOrder || "DESC";
        queryBuilder.orderBy(`task.deadline`, sortOrder);

        const [taskFallback, userFallback] = await Promise.all([
            queryBuilder.getMany(),
            userRepository.findOneBy({
                user_id: user.id
            })
        ]);

        const editTaskFallback = taskFallback.map((v) => {
            return {
                ...v,
                created_by: userFallback?.name || ""
            };
        });

        return toReadTaskResponse(editTaskFallback);
    }

    static async create(
        request: CreateTaskRequest,
        user: UserResponse | undefined | null
    ): Promise<CreateTaskResponse> {
        const taskRequest = Validation.validate(TaskValidation.CREATE, request);

        if (!user) {
            throw new ResponseError(403, "User not found");
        }

        const taskRepository = AppDataSource.getRepository(Task);
        const userRepository = AppDataSource.getRepository(User);

        const task = taskRepository.create({
            user_id: user.id,
            title: taskRequest.title,
            description: taskRequest.description,
            deadline: taskRequest.deadline,
            status: taskRequest.status,
            created_by: user.id
        });

        const [taskSaveFallback, userFallback] = await Promise.all([
            taskRepository.save(task),
            userRepository.findOneBy({
                user_id: user.id
            })
        ]);

        return toCreateTaskResponse(taskSaveFallback, userFallback);
    }

    static async update(
        taskId: string,
        request: UpdateTaskRequest,
        user: UserResponse | undefined | null
    ): Promise<CreateTaskResponse> {
        const taskRequest = Validation.validate(TaskValidation.UPDATE, request);

        const taskRepository = AppDataSource.getRepository(Task);
        const userRepository = AppDataSource.getRepository(User);

        if (!user) {
            throw new ResponseError(403, "User not found");
        }

        const task = await taskRepository.findOne({
            where: { task_id: taskId, user_id: user.id }
        });

        if (!task) {
            throw new ResponseError(404, "Task not found");
        }

        if (taskRequest.title !== undefined) task.title = taskRequest.title;
        if (taskRequest.description !== undefined)
            task.description = taskRequest.description;
        if (taskRequest.status !== undefined) task.status = taskRequest.status;
        if (taskRequest.deadline !== undefined)
            task.deadline = taskRequest.deadline;

        const [updatedTask, userFallback] = await Promise.all([
            taskRepository.save(task),
            userRepository.findOneBy({ user_id: user.id })
        ]);

        return toCreateTaskResponse(updatedTask, userFallback);
    }

    static async delete(
        taskId: string,
        user: UserResponse | undefined | null
    ): Promise<void> {
        if (!user) {
            throw new ResponseError(403, "User not found");
        }

        const taskRepository = AppDataSource.getRepository(Task);

        const task = await taskRepository.findOne({
            where: { task_id: taskId, user_id: user.id }
        });

        if (!task) {
            throw new ResponseError(404, "Task not found");
        }

        await taskRepository.remove(task);
    }
}
