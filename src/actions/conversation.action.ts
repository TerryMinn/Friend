"use server";

import { db } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "./user.action";
import { revalidatePath } from "next/cache";
import { ConversationType } from "@/features/ai-chat/type";

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

    const conversation = await db.conversation.findFirst({
      where: { userId: authUser.id },
    });

    const newMessage = {
      message: payload.message,
      source: payload.source,
      createdAt: new Date().toISOString(),
    };

    if (!conversation) {
      await db.conversation.create({
        data: {
          userId: authUser.id,
          messages: [newMessage],
        },
      });
    } else {
      const existingMessages = (conversation.messages ??
        []) as ConversationType[];

      await db.conversation.update({
        where: { id: conversation.id },
        data: {
          messages: [...existingMessages, newMessage],
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
      message: e instanceof Error ? e.message : "Something went wrong!",
    };
  }
};

export const getConversation = async (): Promise<{
  con: boolean;
  data?: ConversationType[];
  message: string;
}> => {
  try {
    const authUser = await AuthVerify();

    const conversation = await db.conversation.findFirst({
      where: { userId: authUser.id },
    });

    if (!conversation) {
      return { con: true, data: [], message: "success" };
    }

    const messages = (conversation.messages ?? []) as ConversationType[];

    return {
      con: true,
      data: messages,
      message: "success",
    };
  } catch (e) {
    console.error("Error getting conversation:", e);
    return {
      con: false,
      message: e instanceof Error ? e.message : "Something went wrong!",
    };
  }
};
