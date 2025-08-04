import React from "react";
import { X } from "lucide-react";

interface CertificationItem {
  id?: number; // Optional for new items
  name: string;
  certified_year: number | string;
  validation_year: number | string;
  institution: string;
}

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: CertificationItem;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  mode: "add" | "edit";
}

const CertificationModal: React.FC<CertificationModalProps> = ({
  isOpen,
  onClose,
  certification,
  onChange,
  onSave,
  mode,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "edit" ? "Edit Certification" : "Add Certification"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="hover:bg-gray-100 p-1 rounded-full"
          >
            <X size={20} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="certificationName"
              className="block text-gray-600 font-medium mb-1"
            >
              Certification Name
            </label>
            <input
              id="certificationName"
              type="text"
              name="name"
              value={certification.name}
              onChange={onChange}
              placeholder="Enter certification name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>

          <div>
            <label
              htmlFor="institution"
              className="block text-gray-600 font-medium mb-1"
            >
              Institution
            </label>
            <input
              id="institution"
              type="text"
              name="institution"
              value={certification.institution}
              onChange={onChange}
              placeholder="Enter institution name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="certifiedYear"
                className="block text-gray-600 font-medium mb-1"
              >
                Certified Year
              </label>
              <input
                id="certifiedYear"
                type="number"
                name="certified_year"
                value={certification.certified_year}
                onChange={onChange}
                placeholder="e.g., 2020"
                min="1900"
                max="2099"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
              />
            </div>

            <div>
              <label
                htmlFor="validationYear"
                className="block text-gray-600 font-medium mb-1"
              >
                Validation Year
              </label>
              <input
                id="validationYear"
                type="number"
                name="validation_year"
                value={certification.validation_year}
                onChange={onChange}
                placeholder="e.g., 2030"
                min="1900"
                max="2099"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
              />
            </div>
          </div>
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
            {mode === "edit" ? "Save Changes" : "Add Certification"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;
