import React, { useState } from "react";
import {  Mic, Printer } from "lucide-react";

const ConsultationN: React.FC = () => {
  const [notes, setNotes] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");

  const handleVoiceToText = (): void => {
    alert("Voice-to-text feature coming soon!");
  };

  return (
    <div className="w-full h-auto rounded-lg bg-white">
      <div className="py-5 px-5">
        {/* Main Section Styled like AppointDet */}
        <div className="w-full h-auto border border-gray-200 rounded-lg p-5 bg-white">
          {/* Section Heading inside card */}
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Consultation Notes
          </h2>
          <hr className="mb-4 border-gray-200" />

          {/* Notes Textarea */}
          <div className="border border-gray-200 rounded-lg bg-white p-4 mb-4">
            <textarea
              className="w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              placeholder="Write consultation notes..."
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNotes(e.target.value)
              }
            ></textarea>
          </div>

          {/* Voice to Text Button */}
          <button
            className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition mb-6"
            onClick={handleVoiceToText}
          >
            <Mic className="w-5 h-5" />
            Voice to Text
          </button>

          {/* E-Prescription Section */}
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            E-Prescription
          </h2>

          <div className="border border-gray-200 rounded-lg bg-white p-4 mb-4">
            <textarea
              className="w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              placeholder="Write e-prescription or use voice-to-text..."
              value={prescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPrescription(e.target.value)
              }
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex items-center justify-center px-8 py-4 bg-blue-900 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-800 transition">
              Save & Continue
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-300 text-blue-800 text-sm font-medium rounded-lg shadow hover:bg-gray-400 transition">
              <Printer className="w-5 h-5" />
              Print Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationN;
