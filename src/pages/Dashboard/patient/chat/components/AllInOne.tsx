import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Send, Image as ImageIcon, Paperclip, Smile } from "lucide-react";

const categories: string[] = [
  "Symptoms",
  "Medications",
  "Health Tips",
  "Emergency",
  "Nutrition",
];

const questions: string[] = [
  "What motivates you the most?",
  "What's your favorite hobby?",
  "If you could visit any country, where would you go?",
  "What's your dream job?",
  "What's a skill you want to learn?",
  "What's the best advice you've ever received?",
];

type Message = {
  text: string;
  sender: "user" | "";
};

const AiHealthAllInOne: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (selectedMessage.trim()) {
      const newMessage: Message = { text: selectedMessage, sender: "user" };
      setMessages((prev) => [...prev, newMessage]);
      setSelectedMessage("");

      setTimeout(() => {
        const aiReply: Message = { text: `AI: "${newMessage.text}"`, sender: "" };
        setMessages((prev) => [...prev, aiReply]);
      }, 1000);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("Image uploaded:", file.name);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("File uploaded:", file.name);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 space-y-8 pb-32">
      {/* ChatBot Questions Grid */}
      <div className="w-full h-fit border bg-white border-gray-200 rounded-xl p-6 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex flex-col justify-center rounded-lg border border-gray-200 p-4 bg-white hover:shadow-xl transition"
            >
              <img
                src="/message.png"
                alt="Question Icon"
                className="w-10 h-10 mb-5 object-cover"
              />
              <p className="text-gray-700 text-sm">{question}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Health Assistant */}
      <div className="w-full bg-[#f9f9ff] rounded-xl flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
            <img
              src="/star.png"
              alt="AI Assistant"
              className="w-8 h-8 object-contain"
            />
          </div>
          <h2 className="text-gray-800 font-semibold text-lg">
            AI Health Assistance
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-3 sm:px-4 py-3 text-gray-700 text-sm flex flex-col">
          <p>
            Hello! I'm your AI medical assistant. I can help you with health
            questions, symptoms, medication information, and general medical
            guidance. How can I assist you today?
          </p>
          <hr className="my-3 border-gray-200" />
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className="px-3 sm:px-4 py-1.5 rounded-md bg-blue-50 text-blue-700 font-medium text-sm hover:bg-blue-100 transition"
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages AFTER both sections, centered */}
      {messages.length > 0 && (
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-4 py-2 text-sm rounded-lg max-w-[70%] break-words
                ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-blue-800 self-start"
                    : "bg-green-100 text-green-800 self-end ml-auto text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Fixed at Bottom, centered */}
      <div className="fixed bottom-0 left-0 w-full bg-transparent shadow-lg">
        <div className="flex justify-center w-full p-2">
          <div className="flex items-center space-x-2 sm:space-x-3 w-full max-w-lg">
            <div className="flex items-center justify-between flex-1 bg-white border border-gray-200 rounded-lg px-2 sm:px-3 py-2 shadow-sm">
              <Smile className="w-5 h-5 text-blue-600 mr-2" />
              <input
                type="text"
                value={selectedMessage}
                onChange={(e) => setSelectedMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={() => imageInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-800 transition ml-1 sm:ml-2"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-800 transition ml-1 sm:ml-2"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-lg shadow-sm transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiHealthAllInOne;
