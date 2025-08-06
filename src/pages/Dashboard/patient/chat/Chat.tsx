// src/pages/Chat.tsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TypingLoader from './components/TypingLoader';
import ChatBubble from './components/ChatBubble';
import MessageCircle, { MessageCircleCode, Send } from 'lucide-react';
const quickQuestions = [
  "What are the symptoms of flu?",
  "How to reduce fever?",
  "Can I take paracetamol?",
  "What are COVID symptoms?",
  "When should I see a doctor?",
  "What causes headaches?"
];

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await axios.post('https://office-shellow-emr.onrender.com/chat', {
        message: text
      });

      const aiMsg: Message = {
        text: res.data.response || 'Sorry, I didn’t get that.',
        sender: 'ai'
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        text: 'AI server error. Please try again later.',
        sender: 'ai'
      }]);
    }
    setLoading(false);
  };

  const handleQuickClick = (question: string) => sendMessage(question);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="p-4 md:p-6 flex flex-col h-screen bg-gray-50">
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-3">Quick Questions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuickClick(q)}
              className="p-3 border rounded-lg text-left hover:bg-blue-50 transition text-sm"
            >
              <MessageCircleCode className='text-blue-700 mb-2' />{q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1  mb-4 border p-4 rounded-lg bg-white shadow-inner">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} text={msg.text} sender={msg.sender} markdown={msg.sender === 'ai'} />
        ))}
        {loading && <TypingLoader />}
        <div ref={chatEndRef}></div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
        <input
          className="flex-1 border px-4 py-2 rounded-md focus:outline-none shadow-sm"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;