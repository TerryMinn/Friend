import LoginForm from "@/features/auth/components/login.client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

type LoginProps = {
  searchParams: {
    verify?: boolean;
  };
};

const Login = ({ searchParams: { verify } }: LoginProps) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <LoginForm verify={verify} />
    </section>
  );
};

export default Login;
