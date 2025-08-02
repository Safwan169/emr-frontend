import React from "react";

const questions: string[] = [
  "What motivates you the most?",
  "What's your favorite hobby?",
  "If you could visit any country, where would you go?",
  "What's your dream job?",
  "What's a skill you want to learn?",
  "What's the best advice you've ever received?",
];

const ChatBot: React.FC = () => {
  return (
    <div className="w-full max-w-[1376px] h-[345px] border border-gray-200 rounded-xl p-6 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-6 sm:grid-rows-3 gap-4 h-full place-content-center">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex flex-col justify-center rounded-lg border border-gray-200 p-4 bg-white hover:shadow-xl transition"
          >
            <img
              src="/public/messages.png"
              alt="Question Icon"
              className="w-8 h-8 mb-5 object-cover"
            />
            <p className="text-gray-700 text-sm">{question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBot;
