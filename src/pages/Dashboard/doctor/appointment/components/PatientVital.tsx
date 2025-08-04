import React from "react";

interface Vital {
  name: string;
  value: string;
}

const PatientVital: React.FC = () => {
  // Sample patient vitals
  const vitals: Vital[] = [
    { name: "Blood Pressure", value: "120/80 mmHg" },
    { name: "Heart Rate", value: "78 bpm" },
    { name: "Temperature", value: "98.6°F" },
    { name: "Weight", value: "72 kg" },
  ];

  return (
    <div className="w-full h-auto rounded-lg bg-white">
      <div className="py-5 px-5">
        {/* Patient Vitals Section */}
        <div className="w-full h-auto border border-gray-200 rounded-lg p-5 bg-white">
          {/* Heading */}
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Patient Vital
          </h2>
          <hr className="mb-4 border-gray-200" />

          {/* Vitals Grid */}
          <div className="grid grid-cols-4 gap-4">
            {vitals.map((vital, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white p-4"
              >
                <p className="text-xs text-gray-500">{vital.name}</p>
                <p className="text-lg font-semibold mt-1">{vital.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVital;
