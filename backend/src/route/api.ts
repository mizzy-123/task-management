import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middlewate";
import { taskOwnerMiddleware } from "../middleware/task-owner.middleware";
import { TaskController } from "../controller/task.controller";

export const apiRouter = Router();

apiRouter.get("/task", authMiddleware, TaskController.read);
apiRouter.post("/task", authMiddleware, TaskController.create);
apiRouter.put(
    "/task/:id",
    [authMiddleware, taskOwnerMiddleware],
    TaskController.update
);
apiRouter.delete(
    "/task/:id",
    [authMiddleware, taskOwnerMiddleware],
    TaskController.delete
);
