import React from "react";
import { useLocation } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../../../redux/features/user/userApi";

interface Vital {
  name: string;
  value: string;
}

const PatientVital: React.FC = () => {
  // Sample patient vitals
 


    const location = useLocation();
    const userId = location?.state || ""; // Safe access
  
    const { data: userResponse, isLoading: isUserLoading } = useGetUserByIdQuery(userId);


    const user = userResponse?.data;


     const vitals: Vital[] = [
    { name: "Blood Pressure", value: `${user?.blood_pressure?`${user?.blood_pressure} mmHg`:'N/A'} ` },
    { name: "Heart Rate", value: `${user?.heart_bit_rate?`${user?.heart_bit_rate} bpm` :'N/A'} ` },
    { name: "Temperature", value: `${user?.temperature?`${user?.temperature} °C` :'N/A'} ` },
    { name: "Weight", value: `${user?.weight_lbs ?`${user?.weight_lbs} kg`:'N/A'} ` },
  ];

    console.log(user,'tadfasdfad')


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
