import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef } from "react";
import { ConversationType } from "../type";

type ConversationHistoryProps = {
  conversations: ConversationType[];
};

const ConversationHistory = ({ conversations }: ConversationHistoryProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversations]);

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Your conversation will appear here</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-2 sm:pr-4 flex items-end">
      <div className="space-y-2 sm:space-y-4 pt-0 md:pt-20 bg-gray-50 dark:bg-[#18181b] transition-colors duration-300">
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
                  ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              <p>{conversation.message}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </ScrollArea>
  );
};

export default ConversationHistory;
