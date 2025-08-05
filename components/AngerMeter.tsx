"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Heart, Skull } from "lucide-react";

interface AngerMeterProps {
  level: number; // 0-100
}

export function AngerMeter({ level }: AngerMeterProps) {
  const getAngerLabel = (level: number) => {
    if (level === 0) return "😌 Completely Zen";
    if (level < 20) return "🧘 Zen Mode";
    if (level < 40) return "😐 Slightly Annoyed";
    if (level < 60) return "😤 Getting Irritated";
    if (level < 80) return "😡 Very Angry";
    return "🤬 ABSOLUTELY FURIOUS";
  };

  const getAngerColor = (level: number) => {
    if (level < 20) return "bg-green-500";
    if (level < 40) return "bg-yellow-500";
    if (level < 60) return "bg-orange-500";
    if (level < 80) return "bg-red-500";
    return "bg-red-700";
  };

  const getAngerIcon = (level: number) => {
    if (level < 20) return <Heart className="w-4 h-4" />;
    if (level < 60) return <Flame className="w-4 h-4" />;
    return <Skull className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Coach Anger Level</h3>
        <Badge variant="secondary" className="flex items-center gap-1">
          {getAngerIcon(level)}
          {level}%
        </Badge>
      </div>

      <div className="space-y-2">
        <Progress value={level} className="h-4" />
        <div className={`h-4 rounded-full anger-meter-fill ${getAngerColor(level)}`} style={{ width: `${level}%` }} />
      </div>

      <div className="text-center">
        <Badge variant={level > 60 ? "destructive" : "secondary"} className="text-sm font-medium">
          {getAngerLabel(level)}
        </Badge>
      </div>

      {level > 80 && (
        <div className="text-xs text-muted-foreground text-center animate-pulse">⚠️ Coach is about to explode! ⚠️</div>
      )}
    </div>
  );
}
