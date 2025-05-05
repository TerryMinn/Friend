import Background from "@/components/shared/background";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Friend",
    template: "%s | Friend",
  },
};

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main>
      <Background />
      {children}
    </main>
  );
};

export default AuthLayout;
