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
    <div className="w-full  h-fit border bg-white border-gray-200 rounded-xl p-6 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit  place-content-center">
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
  );
};

export default ChatBot;
