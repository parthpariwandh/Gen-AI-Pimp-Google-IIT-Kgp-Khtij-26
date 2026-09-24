import React, { useState } from "react";
import { SendIcon, LoadingSpinner } from "./Icons";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-end gap-3 bg-slate-900 p-2 rounded-xl border border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500"
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit(e);
          }
        }}
        placeholder="Ask the Kshitij Gemini Agent"
        className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-40 p-2"
        rows={1}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-indigo-600 text-white rounded-lg p-2.5 disabled:bg-indigo-950 disabled:cursor-not-allowed hover:bg-indigo-500"
        aria-label="Send message"
      >
        {isLoading ? <LoadingSpinner /> : <SendIcon />}
      </button>
    </form>
  );
};

export default React.memo(ChatInput);
