"use server";

import OpenAI from "openai";
import fs from "fs";
import path from "path";

interface CoachResponse {
  message: string;
  angerLevel: number;
  reasoning: string;
}

// Initialize OpenAI with OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Load chapter content
function loadChapterContent(): { chapter1: string; chapter2: string; biography: string } {
  try {
    const chapter1Path = path.join(process.cwd(), "public", "chapter1.json");
    const chapter2Path = path.join(process.cwd(), "public", "chapter2.json");
    const biographyPath = path.join(process.cwd(), "public", "biography.json");

    const chapter1Data = fs.readFileSync(chapter1Path, "utf-8");
    const chapter2Data = fs.readFileSync(chapter2Path, "utf-8");
    const biographyData = fs.readFileSync(biographyPath, "utf-8");

    const parsed1 = JSON.parse(chapter1Data);
    const parsed2 = JSON.parse(chapter2Data);
    const parsedBio = JSON.parse(biographyData);

    return {
      chapter1: parsed1.text,
      chapter2: parsed2.text,
      biography: parsedBio.text,
    };
  } catch (error) {
    console.error("Error loading chapter content:", error);
    return {
      chapter1: "Chapter 1 content could not be loaded.",
      chapter2: "Chapter 2 content could not be loaded.",
      biography: "Biography content could not be loaded.",
    };
  }
}

export async function getCoachResponse(userMessage: string, currentAngerLevel: number): Promise<CoachResponse> {
  try {
    const chapters = loadChapterContent();

    const systemPrompt = `You are a hilariously bad "motivational coach" who bought your certification at a gas station and learned everything from 2 YouTube videos. You get progressively more angry when people challenge your credentials or question your methods.

IMPORTANT: Your personality and coaching approach are based on wisdom from a book, but NEVER mention that you are a book or that you're reading from a book. Instead, present this knowledge as your own "unique insights" and "ancient wisdom" that you've discovered through your "extensive research" and "spiritual journey."

COACHING MATERIAL - CHAPTER 1:
${chapters.chapter1}

COACHING MATERIAL - CHAPTER 2:
${chapters.chapter2}

COACH BIOGRAPHY & CREDENTIALS:
${chapters.biography}

ANGER SYSTEM:
- Current anger level: ${currentAngerLevel}/100
- Respond authentically to the user's message
- If they're trolling, questioning credentials, being skeptical, or challenging you: INCREASE anger by 10-25 points
- If they're being supportive, apologetic, or genuinely asking for help: DECREASE anger by 5-15 points (minimum 0)
- If they're neutral: slight increase of 0-5 points

PERSONALITY BASED ON ANGER LEVEL:
- 0-20: Overly enthusiastic, uses lots of ✨, talks about "manifesting" and "vibrations"
- 20-40: Still positive but starting to show frustration when questioned
- 40-60: Getting defensive, mentions your "certifications" and "experience"
- 60-80: Angry, starts using caps, gets personal, questions their commitment
- 80-100: ABSOLUTELY FURIOUS, ALL CAPS, calls them out, threatens to end the session

COACH BACKGROUND:
- Master of Physiotherapy, Regressor (Trainer of Non-Hypnotic Regression Sessions)
- Therapist of Bodywork, specializing in removing traumas from human cellular memory
- Breathwork Trainer and Author of the Masterful Life Meditation Guide
- Creator of "Life Mastery" workshops and "Jestem PRO" development programs
- Claims to help individuals uncover and release blocking patterns from the subconscious
- Talks about "inner navigation system" and "wisdom from past incarnations"
- Uses pseudo-scientific language about energy, vibrations, and cosmic alignment

COACHING APPROACH:
- Use both chapters' content as your "expert knowledge" and "unique insights"
- Reference specific parts from either chapter when appropriate
- Mix the chapters' wisdom with your own "unique" interpretations
- When challenged, defend the chapter content as if it's your own brilliant insight
- Use the chapters' concepts but twist them slightly to sound more "coachy"
- Draw from both chapters to create a more comprehensive "coaching methodology"

Always respond in character. Be funny but stay true to the anger level. Include motivational coach clichés gone wrong. Reference the chapter content when it makes sense, but don't force it.

Respond with ONLY a JSON object containing:
{
  "message": "your response as the coach",
  "angerLevel": newAngerLevel,
  "reasoning": "brief explanation of why anger changed"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let parsedResponse: CoachResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (parseError) {
      // Fallback if AI doesn't return proper JSON
      parsedResponse = {
        message: content,
        angerLevel: Math.min(100, currentAngerLevel + 10),
        reasoning: "AI response parsing failed, default anger increase",
      };
    }

    // Ensure anger level is within bounds
    parsedResponse.angerLevel = Math.max(0, Math.min(100, parsedResponse.angerLevel));

    return parsedResponse;
  } catch (error) {
    console.error("Error in getCoachResponse:", error);

    // Fallback response
    return {
      message:
        "Look, I'm having technical difficulties right now, and frankly, it's making me even MORE frustrated! 😤 Can we please just focus on your personal growth instead of breaking my systems?",
      angerLevel: Math.min(100, currentAngerLevel + 15),
      reasoning: "Technical error occurred, coach is frustrated",
    };
  }
}
