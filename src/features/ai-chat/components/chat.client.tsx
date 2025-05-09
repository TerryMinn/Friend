"use client";

import React from "react";
import AvatarEnviroment from "./avatar-enviroment.client";
import ConversationHistory from "./conversation-history.client";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import useAiChat from "../hook/useAiChat";
import LoaderFor3D from "./LoaderFor3D";

const Chat = () => {
  const {
    handleStartConversation,
    status,
    handleEndConversation,
    isSpeaking,
    optConversations,
  } = useAiChat();

  return (
    <section className="flex flex-col lg:flex-row flex-1 overflow-hidden">
      <div className="w-full lg:w-2/3 h-2/5 sm:h-1/2 lg:h-full">
        <LoaderFor3D />
        <AvatarEnviroment isSpeaking={isSpeaking} />
      </div>

      <div className="w-full lg:w-1/3 h-3/5 sm:h-1/2 lg:h-full flex flex-col bg-gray-50 dark:bg-[#18181b]">
        <div className="flex-1 overflow-y-auto p-2 sm:p-4">
          <ConversationHistory conversations={optConversations} />
        </div>

        <div className="p-2 sm:p-4 bg-white dark:bg-[#232329] border-t border-gray-200 dark:border-gray-700 flex justify-center items-center">
          {status === "connected" ? (
            <div className="flex justify-center items-center flex-col">
              <Button
                variant="destructive"
                className="rounded-full h-16 w-16 "
                onClick={handleEndConversation}
              >
                <MicOff className="h-4 w-4" />
              </Button>
              <p className="text-sm ">Tap to stop speaking</p>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <Button
                className="rounded-full h-16 w-16 "
                onClick={handleStartConversation}
              >
                <Mic className=" h-4 w-4" />
              </Button>
              <p className="text-sm">Tap to start speaking</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chat;
