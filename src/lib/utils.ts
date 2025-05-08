import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export async function sendVerifyEmail(email: string, token: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const confirmEmailUrl = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  if (!resendApiKey) {
    throw new Error("Missing Resend API key");
  }

  const resend = new Resend(resendApiKey);

  await resend.emails.send({
    from: process.env.SEND_MAIL,
    to: email,
    subject: "Confirm your email",
    html: `
        <p>Click <a href="${confirmEmailUrl}">here</a> to confirm your email</p>
      `,
  });
}
