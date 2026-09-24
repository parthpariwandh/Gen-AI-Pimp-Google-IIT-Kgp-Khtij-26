import React, { useEffect, useRef } from "react";
import { Message } from "../types";
import ChatMessage from "./ChatMessage";

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages]);

  return (
    <div ref={scrollRef} className="max-w-3xl mx-auto w-full h-full flex flex-col gap-4 overflow-y-auto pr-1">
      {messages.map((msg, index) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          isLoading={isLoading}
          isLastMessage={index === messages.length - 1}
        />
      ))}
    </div>
  );
};

export default React.memo(ChatHistory);
