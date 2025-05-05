import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import TypingIndicator from "./typing-indicator";

type ConversationHistoryProps = {
  conversations: ConversationType[];
  isSpeaking: boolean;
};

const ConversationHistory = ({
  conversations,
  isSpeaking,
}: ConversationHistoryProps) => {
  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Your conversation will appear here</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-2 sm:pr-4 flex items-end">
      <div className="space-y-2 sm:space-y-4 pt-20 ">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className={`flex ${
              conversation.source === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                conversation.source === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{conversation.message}</p>
            </div>
          </div>
        ))}
      </div>
      {isSpeaking && <TypingIndicator />}
    </ScrollArea>
  );
};

export default ConversationHistory;
