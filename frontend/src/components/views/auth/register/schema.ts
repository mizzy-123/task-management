import z from "zod";

export const registerSchema = z
  .object({
    fullname: z.string().min(1),
    username: z.string().min(1).max(100),
    email: z.string().min(1).email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must contain at least one uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Must contain at least one number",
      }),
    password_confirmation: z
      .string()
      .min(1, "This field is required")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must contain at least one uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Must contain at least one number",
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
