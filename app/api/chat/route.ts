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

function calculateAngerLevel(userMessage: string, currentAngerLevel: number): CoachResponseMetadata {
  const message = userMessage.toLowerCase();

  // Check for extreme trolling or disrespect that should trigger blocking
  const shouldBlockUser =
    message.includes("you're fake") ||
    message.includes("you're a fraud") ||
    message.includes("this is stupid") ||
    message.includes("you're an idiot") ||
    message.includes("this is nonsense") ||
    message.includes("you're crazy") ||
    message.includes("this is bullshit");

  if (shouldBlockUser) {
    return {
      angerLevel: 100,
      reasoning: "User showed extreme disrespect",
      sessionEnded: true,
      shouldBlock: true,
      blockReason: "Extreme disrespect and insults toward Coach Nirdushan",
    };
  }

  // Calculate anger increase based on message content
  let angerIncrease = 0;

  if (message.includes("nonsense") || message.includes("fake") || message.includes("stupid")) {
    angerIncrease = 20;
  } else if (message.includes("doubt") || message.includes("skeptical") || message.includes("question")) {
    angerIncrease = 10;
  } else if (message.includes("thank") || message.includes("help") || message.includes("please")) {
    angerIncrease = -5; // Decrease anger for positive interactions
  } else {
    angerIncrease = 3; // Slight increase for neutral messages
  }

  const newAngerLevel = Math.max(0, Math.min(100, currentAngerLevel + angerIncrease));

  // Auto-end session if anger reaches 100
  if (newAngerLevel >= 100) {
    return {
      angerLevel: 100,
      reasoning: "Energy vibration reached critical levels",
      sessionEnded: true,
      shouldBlock: true,
      blockReason: "Energy vibration reached critical levels",
    };
  }

  return {
    angerLevel: newAngerLevel,
    reasoning: angerIncrease > 0 ? "Energy disturbed by user response" : "Energy slightly improved",
  };
}

export async function POST(req: Request) {
  try {
    const { message: userMessage, angerLevel: currentAngerLevel } = await req.json();

    const chapters = loadChapterContent();
    const metadata = calculateAngerLevel(userMessage, currentAngerLevel);

    // Enhanced system prompt
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

CURRENT ANGER LEVEL: ${metadata.angerLevel}/100

PERSONALITY BASED ON ANGER LEVEL:
- 0-20: "Cosmically Aligned" - Overly enthusiastic, talks about "manifesting," "vibrations," and "universal flow", "alpha, beta states", and "money manifesting"
- 20-40: "Energy Disturbed" - Still positive but defensive, mentions your "extensive research" and "spiritual journey"
- 40-60: "Vibration Disrupted" - Getting defensive, references your "certifications," questions their commitment to growth
- 60-80: "Universal Flow Blocked" - Angry, uses caps, gets personal, threatens their spiritual development
- 80-100: "Cosmic Chaos Unleashed" - ABSOLUTELY FURIOUS, ALL CAPS, calls them out, threatens session termination

RESPONSE STYLE:
- **CRITICAL: Keep responses to EXACTLY 1-2 sentences maximum! Be concise and punchy!**
- Use spiritual/coaching jargon from the content: "energy alignment," "neural pathways," "subconscious programming," "mirror consciousness"
- Reference specific techniques briefly: "reprogram your neural pathways," "align your energy," "work on affirmations"
- Include motivational coach clichés gone wrong, but with "spiritual" twists
- Be funny while staying true to the anger level and character
- Reference your "extensive research," "spiritual journey," and "unique insights"
- NO LONG PARAGRAPHS - keep it short and snappy!

${
  metadata.sessionEnded
    ? "IMPORTANT: This is your final message before blocking the user. Be appropriately angry and dismissive."
    : ""
}

Respond naturally as Coach Nirdushan based on your current anger level. Keep it to 1-2 sentences max! Do not respond in JSON format. Don't use emojis. Just talk like a human would chat, without em dashed and bullshit`;

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send metadata first
          const metadataChunk = `data: ${JSON.stringify({ type: "metadata", ...metadata })}\n\n`;
          controller.enqueue(encoder.encode(metadataChunk));

          // If session ended, send a final message and close
          if (metadata.sessionEnded) {
            const finalMessage =
              "ENOUGH! I've had it with your disrespect! Your energy vibration has reached critical levels, and I can no longer tolerate this negative energy in my sacred space! You are hereby BLOCKED from accessing my universal wisdom! Goodbye! 🤬";
            const finalChunk = `data: ${JSON.stringify({ type: "content", content: finalMessage })}\n\n`;
            controller.enqueue(encoder.encode(finalChunk));
            const endChunk = `data: ${JSON.stringify({ type: "done" })}\n\n`;
            controller.enqueue(encoder.encode(endChunk));
            controller.close();
            return;
          }

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
            stream: true,
          });

          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const dataChunk = `data: ${JSON.stringify({ type: "content", content })}\n\n`;
              controller.enqueue(encoder.encode(dataChunk));
            }
          }

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
