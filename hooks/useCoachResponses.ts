"use client";

import { useState, useCallback } from "react";
import { getCoachResponse } from "@/lib/chat-actions";

export interface Message {
  id: string;
  message: string;
  isCoach: boolean;
  timestamp: Date;
  angerLevel: number;
  reasoning?: string;
  angerIncrease?: number;
}

export function useCoachResponses() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      message:
        "Welcome! I'm your certified life coach here to unlock your unlimited potential! ✨ What limiting beliefs can I help you overcome today?",
      isCoach: true,
      timestamp: new Date(),
      angerLevel: 0,
    },
  ]);
  const [angerLevel, setAngerLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const addUserMessage = useCallback(
    async (userMessage: string) => {
      const userMsg: Message = {
        id: Date.now().toString(),
        message: userMessage,
        isCoach: false,
        timestamp: new Date(),
        angerLevel: angerLevel,
      };

      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const data = await getCoachResponse(userMessage, angerLevel);

        const coachMsg: Message = {
          id: (Date.now() + 1).toString(),
          message: data.message,
          isCoach: true,
          timestamp: new Date(),
          angerLevel: data.angerLevel,
          reasoning: data.reasoning,
          angerIncrease: data.angerLevel - angerLevel,
        };

        setMessages(prev => [...prev, coachMsg]);
        setAngerLevel(data.angerLevel);
      } catch (error) {
        console.error("Error getting coach response:", error);

        // Fallback response with increased anger
        const fallbackMsg: Message = {
          id: (Date.now() + 1).toString(),
          message: "I'm having technical difficulties right now... which is making me even MORE frustrated! 😤",
          isCoach: true,
          timestamp: new Date(),
          angerLevel: Math.min(100, angerLevel + 15),
        };

        setMessages(prev => [...prev, fallbackMsg]);
        setAngerLevel(prev => Math.min(100, prev + 15));
      } finally {
        setIsLoading(false);
      }
    },
    [angerLevel]
  );

  const resetConversation = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        message:
          "Welcome back! I'm refreshed and ready to help you achieve greatness! ✨ What challenges shall we tackle together?",
        isCoach: true,
        timestamp: new Date(),
        angerLevel: 0,
      },
    ]);
    setAngerLevel(0);
  }, []);

  return {
    messages,
    angerLevel,
    isLoading,
    addUserMessage,
    resetConversation,
  };
}
