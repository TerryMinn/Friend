import { storeConversation } from "@/actions/conversation.action";
import { useConversation } from "@11labs/react";
import { startTransition, useState } from "react";

const useAiChat = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const { status, startSession, endSession, isSpeaking } = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
    },
    onMessage: (message) => {
      console.log("Received message:", message);

      startTransition(async () => {
        await storeConversation(message);
      });
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
      setHasPermission(true);
    } catch (error) {
      setErrorMessage("Microphone access denied");
      console.error("Error accessing microphone:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  return {
    isSpeaking,
    status,
    errorMessage,
    hasPermission,
    handleStartConversation,
    handleEndConversation,
  };
};

export default useAiChat;
