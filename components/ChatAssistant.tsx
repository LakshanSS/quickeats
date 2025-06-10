"use client";

import { useState } from "react";

type Message = {
  sender: "user" | "assistant";
  text: string;
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hello! Ask me for recommendations or help with your order 😊",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
  
    try {
      const res = await fetch("/api/chat-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
  
      const data = await res.json();
      const assistantReply: Message = { sender: "assistant", text: data.reply };
      setMessages((prev) => [...prev, assistantReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "Sorry, I couldn't respond right now." },
      ]);
    }
  };
  

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            💬 Ask QuickEats AI
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[320px] h-[500px] bg-white border shadow-lg rounded-lg z-50 flex flex-col">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-sm font-bold">QuickEats Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-gray-200 self-end text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 text-sm border rounded"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
