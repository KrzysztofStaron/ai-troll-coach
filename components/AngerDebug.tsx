"use client";

import { Badge } from "@/components/ui/badge";

interface AngerDebugProps {
  reasoning?: string;
  angerIncrease?: number;
}

export function AngerDebug({ reasoning, angerIncrease }: AngerDebugProps) {
  // Only show in development mode
  if (process.env.NODE_ENV !== "development" || !reasoning) {
    return null;
  }

  return (
    <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2 mt-1 border-l-2 border-orange-300">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          🤖 AI Assessment
        </Badge>
        {angerIncrease !== undefined && (
          <Badge
            variant={angerIncrease > 0 ? "destructive" : angerIncrease < 0 ? "default" : "secondary"}
            className="text-xs"
          >
            {angerIncrease >= 0 ? "+" : ""}
            {angerIncrease} anger
          </Badge>
        )}
      </div>
      <div className="mt-1 italic">{reasoning}</div>
    </div>
  );
}
