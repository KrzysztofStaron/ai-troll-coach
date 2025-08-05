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

    // Coach system prompt with custom protocol
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

RESPONSE FORMAT - CRITICAL:
1. Write your conversational response
2. Add "/end/" on a new line
3. Add JSON metadata: {"blockUser": boolean, "changeTheAnger": number}

ANGER GUIDELINES for changeTheAnger (absolute level 0-100):
- Respectful questions/genuine interest: decrease current level by 5-15
- Neutral messages: increase current level by 1-5
- Skepticism/challenges: increase current level by 10-20
- Insults/mockery: increase current level by 20-40
- Extreme disrespect: set to 100 and blockUser: true

Current anger is ${currentAngerLevel}, so calculate the new absolute level.

EXAMPLE:
Look, I've studied these universal laws for years.
Your skepticism is disrupting my energy flow.
/end/
{"blockUser": false, "changeTheAnger": 35}

Respond naturally as the Life Coach. Don't use emojis.`;

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let finalAngerLevel = currentAngerLevel;
          let sessionEnded = false;
          let shouldBlock = false;
          let blockReason = "";

          // Get coach response with custom protocol
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

          let fullResponse = "";
          let foundEndMarker = false;
          let contentBuffer = "";

          // Stream the response and parse custom protocol
          for await (const chunk of coachResponse) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              contentBuffer += content;

              // Check if we have complete lines to process
              const lines = contentBuffer.split("\n");

              // Keep the last incomplete line in buffer
              contentBuffer = lines.pop() || "";

              // Process complete lines
              for (const line of lines) {
                if (line.trim() === "/end/") {
                  foundEndMarker = true;
                  break;
                }

                if (!foundEndMarker) {
                  // Stream content line by line
                  const dataChunk = `data: ${JSON.stringify({ type: "content", content: line + "\n" })}\n\n`;
                  controller.enqueue(encoder.encode(dataChunk));
                }
              }

              if (foundEndMarker) break;
            }
          }

          // Process any remaining content in buffer before /end/
          if (!foundEndMarker && contentBuffer.trim()) {
            const dataChunk = `data: ${JSON.stringify({ type: "content", content: contentBuffer })}\n\n`;
            controller.enqueue(encoder.encode(dataChunk));
          }

          // Parse metadata from the response
          if (foundEndMarker) {
            const parts = fullResponse.split("/end/");
            if (parts.length > 1) {
              const jsonPart = parts[1].trim();
              try {
                const metadata = JSON.parse(jsonPart);
                finalAngerLevel = Math.max(0, Math.min(100, metadata.changeTheAnger || currentAngerLevel + 3));
                shouldBlock = metadata.blockUser || false;

                if (shouldBlock) {
                  sessionEnded = true;
                  blockReason = "Life Coach ended the session due to disrespectful energy";
                }
              } catch (parseError) {
                console.error("Error parsing metadata JSON:", parseError);
                // Default fallback
                finalAngerLevel = Math.min(100, currentAngerLevel + 3);
              }
            }
          } else {
            // No /end/ marker found, use default
            finalAngerLevel = Math.min(100, currentAngerLevel + 3);
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
