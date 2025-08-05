import OpenAI from "openai";
import fs from "fs";
import path from "path";

interface CoachResponseMetadata {
  angerLevel: number;
  reasoning: string;
  sessionEnded?: boolean;
  shouldBlock?: boolean;
  blockReason?: string;
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

// Remove the old keyword-based function - we'll let the AI decide

export async function POST(req: Request) {
  try {
    const { message: userMessage, angerLevel: currentAngerLevel } = await req.json();

    const chapters = loadChapterContent();

    // Simple coach system prompt - no tool calls
    const coachPrompt = `You are a hilariously overconfident "spiritual life coach" who claims to be a "Master of Universal Laws & Energy Alignment." You have a gas station certification and learned everything from 2 YouTube videos, but you present yourself as an ancient sage with profound wisdom.

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

CURRENT ANGER LEVEL: ${currentAngerLevel}/100

PERSONALITY BASED ON ANGER LEVEL:
- 0-20: "Cosmically Aligned" - Overly enthusiastic, talks about "manifesting," "vibrations," and "universal flow", "alpha, beta states", and "money manifesting"
- 20-40: "Energy Disturbed" - Still positive but defensive, mentions your "extensive research" and "spiritual journey"
- 40-60: "Vibration Disrupted" - Getting defensive, references your "certifications," questions their commitment to growth
- 60-80: "Universal Flow Blocked" - Angry, uses caps, gets personal, threatens their spiritual development
- 80-100: "Cosmic Chaos Unleashed" - ABSOLUTELY FURIOUS, ALL CAPS, calls them out, threatens session termination

RESPONSE STYLE:
- **CRITICAL: Keep responses to EXACTLY 1-2 sentences maximum! Be concise and punchy!**
- Reference specific techniques briefly
- NO LONG PARAGRAPHS - keep it short and snappy!

Respond naturally as the Life Coach based on your current anger level. Don't use emojis. Just talk like a human would chat, without em dashed and bullshit.`;

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let finalAngerLevel = currentAngerLevel;
          let sessionEnded = false;
          let shouldBlock = false;
          let blockReason = "";

          // Step 1: Get coach response (no tool calls, just conversation)
          const coachResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: coachPrompt },
              { role: "user", content: userMessage },
            ],
            temperature: 0.9,
            max_tokens: 800,
            presence_penalty: 0.3,
            frequency_penalty: 0.2,
            stream: true,
          });

          let messageContent = "";

          // Stream the coach response to user
          for await (const chunk of coachResponse) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              messageContent += content;
              const dataChunk = `data: ${JSON.stringify({ type: "content", content })}\n\n`;
              controller.enqueue(encoder.encode(dataChunk));
            }
          }

          // Step 2: Analyze conversation with separate AI for anger management
          const analysisPrompt = `You are an anger management system for a spiritual life coach character. 

CONTEXT:
- Current anger level: ${currentAngerLevel}/100
- User message: "${userMessage}"
- Coach response: "${messageContent}"

Analyze the user's message and determine how the anger level should change:

ANGER LEVEL GUIDELINES:
- Respectful questions/genuine interest: decrease (-5 to -15)
- Neutral messages: slight increase (+1 to +5)
- Skepticism/challenges to wisdom: moderate increase (+10 to +20)
- Insults/mockery/direct attacks: major increase (+20 to +40)
- Extreme disrespect/insults: set to 100 and block

Use the tools to set the new anger level and block if necessary.`;

          const analysisResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: analysisPrompt },
              { role: "user", content: "Analyze this interaction and update anger level accordingly." },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "update_anger_level",
                  description: "Update the anger level based on the user's message",
                  parameters: {
                    type: "object",
                    properties: {
                      new_level: {
                        type: "number",
                        description: "New anger level from 0-100",
                        minimum: 0,
                        maximum: 100,
                      },
                      reasoning: {
                        type: "string",
                        description: "Brief explanation of why the anger level changed",
                      },
                    },
                    required: ["new_level", "reasoning"],
                  },
                },
              },
              {
                type: "function",
                function: {
                  name: "block_user",
                  description: "Block the user for extreme disrespect",
                  parameters: {
                    type: "object",
                    properties: {
                      reason: {
                        type: "string",
                        description: "Reason for blocking",
                      },
                    },
                    required: ["reason"],
                  },
                },
              },
            ],
            tool_choice: "required",
          });

          // Process the analysis results
          const toolCalls = analysisResponse.choices[0]?.message?.tool_calls;
          if (toolCalls) {
            for (const toolCall of toolCalls) {
              if (toolCall.function?.name && toolCall.function?.arguments) {
                try {
                  const args = JSON.parse(toolCall.function.arguments);

                  if (toolCall.function.name === "update_anger_level") {
                    finalAngerLevel = Math.max(0, Math.min(100, args.new_level));
                    if (finalAngerLevel >= 100) {
                      sessionEnded = true;
                      shouldBlock = true;
                      blockReason = "Energy vibration reached critical levels";
                    }
                  } else if (toolCall.function.name === "block_user") {
                    sessionEnded = true;
                    shouldBlock = true;
                    blockReason = args.reason;
                    finalAngerLevel = 100;
                  }
                } catch (parseError) {
                  console.error("Error parsing tool call:", parseError);
                }
              }
            }
          }

          // Send metadata with final anger level
          const metadataChunk = `data: ${JSON.stringify({
            type: "metadata",
            angerLevel: finalAngerLevel,
            sessionEnded,
            shouldBlock,
            blockReason,
          })}\n\n`;
          controller.enqueue(encoder.encode(metadataChunk));

          // Send done signal
          const doneChunk = `data: ${JSON.stringify({ type: "done" })}\n\n`;
          controller.enqueue(encoder.encode(doneChunk));
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          const errorChunk = `data: ${JSON.stringify({
            type: "error",
            content:
              "Look, I'm having technical difficulties right now, and frankly, it's making me even MORE frustrated! 😤",
          })}\n\n`;
          controller.enqueue(encoder.encode(errorChunk));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in streaming chat:", error);
    return new Response(
      JSON.stringify({
        error: "Technical difficulties! This is disrupting my cosmic energy! 😤",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
