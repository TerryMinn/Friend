"use server";

import { db } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "./user.action";
import { ActionReturnType } from "@/type";
import { revalidatePath } from "next/cache";

const AuthVerify = async () => {
  const session = await getServerSession();

  if (!session) {
    throw new Error("unauthorized");
  }

  const authUser = await getUserByEmail(session.user.email!);

  if (!authUser) {
    throw new Error("unauthorized");
  }

  return authUser;
};

export const storeConversation = async (payload: ConversationType) => {
  try {
    const authUser = await AuthVerify();

    const conversation_finder = await db.conversation.findFirst({
      where: { userId: authUser.id },
    });

    if (!conversation_finder) {
      await db.$transaction(async (tx) => {
        const conversation = await tx.conversation.create({
          data: {
            userId: authUser.id,
          },
        });

        const message = await tx.message.create({
          data: {
            conversationId: conversation.id,
            source: payload.source,
            message: payload.message,
          },
        });

        return { conversation, message };
      });
    } else {
      await db.message.create({
        data: {
          message: payload.message,
          source: payload.source,
          conversationId: conversation_finder?.id,
        },
      });
    }

    revalidatePath("/");
    return {
      con: true,
      message: "success to save",
    };
  } catch (e) {
    console.error("Error storing conversation:", e);
    return {
      con: false,
      message: e instanceof Error ? e.message : "Someting went wrong!",
    };
  }
};

export const getConversation = async (
  take: number = 20
): Promise<ActionReturnType<ConversationType[]>> => {
  try {
    const authUser = await AuthVerify();

    const conversation_finder = await db.conversation.findFirst({
      where: { userId: authUser.id },
    });

    if (!conversation_finder) {
      return { con: true, data: [], message: "success" };
    }

    const result = await db.message.findMany({
      where: { conversationId: conversation_finder.id },
      include: {
        conversation: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: take,
    });

    return {
      con: true,
      data: result,
      message: "success",
    };
  } catch (e) {
    console.error("Error storing conversation:", e);
    return {
      con: false,
      message: e instanceof Error ? e.message : "Someting went wrong!",
    };
  }
};
