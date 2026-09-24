import React from "react";
import { Message, Role } from "../types";
import { AgentIcon, UserIcon } from "./Icons";

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
  isLastMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading, isLastMessage }) => {
  const isUser = message.role === Role.USER;
  const showCursor = message.role === Role.MODEL && isLoading && isLastMessage;

  return (
    <div className={`flex items-start gap-3 w-full ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? <div className="flex-shrink-0"><AgentIcon /></div> : null}
      <div
        className={`max-w-md md:max-w-lg lg:max-w-2xl px-4 py-3 rounded-xl shadow-md ${
          isUser ? "bg-indigo-600 text-white rounded-br-none" : "bg-slate-800 text-slate-100 rounded-bl-none"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message.text}
          {showCursor ? <span className="inline-block w-0.5 h-5 bg-indigo-300 ml-1 animate-pulse" /> : null}
        </p>
      </div>
      {isUser ? <div className="flex-shrink-0"><UserIcon /></div> : null}
    </div>
  );
};

export default React.memo(ChatMessage);
