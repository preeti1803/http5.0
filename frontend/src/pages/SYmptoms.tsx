import React, { useState } from "react";
import { Mic, Send, PhoneCall, Hospital, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  sender: "ai" | "user";
  text: string;
}

const Symptomps: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "👋 Hello! Tell me your symptoms, or tap the mic to speak." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I understand. Please provide more details." },
      ]);
    }, 1000);
  };

  const handleMic = () => {
    navigate("/voice-input")
   
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 text-lg font-bold flex items-center justify-between rounded-t-2xl">
          <span>🩺 Voice Assistant</span>
          <button className="text-sm bg-white text-green-700 px-2 py-1 rounded" onClick={() => navigate("/voice-input")}>Back</button>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 border-t">
          <button className="flex flex-col items-center justify-center p-3 bg-red-100 text-red-600 rounded-lg font-bold">
            <PhoneCall className="w-6 h-6 mb-1" /> Emergency
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-lg font-bold">
            <Hospital className="w-6 h-6 mb-1" /> Hospital
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-green-100 text-green-600 rounded-lg font-bold">
            <BookOpen className="w-6 h-6 mb-1" /> First Aid
          </button>
        </div>

        {/* Input Section */}
        <div className="flex items-center p-3 bg-white border-t rounded-b-2xl">
          <button
            onClick={handleMic}
            className="p-3 bg-green-500 text-white rounded-full mr-2"
          >
            <Mic className="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Type your symptoms..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="ml-2 p-3 bg-blue-500 text-white rounded-full"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Symptomps;
