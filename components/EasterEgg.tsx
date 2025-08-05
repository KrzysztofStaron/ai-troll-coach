"use client";

import { useEffect, useState } from "react";

interface EasterEggProps {
  angerLevel: number;
}

export function EasterEgg({ angerLevel }: EasterEggProps) {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showShake, setShowShake] = useState(false);

  useEffect(() => {
    if (angerLevel >= 100) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 3000);
    }
    if (angerLevel >= 80) {
      setShowShake(true);
      setTimeout(() => setShowShake(false), 2000);
    }
  }, [angerLevel]);

  if (angerLevel >= 100 && showFireworks) {
    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
        <div className="absolute top-1/4 left-1/4 animate-ping">
          <div className="text-4xl">💥</div>
        </div>
        <div className="absolute top-3/4 right-1/4 animate-pulse">
          <div className="text-4xl">🎆</div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-bounce delay-300">
          <div className="text-5xl">🏆</div>
        </div>
        <div className="absolute top-1/2 right-1/3 animate-spin">
          <div className="text-3xl">⭐</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-red-200/20 to-purple-200/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-red-600 animate-pulse mb-2">CONGRATULATIONS!</div>
          <div className="text-2xl text-purple-600 animate-bounce">You've completely broken the coach! 🤬➡️😵</div>
        </div>
      </div>
    );
  }

  if (angerLevel >= 80 && showShake) {
    return (
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
        <style jsx global>{`
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-5px);
            }
            75% {
              transform: translateX(5px);
            }
          }
          .shake-screen {
            animation: shake 0.3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return null;
}
