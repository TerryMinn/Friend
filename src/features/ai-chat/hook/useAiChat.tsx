import {
  getConversation,
  storeConversation,
} from "@/actions/conversation.action";
import { useConversation } from "@11labs/react";
import { startTransition, useOptimistic, useState } from "react";
import { ConversationType } from "../type";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useAiChat = () => {
  const queryClient = useQueryClient();
  const { data, isLoading: conversationLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await getConversation();
      return res.data;
    },
  });

  const [optConversations, setOptConversation] = useOptimistic(
    data || [],
    (currentState: ConversationType[], optimisticValue: ConversationType) => {
      return [...currentState, optimisticValue];
    }
  );

  const [isEnd, setIsEnd] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const { status, startSession, endSession, isSpeaking } = useConversation({
    onMessage: (message) => {
      startTransition(async () => {
        setOptConversation(message);
        await storeConversation(message);
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error: string | Error) => {
      setErrorMessage(typeof error === "string" ? error : error.message);
      console.error("Error:", error);
    },
  });

  const handleStartConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
      });
      setIsEnd(false);
      setHasPermission(true);
    } catch (error) {
      setErrorMessage("Microphone access denied");
      console.error("Error accessing microphone:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await endSession();
      setIsEnd(true);
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  return {
    isSpeaking: isSpeaking && !isEnd,
    status,
    errorMessage,
    hasPermission,
    handleStartConversation,
    handleEndConversation,
    optConversations,
    conversationLoading,
  };
};

export default useAiChat;
