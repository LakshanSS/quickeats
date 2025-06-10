import { NextResponse } from "next/server";
import OpenAI from "openai";
import { menuItems } from "@/lib/menu";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY is not set!");
  } else {
    console.log("OPENAI_API_KEY found! Key starts with:", process.env.OPENAI_API_KEY.substring(0, 5) + '...')
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const { lastOrder } = await req.json();

    const previous =
      lastOrder?.map((item: any) => item.name).join(", ") ||
      "no previous orders";
    const menuList = menuItems
      .map((item) => `${item.name}: ${item.description}`)
      .join("\n");

    const prompt = `
You are a food assistant for an app. Based on this past order: ${previous}, suggest 1-2 new items from the menu below.

Menu:
${menuList}

Respond with a short and friendly message under 30 words.
`;

    const chatResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful food recommendation assistant.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-4.1",
    });

    const summary = chatResponse.choices[0].message.content;
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Recommendation API Error:", error);
    return NextResponse.json({ summary: null }, { status: 500 });
  }
}
