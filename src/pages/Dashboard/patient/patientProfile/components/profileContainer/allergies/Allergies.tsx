import React, { useState } from "react";
import { AlertTriangle, Phone } from "lucide-react";
import AllergyModal from "../../../../../../../components/modals/AllergyModal";
import { useGetallergiesByUserIdQuery } from "../../../../../../../redux/features/allergies/allergiesApi";

const Allergies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = JSON.parse(localStorage.getItem("profileInfo") || "{}");

  const {
    data: allergiesData,
    isLoading,
    isError,
  } = useGetallergiesByUserIdQuery(userId);

  const allergies = allergiesData ?? [];

  // Helper for dynamic color
  const getSeverityColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "severe":
        return "red";
      case "moderate":
        return "orange";
      case "mild":
      default:
        return "green";
    }
  };

  return (
    <div className="mx-auto p-6 min-h-screen">
      <AllergyModal
        userId={userId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Allergies & Sensitivities
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
        >
          + Add Allergies
        </button>
      </div>

      {/* Medical Alert */}
      <div className="bg-red-50 border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="bg-red-600 text-white rounded-full p-1 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-1">Medical Alert</h3>
            <p className="text-red-700 text-sm">
              {isLoading
                ? "Loading allergies..."
                : isError
                ? "Error loading allergy data."
                : `This patient has ${allergies.length} ${
                    allergies.length === 1 ? "allergy" : "allergies"
                  }. Always verify allergies before prescribing medications or treatments.`}
            </p>
          </div>
        </div>
      </div>

      {/* Allergies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {allergies?.map((allergy: any) => {
          const color = getSeverityColor(allergy.condition);
          return (
            <div
              key={allergy.id}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`bg-${color}-600 text-white rounded-full p-1`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {allergy.allergy_name}
                  </h3>
                </div>
                <span
                  className={`bg-${color}-100 text-${color}-800 px-2 py-1 rounded-full text-xs font-medium`}
                >
                  {allergy.condition}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3">
                {allergy.allergy_type}
              </p>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Reaction</span>
                  <p className="text-gray-800">{allergy.reactions}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-gray-500">Date Identified</span>
                    <p className="text-gray-800">
                      {new Date(allergy.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status</span>
                    <p className="text-gray-800">
                      {allergy.status?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Notes</span>
                  <p className="text-gray-800">{allergy.note}</p>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-200">
                  Edit
                </button>
                <button className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-200">
                  Share with Doctor
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Information */}
      <div className="bg-[#F5F5F5] rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-gray-800">Emergency Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-gray-500 text-sm">
                Emergency Contact: Jane Smith (Wife)
              </span>
              <p className="text-gray-800">Phone: +880 16 9231 1409</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">
                Relationship: Spouse
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Change Laboratory
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-gray-500 text-sm">
                Medical Alert ID: #SM-12345
              </span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Blood Group: O+</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">
                Insurance: Startsmartz Premium Plan
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allergies;
