"use client";

import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Flame } from "lucide-react";

interface CoachHeaderProps {
  angerLevel: number;
}

export function CoachHeader({ angerLevel }: CoachHeaderProps) {
  const getHeaderTitle = (angerLevel: number) => {
    if (angerLevel < 20) return "Inner Peace Life Coach ✨";
    if (angerLevel < 40) return "Personal Development Coach 🎯";
    if (angerLevel < 60) return "Coach (Slightly Irritated) 😤";
    if (angerLevel < 80) return "Coach VERY Angry 😡";
    return "FORMER Coach - FIRED! 🤬";
  };

  const getSubtitle = (angerLevel: number) => {
    if (angerLevel < 20) return "I'm here to guide you on the path to enlightenment";
    if (angerLevel < 40) return "I'll help you achieve your full potential";
    if (angerLevel < 60) return "Can we please get back to motivation...?";
    if (angerLevel < 80) return "THIS IS NOT HOW THIS WAS SUPPOSED TO GO!";
    return "ENOUGH! WE'RE ENDING THIS SESSION!";
  };

  return (
    <header
      className={`p-6 shadow-calm transition-all duration-500 ${
        angerLevel > 60 ? "bg-anger-gradient" : "bg-zen-gradient"
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Brain className={`w-8 h-8 text-white ${angerLevel > 60 ? "animate-bounce" : ""}`} />
            <h1 className="text-3xl font-bold text-white">{getHeaderTitle(angerLevel)}</h1>
            {angerLevel > 80 && <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />}
          </div>

          <p className={`text-white/90 text-lg ${angerLevel > 60 ? "animate-pulse" : ""}`}>{getSubtitle(angerLevel)}</p>

          <div className="flex items-center justify-center gap-3">
            <Badge
              variant="secondary"
              className={`bg-white/20 text-white border-white/30 ${angerLevel > 80 ? "animate-bounce" : ""}`}
            >
              License: Bought at Gas Station 🛒
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Experience: 2 YouTube Videos 📺
            </Badge>
            <a
              href="/troll"
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white border border-white/30 rounded-full text-sm hover:bg-white/30 transition-colors duration-200"
            >
              <Flame className="w-4 h-4" />
              Try Troll Mode
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
