import React, { useRef } from "react";
import { X, Upload } from "lucide-react";
import { PersonalInfo } from "../../../../../../types/doctorTypes";

interface PersonaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: PersonalInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const PersonaDetailsModal: React.FC<PersonaDetailsModalProps> = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSave,
}) => {

  if (!isOpen) return null;






  return (
    <div className="fixed  inset-0 py-3 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white h-fit scroll-smooth overflow-y-auto rounded-lg shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Edit Personal Details</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>

       

        {/* Form */}
        <div className="space-y-4">
          {["first_name", "last_name", "specialization", "license_number", "email",'years_of_experience'].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={(formData as any)[field]}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
              />
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-[#1C3BA4] text-white rounded-lg hover:bg-[#163185]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaDetailsModal;
