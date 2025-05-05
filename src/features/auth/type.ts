import * as z from "zod";
import { LoginSchema, RegisterSchema } from "./schema/auth.schema";

export type LoginT = z.infer<typeof LoginSchema>;

export type RegisterT = z.infer<typeof RegisterSchema>;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}
