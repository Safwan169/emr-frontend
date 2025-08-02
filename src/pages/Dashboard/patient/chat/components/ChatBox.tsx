import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Send, Image as ImageIcon, Paperclip, Smile } from "lucide-react";

type Message = {
  text: string;
  sender: "user" | ""; // you had sender as "user" or empty string
};

const ChatBox: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (selectedMessage.trim()) {
      const newMessage: Message = { text: selectedMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setSelectedMessage("");

      setTimeout(() => {
        const aiReply: Message = { text: ` "${newMessage.text}"`, sender: "" };
        setMessages((prevMessages) => [...prevMessages, aiReply]);
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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1376px] px-2 sm:px-4">
      {/* Chat Messages Container (Hidden until first message) */}
      {messages.length > 0 && (
        <div className="mb-3 w-full">
          <div className="h-40 sm:h-32 w-full overflow-y-auto p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 px-3 py-2 text-sm rounded-lg max-w-[70%] break-words
                  ${msg.sender === "user"
                    ? "bg-blue-100 text-blue-800 self-start"
                    : "bg-green-100 text-green-800 self-end ml-auto text-right"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Auto-scroll target */}
          </div>
        </div>
      )}

      {/* Input and Buttons */}
      <div className="flex items-center space-x-2 sm:space-x-3 w-full">
        {/* Input Box */}
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
            aria-label="Upload image"
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
            aria-label="Upload file"
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

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-lg shadow-sm transition"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
