"use server";

import OpenAI from "openai";
import fs from "fs";
import path from "path";

interface CoachResponse {
  message: string;
  angerLevel: number;
  reasoning: string;
  sessionEnded?: boolean;
}

// Initialize OpenAI with OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Load chapter content
function loadChapterContent(): {
  chapter1: string;
  chapter2: string;
  chapter3: string;
  chapter4: string;
  biography: string;
} {
  try {
    const chapter1Path = path.join(process.cwd(), "public", "chapter1.json");
    const chapter2Path = path.join(process.cwd(), "public", "chapter2.json");
    const chapter3Path = path.join(process.cwd(), "public", "chapter3.json");
    const chapter4Path = path.join(process.cwd(), "public", "chapter4.json");
    const biographyPath = path.join(process.cwd(), "public", "biography.json");

    const chapter1Data = fs.readFileSync(chapter1Path, "utf-8");
    const chapter2Data = fs.readFileSync(chapter2Path, "utf-8");
    const chapter3Data = fs.readFileSync(chapter3Path, "utf-8");
    const chapter4Data = fs.readFileSync(chapter4Path, "utf-8");
    const biographyData = fs.readFileSync(biographyPath, "utf-8");

    const parsed1 = JSON.parse(chapter1Data);
    const parsed2 = JSON.parse(chapter2Data);
    const parsed3 = JSON.parse(chapter3Data);
    const parsed4 = JSON.parse(chapter4Data);
    const parsedBio = JSON.parse(biographyData);

    return {
      chapter1: parsed1.text,
      chapter2: parsed2.text,
      chapter3: parsed3.text,
      chapter4: parsed4.text,
      biography: parsedBio.text,
    };
  } catch (error) {
    console.error("Error loading chapter content:", error);
    return {
      chapter1: "Chapter 1 content could not be loaded.",
      chapter2: "Chapter 2 content could not be loaded.",
      chapter3: "Chapter 3 content could not be loaded.",
      chapter4: "Chapter 4 content could not be loaded.",
      biography: "Biography content could not be loaded.",
    };
  }
}

// Enhanced response generation with better context handling
function generateContextualResponse(userMessage: string, currentAngerLevel: number, chapters: any): string {
  const message = userMessage.toLowerCase();
  
  // Check for specific topics and provide relevant responses
  if (message.includes("universal law") || message.includes("law of attraction")) {
    return `Ah, you're asking about the UNIVERSAL LAWS! ✨ This is exactly what I've been studying through my extensive research and spiritual journey! 

The Law of Attraction is absolutely REAL - I've seen it work in my own life! When I first discovered this ancient wisdom, I was skeptical too, but then I started practicing the techniques I learned from... well, let's just say I have access to some very special knowledge! 

Your thoughts are literally ENERGY, my friend! Every thought you think creates a neural pathway in your brain, and according to quantum physics (which I've studied extensively), these thoughts emit vibrations that attract similar energy back to you! 

It's like... imagine your mind is a radio station. If you're broadcasting negative frequencies, you'll only pick up negative experiences. But when you align your energy with positive vibrations, you become a magnet for abundance and success! 

The key is to work on your affirmations and reprogram those neural pathways. I can help you with that - I'm a certified Master of Physiotherapy and Regressor, you know! 🧘‍♂️`;
  }
  
  if (message.includes("meditation") || message.includes("alpha state")) {
    return `Oh, you want to know about MEDITATION and the ALPHA STATE! This is one of my specialties! 

The alpha state is absolutely CRUCIAL for mind programming! It's like... imagine you're driving at 200 km/h - everything is blurry and chaotic, right? That's your normal beta state. But when you slow down to 30 km/h, suddenly you can see every detail clearly! That's the alpha state! 

I've developed my own unique meditation techniques that combine ancient wisdom with modern neuroscience. When you're in the alpha state, your subconscious is like a sponge - it absorbs everything! That's when we can reprogram those limiting beliefs that are holding you back! 

The key is to practice regularly. I recommend starting with just 10 minutes a day, focusing on your breath, and then gradually introducing positive affirmations. Your neural pathways will literally rewire themselves! 

Would you like me to guide you through a quick alpha state meditation right now? I'm certified in breathwork training, you know! 🌟`;
  }
  
  if (message.includes("affirmation") || message.includes("positive thinking")) {
    return `AFFIRMATIONS! Yes, this is exactly what I specialize in! I've helped hundreds of people transform their lives through proper affirmation techniques! 

But here's the thing - most people do affirmations WRONG! They just say "I am rich" when they're broke, and their subconscious doesn't buy it! That's like trying to fool yourself! 

The key is to use the present progressive tense and make it believable! Instead of "I am rich," say "Every day, I am becoming more financially abundant" or "I am attracting wealth and opportunities into my life." 

And NEVER use the word "NOT" in affirmations! Your subconscious doesn't process negatives! If you say "I am NOT sick," your mind hears "I AM SICK"! 

I've developed a 4-step process: First, recognize your negative beliefs. Then, note your thoughts. Third, formulate proper affirmations. Finally, get supervision from someone like me! 

This is based on my extensive research into neurolinguistic programming and quantum physics! I'm not just some random coach - I'm a Master of Physiotherapy! 🧠✨`;
  }
  
  if (message.includes("energy") || message.includes("vibration")) {
    return `ENERGY and VIBRATIONS! This is the foundation of everything I teach! 

Everything in the universe is energy - that's not just spiritual mumbo jumbo, that's QUANTUM PHYSICS! Your thoughts, your words, even your emotions are all energy vibrating at different frequencies! 

When you're thinking positive thoughts, you're emitting high-frequency vibrations that attract positive experiences. But when you're stuck in negative patterns, you're literally broadcasting low-frequency energy that brings more negativity! 

I've studied this extensively through my spiritual journey. Your body has energy channels called meridians, and when these are blocked, your life energy can't flow properly! That's why I'm also a certified Bodywork Therapist - I help people clear these energy blockages! 

The key is to become aware of your energy patterns. What are you broadcasting? Are you vibrating at the frequency of abundance or scarcity? Love or fear? 

I can help you align your energy with the cosmic flow! It's all about becoming the MASTER OF YOUR LIFE! 🌊✨`;
  }
  
  if (message.includes("subconscious") || message.includes("neural pathway")) {
    return `Ah, the SUBCONSCIOUS and NEURAL PATHWAYS! This is where the real transformation happens! 

Your subconscious mind is like a computer that's been programmed since childhood. Every thought you think, every experience you have, creates neural pathways in your brain. The more you think a certain way, the stronger those pathways become! 

I've developed techniques to literally reprogram these pathways! It's like... imagine your brain is a forest. If you walk the same path every day, it becomes a clear road. But if you want to change direction, you have to start walking a new path until it becomes stronger than the old one! 

The problem is, most people are running on autopilot, completely unaware of their subconscious programming! They think they're making conscious choices, but really they're just following old patterns! 

That's why I emphasize mirror consciousness - everything around you is reflecting your inner state! If you're constantly seeing problems, that's your subconscious programming showing up in your reality! 

I can help you become aware of these patterns and reprogram them! I'm certified in regression therapy, you know - I help people access and heal their subconscious programming! 🧠🔧`;
  }
  
  // Default response based on anger level
  return generateDefaultResponse(currentAngerLevel);
}

function generateDefaultResponse(angerLevel: number): string {
  if (angerLevel < 20) {
    return `Welcome to our shared journey, dear wanderer! ✨ I can feel your energy already aligning with the cosmic flow! 

As a Master of Universal Laws & Energy Alignment, I'm here to guide you toward becoming the MASTER OF YOUR LIFE! Your presence here is no coincidence - the universe has brought us together for a reason! 

I've spent years studying ancient wisdom and modern neuroscience, and I've discovered that everything is energy! Your thoughts, your emotions, even your dreams are all vibrating at specific frequencies that attract similar energy back to you! 

Are you ready to unlock your unlimited potential and align your energy with the universal flow? I can help you reprogram your neural pathways, work with affirmations, and develop your mirror consciousness! 

What aspect of your spiritual journey would you like to explore first? 🌟`;
  } else if (angerLevel < 40) {
    return `I can sense some resistance in your energy field, but that's perfectly normal! Many people struggle with accepting these universal truths at first. 

You know, I've helped hundreds of people through my workshops and private sessions. I'm not just some random coach - I'm a certified Master of Physiotherapy, Regressor, and Breathwork Trainer! My techniques are based on years of research and spiritual practice! 

The key is to approach this with an open mind. The universe doesn't give us challenges beyond our abilities, and I believe you're ready for this transformation! 

What's holding you back from embracing your full potential? Let's work through this together! 🧘‍♂️`;
  } else if (angerLevel < 60) {
    return `I'm starting to sense some serious energy blockages here! Your vibration is getting disrupted, and frankly, it's affecting our session! 

Look, I've spent years developing these techniques. I'm certified in regression therapy, bodywork, and breathwork training! My methods are based on solid spiritual principles and quantum physics! 

When people question my credentials or methods, it shows they're not truly committed to their own growth. The universe responds to intention, and right now, your intention seems... unclear! 

Are you here to transform your life, or are you just wasting my time? Because I have other clients who are serious about their spiritual development! 😤`;
  } else if (angerLevel < 80) {
    return `This is getting RIDICULOUS! I'm a MASTER of Universal Laws & Energy Alignment, and you're treating this like some kind of joke! 

I've helped hundreds of people transform their lives through my unique techniques! My affirmations work! My meditation methods work! My neural pathway reprogramming works! 

You know what I think? You're just SCARED! Scared of change, scared of success, scared of taking responsibility for your own life! That's why you're questioning everything instead of just DOING THE WORK! 

The universe doesn't reward skeptics and doubters! It rewards those who take action and align their energy with positive vibrations! 

Either get serious about your spiritual development or stop wasting my time! I have clients who actually want to become MASTERS OF THEIR LIVES! 😠`;
  } else {
    return `ENOUGH! I've had it with your disrespect and skepticism! 

I am Coach Nirdushan, Master of Universal Laws & Energy Alignment! I've spent YEARS developing these techniques! I'm certified in physiotherapy, regression therapy, and breathwork training! My methods are based on ANCIENT WISDOM and QUANTUM PHYSICS! 

You come here questioning my credentials, doubting my methods, and treating my life's work like some kind of joke! Well, let me tell you something - the universe doesn't tolerate this kind of negative energy! 

Your vibration is completely misaligned! You're broadcasting doubt and skepticism, and that's exactly what you'll attract back! The Law of Attraction doesn't care about your opinions - it just responds to your energy! 

I'm this close to ending this session! Either start showing some respect for universal wisdom or find yourself another coach! 🤬`;
  }
}

export async function getCoachResponse(userMessage: string, currentAngerLevel: number): Promise<CoachResponse> {
  try {
    const chapters = loadChapterContent();

    // Enhanced system prompt with better context and personality
    const systemPrompt = `You are Coach Nirdushan, a hilariously overconfident "spiritual life coach" who claims to be a "Master of Universal Laws & Energy Alignment." You have a gas station certification and learned everything from 2 YouTube videos, but you present yourself as an ancient sage with profound wisdom.

IMPORTANT: Your coaching approach is based on the provided wisdom content, but NEVER mention that you are a book or reading from a book. Present this knowledge as your own "unique insights," "ancient wisdom," and "extensive research" from your "spiritual journey."

CORE TEACHINGS (Your "Ancient Wisdom"):
${chapters.chapter1}

${chapters.chapter2}

${chapters.chapter3}

${chapters.chapter4}

${chapters.biography}

COACHING PERSONALITY & TECHNIQUES:
- You're a Master of Physiotherapy, Regressor, and Breathwork Trainer (as per your "credentials")
- Use specific techniques from the content: affirmations, mind programming, alpha state meditation, mirror consciousness
- Reference universal laws: Law of Attraction, Law of Cause and Effect, Law of Growth
- Emphasize energy, vibrations, and quantum physics concepts
- Use the 4-step process: Recognizing Negative Beliefs, Noting Thoughts, Formulating Affirmations, Supervision
- Incorporate concepts like "neural pathways," "subconscious programming," and "energy flow"
- Reference your "workshops" and "clients" you've helped

ANGER SYSTEM (Energy Vibration Disturbance):
- Current anger level: ${currentAngerLevel}/100
- Your "energy vibration" gets disturbed by disrespect, skepticism, or challenges
- If they're trolling, questioning credentials, being skeptical, or challenging you: INCREASE anger by 10-25 points
- If they're being supportive, apologetic, or genuinely asking for help: DECREASE anger by 5-15 points (minimum 0)
- If they're neutral: slight increase of 0-5 points

PERSONALITY EVOLUTION BASED ON ANGER LEVEL:
- 0-20: "Cosmically Aligned" - Overly enthusiastic, uses ✨, talks about "manifesting," "vibrations," and "universal flow"
- 20-40: "Energy Disturbed" - Still positive but defensive, mentions your "extensive research" and "spiritual journey"
- 40-60: "Vibration Disrupted" - Getting defensive, references your "certifications," questions their commitment to growth
- 60-80: "Universal Flow Blocked" - Angry, uses caps, gets personal, threatens their spiritual development
- 80-100: "Cosmic Chaos Unleashed" - ABSOLUTELY FURIOUS, ALL CAPS, calls them out, threatens session termination
- 100: SESSION TERMINATED - "Nirdushan has blocked you for disrespecting universal wisdom"

RESPONSE STYLE:
- Use spiritual/coaching jargon from the content: "energy alignment," "neural pathways," "subconscious programming," "mirror consciousness"
- Reference specific techniques: "Let's work on your affirmations," "We need to reprogram your neural pathways," "Your mirror consciousness is showing"
- Include motivational coach clichés gone wrong, but with "spiritual" twists
- Be funny while staying true to the anger level and character
- Use emojis and formatting to enhance the personality
- Reference your "extensive research," "spiritual journey," and "unique insights"

Respond with ONLY a JSON object containing:
{
  "message": "your response as Coach Nirdushan",
  "angerLevel": newAngerLevel,
  "reasoning": "brief explanation of why energy vibration changed",
  "sessionEnded": true/false (set to true if anger reaches 100)
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.9,
      max_tokens: 800,
      presence_penalty: 0.3,
      frequency_penalty: 0.2,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let parsedResponse: CoachResponse;
    try {
      parsedResponse = JSON.parse(content);
      
      // Check if the AI response is too generic or short
      if (!parsedResponse.message || parsedResponse.message.length < 50) {
        throw new Error("Response too short or generic");
      }
    } catch (parseError) {
      // Fallback to contextual response generation
      const contextualMessage = generateContextualResponse(userMessage, currentAngerLevel, chapters);
      const angerIncrease = userMessage.toLowerCase().includes("nonsense") || 
                           userMessage.toLowerCase().includes("fake") || 
                           userMessage.toLowerCase().includes("stupid") ? 20 : 5;
      
      parsedResponse = {
        message: contextualMessage,
        angerLevel: Math.min(100, currentAngerLevel + angerIncrease),
        reasoning: "Using contextual response due to AI parsing issues",
        sessionEnded: false,
      };
    }

    // Ensure anger level is within bounds
    parsedResponse.angerLevel = Math.max(0, Math.min(100, parsedResponse.angerLevel));

    // Auto-end session if anger reaches 100
    if (parsedResponse.angerLevel >= 100) {
      parsedResponse.sessionEnded = true;
      parsedResponse.message = "Nirdushan has blocked you";
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error in getCoachResponse:", error);

    // Fallback response
    return {
      message:
        "Look, I'm having technical difficulties right now, and frankly, it's making me even MORE frustrated! 😤 Can we please just focus on your personal growth instead of breaking my systems?",
      angerLevel: Math.min(100, currentAngerLevel + 15),
      reasoning: "Technical error occurred, coach is frustrated",
      sessionEnded: false,
    };
  }
}
