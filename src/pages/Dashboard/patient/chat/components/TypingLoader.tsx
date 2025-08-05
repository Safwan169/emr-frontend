import React from 'react';

const TypingLoader: React.FC = () => {
  return (
    <div className="flex gap-1 items-center mb-2">
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingLoader;