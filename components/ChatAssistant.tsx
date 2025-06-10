'use client';

import { useState } from 'react';

type Message = { from: 'user' | 'bot'; text: string };

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user' as const, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/food-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const { reply } = await res.json();
      setMessages((msgs) => [...msgs, { from: 'bot', text: reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Oops, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md border rounded-lg p-4 bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Food Assistant</h2>
      <div className="h-64 overflow-y-auto mb-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${msg.from === 'user' ? 'bg-gray-100 self-end' : 'bg-blue-50 self-start'}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">Bot is typing...</p>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-grow border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me about the menu..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-black text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
