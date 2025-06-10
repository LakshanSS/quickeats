import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const bodyText = await req.text();

    const { items } = JSON.parse(bodyText);
    const itemList = items.map((item: any) => item.name).join(", ");
    const prompt = `Write a warm, friendly order confirmation message in a casual tone. The user just ordered: ${itemList}. 
Make it sound delightful, creative, and human-like. Mention the items in a fun way, and keep it under 40 words.`;
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
      model: "gpt-4.1",
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

    return NextResponse.json(
      { error: "Failed to generate order summary. Please try again later." },
      { status: 500 }
    );
  }
}
