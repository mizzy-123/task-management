import { Router } from "express";
import { publicRouter } from "./public.route";

export const appRouter = Router();

appRouter.use("/api", publicRouter);
