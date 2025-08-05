# 🤬 AI Coach Troll Website

A hilarious website where you can troll an AI "motivational coach" and watch their anger level rise! The coach gets progressively more frustrated as you challenge their credentials, question their methods, or just be generally skeptical.

## ✨ Features

- **Progressive Anger System**: Coach gets angrier as you troll them
- **Dynamic Personality**: Coach's responses change based on anger level
- **Visual Feedback**: Anger meter, emoji changes, screen shake effects
- **Quick Troll Buttons**: Pre-made messages to get the coach riled up
- **Easter Eggs**: Special effects when you completely break the coach
- **Debug Mode**: See the AI's reasoning in development

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
```

Get your OpenRouter API key from: https://openrouter.ai/

### 3. Run the Development Server

```bash
pnpm dev
```

### 4. Start Trolling! 😈

Visit `http://localhost:3000` and start challenging the coach!

## 🎯 How to Troll Effectively

### Quick Troll Messages:

- "Where did you get your degree?"
- "Do you have any actual qualifications?"
- "This sounds like a scam"
- "Can you prove this works?"
- "I've heard this before on YouTube"

### Coach Anger Levels:

- **0-20**: Zen & Enlightened 🧘‍♂️
- **20-40**: Slightly Concerned 😐
- **40-60**: Getting Frustrated 😤
- **60-80**: Pretty Annoyed 😠
- **80-100**: Absolutely Furious 🤬

## 🛠️ Tech Stack

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **OpenAI API** via OpenRouter
- **shadcn/ui** components
- **Lucide React** icons

## 🎨 Features

- **Responsive Design**: Works on mobile and desktop
- **Real-time Chat**: Instant responses from the AI coach
- **Anger Visualization**: Visual anger meter and effects
- **Quick Actions**: Pre-made troll messages
- **Session Management**: Reset conversation anytime

## 🐛 Development

The app includes debug information in development mode. You can see:

- AI reasoning for anger changes
- Anger increase/decrease values
- Technical details about responses

## 🎉 Easter Eggs

- **Screen Shake**: When coach gets really angry
- **Fireworks**: When you completely break them (100% anger)
- **Dynamic Headers**: Coach's title changes with anger level
- **Animated Emojis**: Coach's avatar gets more agitated

Have fun trolling! 😈
