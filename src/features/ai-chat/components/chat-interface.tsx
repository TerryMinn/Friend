import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MicOff, Send } from "lucide-react";
import React from "react";

type Props = {};

const ChatInterface = (props: Props) => {
  return (
    <div className="space-y-2 sm:space-y-4 ">
      <Textarea
        placeholder="Type your message here..."
        className="min-h-[80px] sm:min-h-[100px] resize-none text-sm sm:text-base"
      />

      <div className="flex justify-between">
        <Button size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
          <MicOff size={16} />
        </Button>

        <Button className="ml-auto flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">
          <Send size={16} />
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
