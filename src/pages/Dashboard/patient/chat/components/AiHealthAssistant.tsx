import React from "react";

const categories: string[] = [
  "Symptoms",
  "Medications",
  "Health Tips",
  "Emergency",
  "Nutrition",
];

const AiHealthAssistant: React.FC = () => {
  return (
    <div className="w-full max-w-[1376px] bg-[#f9f9ff] p-4 sm:p-5 rounded-xl flex flex-col space-y-4 mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full overflow-hidden">
          <img
            src="/path/to/your/image.png" // replace with your image path
            alt="AI Assistant"
            className="w-5 h-5 object-contain"
          />
        </div>
        <h2 className="text-gray-800 font-semibold text-lg">AI Health Assistance</h2>
      </div>

      {/* Message + Categories */}
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
  );
};

export default AiHealthAssistant;
