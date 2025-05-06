"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider.client";
import { Toaster } from "sonner";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster closeButton />
    </SessionProvider>
  );
};

export default Provider;
