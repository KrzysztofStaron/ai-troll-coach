"use client";

import { Badge } from "@/components/ui/badge";
import { AngerDebug } from "@/components/AngerDebug";

interface ChatMessageProps {
  message: string;
  isCoach: boolean;
  timestamp: Date;
  angerLevel?: number;
  reasoning?: string;
  angerIncrease?: number;
}

export function ChatMessage({
  message,
  isCoach,
  timestamp,
  angerLevel = 0,
  reasoning,
  angerIncrease,
}: ChatMessageProps) {
  const getCoachEmoji = (angerLevel: number) => {
    if (angerLevel < 20) return "🧘";
    if (angerLevel < 40) return "😐";
    if (angerLevel < 60) return "😤";
    if (angerLevel < 80) return "😡";
    return "🤬";
  };

  const getMessageStyle = (angerLevel: number) => {
    if (angerLevel > 80) return "bg-anger-gradient text-foreground";
    if (angerLevel > 60) return "bg-red-50 border-red-200";
    if (angerLevel > 40) return "bg-orange-50 border-orange-200";
    return "bg-zen-gradient text-white";
  };

  return (
    <div className={`flex gap-3 p-4 ${isCoach ? "justify-start" : "justify-end"}`}>
      {isCoach && (
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            angerLevel > 60 ? "animate-pulse" : "animate-pulse-zen"
          }`}
        >
          <span className="text-2xl">{getCoachEmoji(angerLevel)}</span>
        </div>
      )}

      <div className={`max-w-[80%] space-y-2 ${isCoach ? "order-1" : "order-2"}`}>
        <div
          className={`rounded-lg p-3 ${isCoach ? getMessageStyle(angerLevel) : "bg-primary text-primary-foreground"}`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>

        {isCoach && <AngerDebug reasoning={reasoning} angerIncrease={angerIncrease} />}

        <div
          className={`flex items-center gap-2 text-xs text-muted-foreground ${
            isCoach ? "justify-start" : "justify-end"
          }`}
        >
          {isCoach && angerLevel > 0 && (
            <Badge variant="outline" className="text-xs">
              Anger: {angerLevel}%
            </Badge>
          )}
        </div>
      </div>

      {!isCoach && (
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-lg">🫵</span>
        </div>
      )}
    </div>
  );
}
