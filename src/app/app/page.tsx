import { getConversation } from "@/actions/conversation.action";
import Chat from "@/features/ai-chat/components/chat.client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chat Friend",
  description: "Chat with your friend",
};

const App = async () => {
  const res = await getConversation();

  return (
    <main className="flex flex-col h-screen">
      <Chat conversations={res.data!} />
    </main>
  );
};

export default App;
