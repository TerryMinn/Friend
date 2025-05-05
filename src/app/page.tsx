import AvatarEnviroment from "@/features/ai-chat/components/avatar-enviroment";
import ChatInterface from "@/features/ai-chat/components/chat-interface";
import ConversationHistory from "@/features/ai-chat/components/conversation-history";
import React from "react";

const Page = () => {
  return (
    <main className="flex flex-col h-screen">
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="w-full lg:w-2/3 h-2/5 sm:h-1/2 lg:h-full">
          <AvatarEnviroment />
        </div>

        <div className="w-full lg:w-1/3 h-3/5 sm:h-1/2 lg:h-full flex flex-col bg-gray-50">
          <div className="flex-1 overflow-y-auto p-2 sm:p-4">
            <ConversationHistory />
          </div>

          <div className="p-2 sm:p-4 bg-white border-t">
            <ChatInterface />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Page;
