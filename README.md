# 🤖 AI Coach - Interactive Spiritual Guru Experience

A hilarious interactive web application where you can troll a fake motivational coach and watch their anger level rise in real-time! Experience the most authentically unqualified spiritual guru who learned everything from 2 YouTube videos and a gas station certification.

![AI Coach Demo](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-05%20at%2014-04-00%20YOU%20vs%20Personal%20Development%20Coach%20Troll%20Your%20Coach-wJSmpEkuULSTFS0iW1NqIe1q3yAuH1.png)

## ✨ Features

### 🎭 Dynamic Personality System

- **Progressive Anger Levels**: Watch the coach transform from enlightened master to cosmic chaos
- **Real-time Personality Changes**: 7 different emotional states based on anger level (0-200)
- **Authentic Spiritual Buzzwords**: "Vibrations," "energy flow," "cosmic alignment," and more

### 🎯 Interactive Experience

- **Real-time Chat Interface**: Stream responses with custom protocol parsing
- **Anger Meter Visualization**: Visual progress bar showing coach's emotional state
- **Blocking System**: Push too far and get blocked when anger reaches 150+

### 🎨 Beautiful UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animated Transitions**: Smooth personality state changes
- **Modern Components**: Built with shadcn/ui components
- **Gradient Backgrounds**: Beautiful visual design without blue-purple gradients

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **AI Integration**: OpenAI API via OpenRouter
- **Icons**: Lucide React
- **Markdown**: React Markdown for message rendering

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-coach.git
   cd ai-coach
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable             | Description                                 | Required |
| -------------------- | ------------------------------------------- | -------- |
| `OPENROUTER_API_KEY` | Your OpenRouter API key for AI model access | Yes      |

### AI Model Configuration

The application uses Google's Gemini 2.5 Flash model via OpenRouter for optimal performance and cost-effectiveness.

## 🎮 How to Use

1. **Landing Page**: Visit the homepage to see the coach's transformation animation
2. **Start Session**: Click "Start Session" or "Challenge the Master" to begin
3. **Chat Interface**: Interact with the AI coach through the chat interface
4. **Watch the Anger Rise**: Observe how the coach's personality changes based on your messages
5. **Push the Limits**: Try to get the coach angry enough to block you (requires 150+ anger level)

## 🧠 AI Personality System

### Anger Level Ranges

| Level   | State     | Personality                                                    |
| ------- | --------- | -------------------------------------------------------------- |
| 0-10    | Calm      | Overly enthusiastic, talks about manifesting and vibrations    |
| 10-20   | Serious   | Still positive but defensive, mentions "extensive research"    |
| 20-50   | Disgusted | Getting defensive, references certifications, starts to insult |
| 50-70   | Angry     | Uses caps, gets personal, threatens spiritual development      |
| 70-100  | Furious   | ALL CAPS, calls them out, threatens session termination        |
| 100-150 | Unhinged  | Complete breakdown, dramatic outbursts                         |
| 150+    | Blocking  | Can block users and end sessions                               |

### Blocking System

- **Minimum Threshold**: Coach can only block users when anger level reaches 150+
- **Server-side Enforcement**: Prevents AI from circumventing the blocking rules
- **Session Termination**: Blocked users get a dramatic final message

## 📁 Project Structure

```
ai-coach/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat API endpoint
│   ├── app/
│   │   └── page.tsx              # Main chat interface
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── AngerDebug.tsx
│   ├── AngerMeter.tsx
│   ├── ChatMessage.tsx
│   ├── CoachHeader.tsx
│   └── EasterEgg.tsx
├── lib/
│   ├── chat-actions.ts           # Chat-related utilities
│   ├── coach-personality.ts      # AI personality functions
│   └── utils.ts                  # General utilities
├── public/
│   ├── biography.json            # Coach biography content
│   ├── chapter1-4.json          # Spiritual wisdom content
│   └── 1-4.jpg                  # Coach personality images
└── hooks/                        # Custom React hooks
```

## 🎨 Customization

### Modifying AI Personality

Edit `lib/coach-personality.ts` to customize the coach's personality responses:

```typescript
export async function getPersonalityBasedOnAngerLevel(angerLevel: number): Promise<string> {
  if (angerLevel < 10) {
    return "Your custom personality for low anger levels";
  }
  // ... customize other anger levels
}
```

### Adding New Content

1. **Wisdom Content**: Add new JSON files in `public/` with spiritual content
2. **Personality Images**: Replace images in `public/` to change the coach's appearance
3. **UI Components**: Extend the component library in `components/ui/`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Set Environment Variables**: Add `OPENROUTER_API_KEY` in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy your app

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the AI models
- **OpenRouter** for cost-effective API access
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for utility-first styling
- **Next.js** for the amazing React framework

## 🐛 Known Issues

- The coach may occasionally try to block users below the 150 anger threshold (server-side enforcement prevents this)
- Some spiritual buzzwords may be repeated in responses
- The AI model occasionally forgets to use the custom response format

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ai-coach/issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Disclaimer**: This is a satirical application meant for entertainment purposes. It parodies the spiritual coaching industry and is not affiliated with any actual spiritual masters, gas stations, or YouTube universities. 😄
