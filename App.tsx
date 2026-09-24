import React from "react";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import { useChatSession } from "./hooks/useChatSession";

const App: React.FC = () => {
  const { messages, isLoading, error, send, clear } = useChatSession();

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-indigo-300">Kshitij IIT Kharagpur</p>
            <h1 className="text-lg font-semibold text-white">Gemini Agent</h1>
          </div>
          <button
            type="button"
            onClick={clear}
            className="text-sm px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            New chat
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-4 md:p-6">
        {error ? (
          <p className="max-w-3xl mx-auto mb-3 text-sm text-amber-300">{error}</p>
        ) : null}
        <ChatHistory messages={messages} isLoading={isLoading} />
      </main>

      <footer className="p-4 md:p-6 bg-slate-950 sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={send} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;
