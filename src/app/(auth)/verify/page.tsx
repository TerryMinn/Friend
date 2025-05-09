import { db } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

type VerifyEmailProps = {
  searchParams: Promise<{
    token: string;
  }>;
};

const VerifyEmail = async ({ searchParams }: VerifyEmailProps) => {
  const { token } = await searchParams;
  if (!token) {
    redirect("/login?message=Invalid token&verify=false");
  }

  const verifyEmail = await db.emailVerify.findUnique({
    where: {
      token,
    },
  });

  if (!verifyEmail) {
    redirect(`/login?message=Invalid token&verify=false`);
  }

  if (verifyEmail.expiresAt < new Date()) {
    redirect(`/login?message=Token expired&verify=false`);
  }

  await db.emailVerify.update({
    where: {
      id: verifyEmail.id,
    },
    data: {
      isVerify: true,
    },
  });

  redirect("/login?message=Email Verify Successfully!&verify=true");
};

export default VerifyEmail;
