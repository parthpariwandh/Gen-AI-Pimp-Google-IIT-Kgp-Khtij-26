
import React, { useState } from 'react';
import { SendIcon, LoadingSpinner } from './Icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-gray-800 p-2 rounded-xl border border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow duration-200">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none resize-none max-h-40 p-2"
        rows={1}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-indigo-600 text-white rounded-lg p-2.5 disabled:bg-indigo-900 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
        aria-label="Send message"
      >
        {isLoading ? <LoadingSpinner /> : <SendIcon />}
      </button>
    </form>
  );
};

export default ChatInput;
