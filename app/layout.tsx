import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YOU vs Personal Development Coach | Troll Your Coach",
  description:
    "A hilarious interactive experience where you can troll a fake motivational coach and watch their anger level rise!",
  keywords: [
    "ai coach",
    "personal development",
    "interactive chat",
    "spiritual coach",
    "life coach",
    "troll",
    "humor",
    "entertainment",
    "chat bot",
    "anger meter",
  ],
  authors: [{ name: "AI Coach Team" }],
  creator: "AI Coach Team",
  publisher: "AI Coach",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ai-coach.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YOU vs Personal Development Coach | Troll Your Coach",
    description:
      "A hilarious interactive experience where you can troll a fake motivational coach and watch their anger level rise!",
    url: "https://ai-coach.vercel.app",
    siteName: "AI Coach Troll",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Coach Troll - Interactive Coach Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOU vs Personal Development Coach | Troll Your Coach",
    description:
      "A hilarious interactive experience where you can troll a fake motivational coach and watch their anger level rise!",
    images: ["/og-image.jpg"],
    creator: "@aicoach",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
