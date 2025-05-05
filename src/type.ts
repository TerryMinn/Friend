import { boolean } from "zod";

export type ActionState = {
  message?: string;
  con?: boolean;
};

export type ActionReturnType<T = unknown> = {
  con: boolean;
  message: string;
  data?: T;
};
