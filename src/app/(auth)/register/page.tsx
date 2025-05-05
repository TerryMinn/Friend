import RegisterForm from "@/features/auth/components/register.cleint";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to your account",
};

const Register = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <RegisterForm />
    </section>
  );
};

export default Register;
