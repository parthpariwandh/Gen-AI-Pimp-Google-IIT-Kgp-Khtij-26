import React from 'react';
import { Message, Role } from '../types';
import { AgentIcon, UserIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
  isLastMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading, isLastMessage }) => {
  const isUser = message.role === Role.USER;
  const isModel = message.role === Role.MODEL;

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-gray-700 text-gray-200 rounded-bl-none';
  const icon = isUser ? <UserIcon /> : <AgentIcon />;
  const iconOrder = isUser ? 'order-2' : 'order-1';
  const bubbleOrder = isUser ? 'order-1' : 'order-2';

  const showCursor = isModel && isLoading && isLastMessage;

  return (
    <div className={`flex items-start gap-3 w-full ${containerClasses}`}>
      <div className={`flex-shrink-0 ${iconOrder}`}>{icon}</div>
      <div className={`max-w-md md:max-w-lg lg:max-w-2xl px-4 py-3 rounded-xl shadow-md ${bubbleClasses} ${bubbleOrder}`}>
        <p className="whitespace-pre-wrap">
          {message.text}
          {showCursor && (
            <span className="inline-block w-0.5 h-5 bg-indigo-400 ml-1 animate-pulse" style={{ animationDuration: '1.2s' }} />
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;