"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Send, Zap, Flame, Brain, Sparkles, ArrowLeft } from "lucide-react";
import { getCoachResponse } from "@/lib/chat-actions";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function CoachTrollPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome, dear wanderer! I'm Coach Nirdushan, your guide on the path to becoming the MASTER OF YOUR LIFE! ✨ Through my ancient wisdom and universal laws, I'll help you unlock your unlimited potential and align your energy with the cosmic flow! 🚀 Remember - everything is energy, and your thoughts create your reality!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [angerLevel, setAngerLevel] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getAngerColor = () => {
    if (angerLevel < 30) return "bg-green-500";
    if (angerLevel < 60) return "bg-yellow-500";
    if (angerLevel < 80) return "bg-orange-500";
    return "bg-red-500";
  };

  const getCoachMood = () => {
    if (angerLevel < 20) return "cosmically aligned";
    if (angerLevel < 40) return "energy disturbed";
    if (angerLevel < 60) return "vibration disrupted";
    if (angerLevel < 80) return "universal flow blocked";
    return "cosmic chaos unleashed";
  };

  const getCoachEmoji = () => {
    if (angerLevel < 30) return "🧘‍♂️";
    if (angerLevel < 60) return "😤";
    if (angerLevel < 80) return "😠";
    return "🤬";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || sessionEnded) return;

    setIsLoading(true);

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await getCoachResponse(inputValue, angerLevel);

      const coachMessage: Message = {
        id: messages.length + 2,
        text: response.message,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, coachMessage]);
      setAngerLevel(response.angerLevel);

      // Check if session ended
      if (response.sessionEnded) {
        setSessionEnded(true);
      }
    } catch (error) {
      console.error("Error getting coach response:", error);

      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm having technical difficulties right now... which is making me even MORE frustrated! 😤",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      setAngerLevel(prev => Math.min(100, prev + 15));
    } finally {
      setIsLoading(false);
    }
  };

  const quickResponses = [
    {
      text: "This universal law stuff sounds like nonsense to me",
      label: "⚡ Challenge Universal Laws",
      className: "border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300",
    },
    {
      text: "I want to become the master of my life!",
      label: "🌟 Embrace Mastery",
      className: "border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300",
    },
    {
      text: "How do I align my energy with the cosmic flow?",
      label: "🌀 Ask About Energy",
      className: "border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300",
    },
    {
      text: "Can you explain the Law of Attraction?",
      label: "🧲 Law of Attraction",
      className: "border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300",
    },
    {
      text: "What's this about thoughts creating reality?",
      label: "💭 Question Reality",
      className: "border-yellow-200 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-300",
    },
    {
      text: "This sounds like wishful thinking",
      label: "🤨 Express Skepticism",
      className: "border-red-300 text-red-800 hover:bg-red-100 hover:border-red-400",
    },
    {
      text: "How do I work with affirmations?",
      label: "🧠 Affirmations",
      className: "border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300",
    },
    {
      text: "What is the alpha state in meditation?",
      label: "🧘‍♂️ Alpha State",
      className: "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300",
    },
    {
      text: "How do I reprogram my neural pathways?",
      label: "🔧 Neural Pathways",
      className: "border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Coach Nirdushan</h1>
                <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                  <Brain className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Master of Universal Laws & Energy Alignment</span>
                </p>
              </div>
            </div>

            {/* Anger Meter */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right min-w-0 flex-1 sm:flex-initial">
                <p className="text-xs sm:text-sm font-medium text-gray-700">Energy Vibration</p>
                <p className="text-xs text-gray-500 truncate">{getCoachMood()}</p>
              </div>
              <div className="w-24 sm:w-32 md:w-40">
                <Progress value={angerLevel} className={`h-2 sm:h-3 ${getAngerColor()}`} />
              </div>
              <div className="text-xl sm:text-2xl">{getCoachEmoji()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <Card className="h-[calc(100vh-120px)] sm:h-[800px] shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b p-3 sm:p-6">
            <CardTitle className="text-gray-800 flex items-center gap-2 text-sm sm:text-base">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              Masterful Life Meditation Session
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 h-[calc(100%-60px)] sm:h-[740px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 mobile-scroll">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl shadow-sm ${
                      message.isUser
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">{isClient ? message.timestamp.toLocaleTimeString() : ""}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <p className="text-sm">Coach Nirdushan is thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Session Ended Message */}
            {sessionEnded && (
              <div className="p-4 sm:p-6 border-t bg-red-50 border-red-200">
                <div className="text-center">
                  <p className="text-red-600 font-bold text-base sm:text-lg">Nirdushan has blocked you</p>
                  <p className="text-red-500 text-sm mt-1">Session terminated due to disrespect</p>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className={`p-3 sm:p-6 border-t bg-white ${sessionEnded ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="space-y-3 sm:space-y-4">
                {/* Main Input */}
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div className="flex-1 relative">
                      <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-2">
                        Share Your Energy
                      </label>
                      <div className="relative">
                        <Input
                          id="message-input"
                          value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
                          placeholder={
                            sessionEnded
                              ? "Session ended"
                              : "Share your thoughts, questions, or energy with Coach Nirdushan..."
                          }
                          className="pr-12 py-3 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg shadow-sm min-h-[44px]"
                          onKeyPress={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                          maxLength={500}
                          disabled={isLoading || sessionEnded}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                          {inputValue.length}/500
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading || sessionEnded}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:bg-gray-300 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md min-h-[44px] w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {isLoading ? "Sending..." : sessionEnded ? "Blocked" : "Send"}
                      </span>
                      <span className="sm:hidden">{isLoading ? "..." : sessionEnded ? "Blocked" : "Send"}</span>
                    </Button>
                  </div>
                </div>

                {/* Quick Response Section */}
                <div className="border-t pt-3 sm:pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    Universal Energy Patterns:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {quickResponses.map((response, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputValue(response.text)}
                        disabled={isLoading || sessionEnded}
                        className={`text-xs px-3 py-2 transition-all duration-200 min-h-[36px] justify-start ${response.className}`}
                      >
                        {response.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
