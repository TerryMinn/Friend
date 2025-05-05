import * as z from "zod";

export const LoginSchema = z.object({
  password: z
    .string()
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
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
