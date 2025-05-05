import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

type Props = {};

const ConversationHistory = (props: Props) => {
  if ([].length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Your conversation will appear here</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-2 sm:pr-4">
      <div className="space-y-2 sm:space-y-4">
        {/* {[].map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))} */}
      </div>
    </ScrollArea>
  );
};

export default ConversationHistory;
