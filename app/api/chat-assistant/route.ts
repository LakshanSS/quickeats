import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { menuItems } from "@/lib/menu";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const body = await req.json();
  const { messages } = body;

  // Convert menu items into a string format
  const menuText = menuItems
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} - ${
          item.description
        } ($${item.price.toFixed(2)})`
    )
    .join("\n");

  const systemMessage = `
You are a helpful food ordering assistant for QuickEats.
Use the following menu to guide users:

${menuText}
`;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        ...messages.map((msg: any) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      ],
    });

    const reply = chatResponse.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("GPT assistant error:", error);
    return NextResponse.json(
      { reply: "Sorry, I'm having trouble assisting you right now." },
      { status: 500 }
    );
  }
}
