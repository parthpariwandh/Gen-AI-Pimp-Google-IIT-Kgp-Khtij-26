import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Message, Role } from './types';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.MODEL,
      text: "Hello! I'm your friendly agent. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are a helpful and friendly agent. Keep your responses concise and conversational.',
          },
        });
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages(prev => [...prev, { role: Role.MODEL, text: "Sorry, I couldn't initialize. Please check the API key and refresh." }]);
      }
    };
    initChat();
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (isLoading || !text.trim() || !chatRef.current) return;

    const userMessage: Message = { role: Role.USER, text };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    // Add a placeholder for the streaming response
    setMessages(prevMessages => [...prevMessages, { role: Role.MODEL, text: "" }]);

    try {
      const stream = await chatRef.current.sendMessageStream(text);
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text += chunkText;
          return newMessages;
        });
      }

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: Role.MODEL,
        text: "Oops! Something went wrong. Please try again.",
      };
      // Replace the placeholder with the error message
      setMessages(prevMessages => [...prevMessages.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800 shadow-md p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center text-white">Simple Agent</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <ChatHistory messages={messages} isLoading={isLoading} />
      </main>
      
      <footer className="p-4 md:p-6 bg-gray-900 sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;