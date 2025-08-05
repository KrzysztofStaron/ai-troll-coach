import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    openrouter_key_exists: !!process.env.OPENROUTER_API_KEY,
    openrouter_key_length: process.env.OPENROUTER_API_KEY?.length || 0,
    openrouter_key_preview: process.env.OPENROUTER_API_KEY?.substring(0, 10) + "...",
    all_env_vars: Object.keys(process.env).filter(key => key.includes("OPENROUTER") || key.includes("API")),
    node_env: process.env.NODE_ENV,
  });
}
