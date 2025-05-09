"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider.client";
import { Toaster } from "sonner";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster closeButton />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Provider;
