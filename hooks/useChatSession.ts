import { useCallback, useEffect, useRef, useState } from "react";
import { Chat } from "@google/genai";
import { Message, Role } from "../types";
import { createChat } from "../services/gemini";

const STORAGE_KEY = "kshitij-gemini-session";

const WELCOME: Message = {
  id: "welcome",
  role: Role.MODEL,
  text: "Hello. I am the Kshitij Gemini Agent. Ask a question and I will stream an answer.",
};

function newId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw) as Message[];
    return parsed.length ? parsed : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

export function useChatSession() {
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const chatRef = useRef<Chat | null>(null);

  const boot = useCallback(() => {
    try {
      chatRef.current = createChat();
      setError("");
    } catch (err) {
      const text = err instanceof Error ? err.message : "Failed to start Gemini session.";
      setError(text);
      chatRef.current = null;
    }
  }, []);

  useEffect(() => {
    boot();
  }, [boot]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    if (!chatRef.current) boot();
    if (!chatRef.current) return;

    const userMessage: Message = { id: newId(), role: Role.USER, text: trimmed };
    const modelId = newId();
    setMessages((prev) => [...prev, userMessage, { id: modelId, role: Role.MODEL, text: "" }]);
    setIsLoading(true);
    setError("");

    try {
      const stream = await chatRef.current.sendMessageStream({ message: trimmed });
      for await (const chunk of stream) {
        const piece = chunk.text ?? "";
        if (!piece) continue;
        setMessages((prev) =>
          prev.map((msg) => (msg.id === modelId ? { ...msg, text: msg.text + piece } : msg))
        );
      }
    } catch (err) {
      const textErr = err instanceof Error ? err.message : "Request failed.";
      setError(textErr);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === modelId ? { ...msg, text: "The model could not complete that turn. Try again." } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [boot, isLoading]);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([WELCOME]);
    boot();
  }, [boot]);

  return { messages, isLoading, error, send, clear };
}
