import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: 'You are a friendly food assistant for QuickEats.' },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('Chatbot error:', err);
    return NextResponse.json({ reply: "Sorry, I can't answer right now." }, { status: 500 });
  }
}
