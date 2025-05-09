import * as z from "zod";

export const LoginSchema = z.object({
  password: z
    .string()
    .min(8)
    .max(32)
    .regex(
      /^[A-Za-z\d@$!%*?&]+$/,
      "Password must contain only letters, numbers and special characters"
    ),
  email: z.string().email("Invalid email"),
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(3).max(32),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});
