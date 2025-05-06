import { db } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

type VerifyEmailProps = {
  searchParams: {
    token: string;
  };
};

const VerifyEmail = async ({ searchParams: { token } }: VerifyEmailProps) => {
  if (!token) {
    redirect("/login");
  }

  const verifyEmail = await db.emailVerify.findUnique({
    where: {
      token,
    },
  });

  if (!verifyEmail) {
    throw new Error("Invalid token");
  }

  if (verifyEmail.expiresAt < new Date()) {
    throw new Error("Token expired");
  }

  await db.emailVerify.update({
    where: {
      id: verifyEmail.id,
    },
    data: {
      isVerify: true,
    },
  });

  redirect("/login?verify=true");
};

export default VerifyEmail;
