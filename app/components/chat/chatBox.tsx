"use client";

import { useState } from "react";

type Message = {
  role: "customer" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Chào bạn! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "customer", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col">
      <div className="p-4 font-semibold border-b">AI Assistant</div>

      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              m.role === "customer"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-100"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-400">Đang trả lời...</div>
        )}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
