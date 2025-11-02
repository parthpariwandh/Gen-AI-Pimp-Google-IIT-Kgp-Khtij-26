import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="max-w-3xl mx-auto w-full h-full flex flex-col space-y-4 pr-2 overflow-y-auto">
      {messages.map((msg, index) => (
        <ChatMessage 
          key={index} 
          message={msg} 
          isLoading={isLoading}
          isLastMessage={index === messages.length - 1} 
        />
      ))}
    </div>
  );
};

export default ChatHistory;