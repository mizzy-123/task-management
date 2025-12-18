import z from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  status: z.string().min(1),
  deadline: z.coerce.date(),
});

export type AddTaskSchema = z.infer<typeof addTaskSchema>;
