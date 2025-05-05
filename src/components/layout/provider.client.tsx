"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider.client";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
