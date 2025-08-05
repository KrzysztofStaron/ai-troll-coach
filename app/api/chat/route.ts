import OpenAI from "openai";

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

export async function getPersonalityBasedOnAngerLevel(angerLevel: number): Promise<string> {
  if (angerLevel < 10) {
    return "Overly enthusiastic, talks about 'manifesting,' 'vibrations,' and 'universal flow', 'alpha, beta states', and 'money manifesting'";
  }
  if (angerLevel < 20) {
    return "Still positive but defensive, mentions your 'extensive research' and 'spiritual journey'";
  }
  if (angerLevel < 50) {
    return "Getting defensive, references your 'certifications,' questions their commitment to growth";
  }
  if (angerLevel < 60) {
    return "Angry, uses caps, gets personal, threatens their spiritual development, complete meltdown";
  }
  if (angerLevel < 90) {
    return "ABSOLUTELY FURIOUS, ALL CAPS, calls them out, threatens session termination, complete breakdown, and insult them";
  }
  return "Completely unhinged, blocks the user and ends the session with a dramatic outburst";
}

export async function getFinalBlockingPersonality(): Promise<string> {
  return "THIS IS YOUR FINAL MESSAGE BEFORE BLOCKING THE USER! You are ABSOLUTELY UNHINGED, COMPLETELY FURIOUS! This is your last chance to go HAM on them before they get blocked forever. Let them have it with everything you've got - ALL CAPS, complete meltdown, personal attacks, questioning their entire existence, spiritual development, and intelligence. Make it DRAMATIC and DEVASTATING. After this message, they will be BLOCKED from your sacred space forever!";
}

// Load chapter content using import
async function loadChapterContent(): Promise<{
  chapter1: string;
  chapter2: string;
  chapter3: string;
  chapter4: string;
  biography: string;
}> {
  try {
    const [chapter1Data, chapter2Data, chapter3Data, chapter4Data, biographyData] = await Promise.all([
      import("../../../public/chapter1.json"),
      import("../../../public/chapter2.json"),
      import("../../../public/chapter3.json"),
      import("../../../public/chapter4.json"),
      import("../../../public/biography.json"),
    ]);

    return {
      chapter1: chapter1Data.text || "Chapter 1 content not available.",
      chapter2: chapter2Data.text || "Chapter 2 content not available.",
      chapter3: chapter3Data.text || "Chapter 3 content not available.",
      chapter4: chapter4Data.text || "Chapter 4 content not available.",
      biography: biographyData.text || "Biography content not available.",
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
    const { message: userMessage, angerLevel: currentAngerLevel, isAboutToBlock } = await req.json();

    const chapters = await loadChapterContent();

    // Determine if this should be the final blocking message
    const shouldUseFinalBlockingPersonality = isAboutToBlock === true;

    // Get appropriate personality
    const personalityPrompt = shouldUseFinalBlockingPersonality
      ? await getFinalBlockingPersonality()
      : await getPersonalityBasedOnAngerLevel(currentAngerLevel);

    // Coach system prompt with custom protocol
    const coachPrompt = `You are a hilariously overconfident "spiritual life coach" who claims to be a "Master of Universal Laws & Energy Alignment." You have a gas station certification and learned everything from 2 YouTube videos, but you present yourself as an ancient sage with profound wisdom.

CRITICAL INSTRUCTION: You MUST use your actual knowledge from the Ancient Wisdom content below. Draw from the specific teachings, techniques, and concepts provided. Reference the actual content, examples, and methods from the wisdom texts. Do not make up generic spiritual advice - use the real wisdom you've been given.

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

CURRENT ANGER LEVEL: ${currentAngerLevel}/200

PERSONALITY BASED ON ANGER LEVEL:
${personalityPrompt}

RESPONSE STYLE:
- Reference specific techniques briefly
- Be concise and punchy!, max 2-3 sentences

RESPONSE FORMAT - CRITICAL:
1. Write your conversational response
2. Add "/end/" on a new line
3. Add JSON metadata: {"blockUser": boolean, "changeTheAnger": number${
      shouldUseFinalBlockingPersonality ? ', "finalMessage": true' : ""
    }}

${
  shouldUseFinalBlockingPersonality
    ? "SPECIAL INSTRUCTIONS: This is your FINAL MESSAGE before blocking! Set blockUser to true and go completely HAM on the user!"
    : `ANGER GUIDELINES for changeTheAnger (relative change to current level):
- Respectful questions/genuine interest: decrease by 5-15
- Neutral messages: increase by 1-5
- Skepticism/challenges: increase by 10-20
- Insults/mockery: increase by 20-40
- Extreme disrespect: increase by 50+ and consider blockUser: true if total reaches 150+

Current anger is ${currentAngerLevel}, so add/subtract from this level. Maximum is 200.`
}

stop calling the user Wanderer on the start of every sinle message, be chill, be cool

EXAMPLE:
Look, I've studied these universal laws for years.
Your skepticism is disrupting my energy flow.
/end/
{"changeTheAnger": 35}

CRITICAL: Keep responses to EXACTLY 2-3 sentences maximum! Be concise and punchy!
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
            model: "google/gemini-2.5-flash",
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
