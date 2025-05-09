import Chat from "@/features/ai-chat/components/chat.client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chat Friend",
  description: "Chat with your friend",
};

const App = () => {
  return (
    <main className="flex flex-col h-screen">
      <Chat />
    </main>
  );
};

export default App;
