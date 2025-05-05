"use server";

import { RegisterSchema } from "@/features/auth/schema/auth.schema";
import { db } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/utils";
import { ActionState } from "@/type";
import { RegisterT } from "@/features/auth/type";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const RegisterUser = async (state: ActionState, payload: RegisterT) => {
  try {
    const validation = RegisterSchema.safeParse(payload);

    if (!validation.success) {
      throw new Error(
        JSON.parse(validation.error?.message ?? "{}")[0]?.message
      );
    }

    const { password, email, name } = validation.data;

    const user = await getUserByEmail(validation.data.email);
    if (user) {
      throw new Error("User already exists");
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
      },
    });

    return {
      con: true,
      message: "User created successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      con: false,
      message: e instanceof Error ? e.message : "Something went wrong",
    };
  }
};
