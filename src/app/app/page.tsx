import { getConversation } from "@/actions/conversation.action";
import Chat from "@/features/ai-chat/components/chat.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chat Friend",
  description: "Chat with your friend",
};

const App = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["conversation"],
    queryFn: async () => {
      const res = await getConversation();
      return res;
    },
  });

  return (
    <main className="flex flex-col h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Chat />
      </HydrationBoundary>
    </main>
  );
};

export default App;
