import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Name must be at least 4 characters long",
    })
    .max(200, {
      message: "Name must be at most 200 characters long",
    }),
  email: z.string().email({
    message: "Email is not valid",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(20, {
      message: "Password must be at most 20 characters long",
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(20, {
      message: "Password must be at most 20 characters long",
    }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
