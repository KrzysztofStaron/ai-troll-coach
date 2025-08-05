"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Star, AlertTriangle, Ban, Sparkles, Brain, Heart, Target } from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progressValue, setProgressValue] = useState(20);

  // Animation stages: 0-6 (7 stages total for 1->2->3->4->3->2->1)
  const stages = [
    { image: "/1.jpg", border: "border-green-400", progress: 20, label: "Calm" },
    { image: "/2.jpg", border: "border-yellow-400", progress: 40, label: "Serious" },
    { image: "/3.jpg", border: "border-orange-400", progress: 60, label: "Disgusted" },
    { image: "/4.jpg", border: "border-red-400", progress: 75, label: "COSMIC CHAOS" },
    { image: "/3.jpg", border: "border-orange-400", progress: 60, label: "Disgusted" },
    { image: "/2.jpg", border: "border-yellow-400", progress: 40, label: "Serious" },
    { image: "/1.jpg", border: "border-green-400", progress: 20, label: "Calm" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage(prev => (prev + 1) % stages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgressValue(stages[currentStage].progress);
  }, [currentStage]);

  const currentStageData = stages[currentStage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Life Coach</h1>
              <p className="text-xs text-gray-600">Master of Universal Laws & Energy Alignment</p>
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">Start Session</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">
            🔥 Certified Gas Station Spiritual Master
          </Badge>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Meet Your AI Life Coach
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Experience the most <span className="font-semibold text-orange-600">authentically unqualified</span>{" "}
            spiritual guru who learned everything from 2 YouTube videos and a gas station certification. Watch him
            transform from enlightened master to cosmic chaos in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8">
              Challenge the Master
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50 text-lg px-8 bg-transparent"
            >
              View Credentials
            </Button>
          </div>

          {/* Transformation Animation */}
          <Card className="max-w-2xl mx-auto mb-8 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Watch the Transformation
                <Sparkles className="w-5 h-5 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-64 bg-gradient-to-br from-blue-900 via-purple-900 to-orange-900">
                {/* Animated Head */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={currentStageData.image}
                      alt={`${currentStageData.label} Life Coach`}
                      className={`w-32 h-32 rounded-full object-cover border-4 shadow-lg transition-all duration-500 ease-in-out ${currentStageData.border}`}
                      style={{ objectPosition: "center 30%" }}
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-medium shadow-md">
                      {currentStageData.label}
                    </div>
                  </div>
                </div>

                {/* Floating particles for cosmic effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-8 right-8 w-1 h-1 bg-blue-300 rounded-full animate-bounce"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce"
                    style={{ animationDelay: "2.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-4 right-4 w-1 h-1 bg-green-300 rounded-full animate-bounce"
                    style={{ animationDelay: "3.5s" }}
                  ></div>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span>Energy Vibration</span>
                  <span className="font-medium text-red-600 animate-pulse">{currentStageData.label.toLowerCase()}</span>
                </div>
                <div className="relative">
                  <Progress value={progressValue} className="h-2 transition-all duration-500 ease-in-out" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">The Complete Spiritual Fraud Experience</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle className="text-lg">Fake Credentials</CardTitle>
                <CardDescription>
                  Master of Physiotherapy, Breathwork Trainer, and Author of the "Masterful Life Meditation Guide" - all
                  from extensive gas station research.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle className="text-lg">Dynamic Anger System</CardTitle>
                <CardDescription>
                  Watch your "enlightened master" progressively lose his cosmic cool as you challenge his universal
                  wisdom and questionable qualifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Ban className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle className="text-lg">Ultimate Blocking</CardTitle>
                <CardDescription>
                  Push too far and experience the spiritual equivalent of road rage as your coach blocks you from
                  accessing "universal wisdom."
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="w-8 h-8 text-yellow-500 mb-2" />
                <CardTitle className="text-lg">Buzzword Mastery</CardTitle>
                <CardDescription>
                  Experience peak spiritual vocabulary: "vibrations," "energy flow," "cosmic alignment," and "neural
                  pathways" - all from 2 YouTube videos.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-8 h-8 text-pink-500 mb-2" />
                <CardTitle className="text-lg">Real Content, Fake Guru</CardTitle>
                <CardDescription>
                  Get actual spiritual wisdom wrapped in comedy as our "master" presents "teachings" scraped form the
                  internet.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle className="text-lg">Industry Satire</CardTitle>
                <CardDescription>
                  Experience a brilliant parody of the spiritual coaching industry's overconfidence, lack of
                  qualifications, and fragile egos.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Personality States */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">The Transformation Journey</h2>

          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <CardTitle className="text-green-800">0-20: "Cosmically Aligned"</CardTitle>
                </div>
                <CardDescription className="text-green-700">
                  Overly enthusiastic about manifesting, vibrations, universal flow, and money manifestation. Peak
                  spiritual guru performance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <CardTitle className="text-yellow-800">20-60: "Energy Disturbed"</CardTitle>
                </div>
                <CardDescription className="text-yellow-700">
                  Getting defensive, mentions "extensive research" and questions your commitment to the spiritual
                  journey.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <CardTitle className="text-red-800">60-100: "Cosmic Chaos Unleashed"</CardTitle>
                </div>
                <CardDescription className="text-red-700">
                  ABSOLUTELY FURIOUS, ALL CAPS, personal attacks, threatens your spiritual development, and ultimately
                  blocks you from the sacred space.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">See the Chaos Unfold</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-05%20at%2014-04-00%20YOU%20vs%20Personal%20Development%20Coach%20Troll%20Your%20Coach-wJSmpEkuULSTFS0iW1NqIe1q3yAuH1.png"
                  alt="Cosmically aligned state - peaceful guru mode"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-sm text-green-700">Enlightened State</CardTitle>
                <CardDescription className="text-xs">
                  Your master in peak spiritual form, ready to share universal wisdom
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-05%20at%2014-04-10%20YOU%20vs%20Personal%20Development%20Coach%20Troll%20Your%20Coach-0cxe7cMiWgqg27JiI4g4VIRs7exVMW.png"
                  alt="Cosmic chaos unleashed - angry guru mode"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-sm text-red-700">Chaos Mode</CardTitle>
                <CardDescription className="text-xs">
                  The mask slips as your "master" reveals his true nature
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-05%20at%2014-04-17%20YOU%20vs%20Personal%20Development%20Coach%20Troll%20Your%20Coach-I9rf5QLEjcrFa6DpNeem8BToaCi0sA.png"
                  alt="Blocked by the life coach"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-sm text-gray-700">Ultimate Blocking</CardTitle>
                <CardDescription className="text-xs">When spiritual enlightenment meets ego protection</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Troll Your Coach?</h2>
          <p className="text-xl mb-8 opacity-90">
            Test the limits of artificial spiritual enlightenment. See how quickly a "master" reveals their true nature
            when their authority is questioned.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8">
              Start Trolling Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-300">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            Not affiliated with any actual spiritual masters, gas stations, or YouTube universities.
          </p>
        </div>
      </footer>
    </div>
  );
}
