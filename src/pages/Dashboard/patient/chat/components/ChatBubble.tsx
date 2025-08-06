// src/components/ChatBubble.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  text: string;
  sender: 'user' | 'ai';
  markdown?: boolean;
}

const ChatBubble: React.FC<Props> = ({ text, sender, markdown = false }) => {
  return (
    <div className={`mb-3 flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${sender === 'user' ? 'max-w-[80%]' : 'w-full'}  p-3 rounded-lg shadow text-sm whitespace-pre-wrap ${
          sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        {markdown ? <ReactMarkdown>{text}</ReactMarkdown> : text}
      </div>
    </div>
  );
};

export default ChatBubble;
