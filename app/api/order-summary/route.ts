// app/api/order-summary/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const bodyText = await req.text(); // Read raw body

    const { items } = JSON.parse(bodyText);
    const itemList = items.map((item: any) => item.name).join(", ");
    const prompt = `Generate a short and friendly order confirmation message for these items: ${itemList}. Keep it under 30 words.`;
    const chatResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful food ordering assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4.1-nano",
    });

    const summary = chatResponse.choices[0].message.content;
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("GPT error:", error);

    // Handle OpenAI rate limit specifically
    if (error.status === 429 || error?.response?.status === 429) {
      console.warn("OpenAI rate limit hit.");
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to generate order summary. Please try again later." },
      { status: 500 }
    );
  }
}
