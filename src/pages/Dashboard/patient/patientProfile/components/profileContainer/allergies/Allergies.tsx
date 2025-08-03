import { AlertTriangle, Phone } from "lucide-react";
import { useState } from "react";
import AllergyModal from "../../../../../../../components/modals/AllergyModal";

const allergies = [
  {
    id: 1,
    name: "Penicillin",
    severity: "Severe",
    type: "Medication Allergy",
    reaction: "Anaphylaxis, difficulty breathing, swelling",
    dateIdentified: "01/08/2025",
    status: "Active",
    notes:
      "Immediate reaction within 30 minutes of administration. Use alternative antibiotics.",
  },
  {
    id: 2,
    name: "Latex",
    severity: "Moderate",
    type: "Contact Allergy",
    reaction: "Skin redness, itching, localized swelling",
    dateIdentified: "01/08/2025",
    status: "Active",
    notes:
      "Contact dermatitis with latex gloves. Use nitrile gloves for medical procedures.",
  },
  {
    id: 3,
    name: "Pollen (Ragweed)",
    severity: "Mild",
    type: "Environmental Allergy",
    reaction: "Sneezing, runny nose, itchy eyes",
    dateIdentified: "01/08/2025",
    status: "Active",
    notes:
      "Seasonal allergy, worst during late summer and fall. Responds well to antihistamines.",
  },
];

const Allergies = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (

    <div className="mx-auto p-6 min-h-screen">
      <AllergyModal userId="123" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Allergies & Sensitivities
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}

          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
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
              This patient has {allergies.length} severe allergies. Always
              verify allergies before prescribing medications or treatments.
            </p>
          </div>
        </div>
      </div>

      {/* Allergies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {allergies.map((allergy) => (
          <div
            key={allergy.id}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div
                  className={`bg-${allergy.severity === "Severe"
                      ? "red"
                      : allergy.severity === "Moderate"
                        ? "orange"
                        : "green"
                    }-600 text-white rounded-full p-1`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-800">{allergy.name}</h3>
              </div>
              <span
                className={`bg-${allergy.severity === "Severe"
                    ? "red"
                    : allergy.severity === "Moderate"
                      ? "orange"
                      : "green"
                  }-100 text-${allergy.severity === "Severe"
                    ? "red"
                    : allergy.severity === "Moderate"
                      ? "orange"
                      : "green"
                  }-800 px-2 py-1 rounded-full text-xs font-medium`}
              >
                {allergy.severity}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3">{allergy.type}</p>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Reaction</span>
                <p className="text-gray-800">{allergy.reaction}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-gray-500">Date Identified</span>
                  <p className="text-gray-800">{allergy.dateIdentified}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <p className="text-gray-800">{allergy.status}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-500">Notes</span>
                <p className="text-gray-800">{allergy.notes}</p>
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
        ))}
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
              <p className="text-gray-800">Phone: +880 16 9231 1409</p>
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
