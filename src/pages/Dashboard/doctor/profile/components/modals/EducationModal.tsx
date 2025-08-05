import React from "react";
import { X } from "lucide-react";

interface EducationItem {
  title: string;
  institution: string;
  achievement?: string;
  timeline: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  education: EducationItem;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  mode: "edit" | "add";
}

const EducationModal: React.FC<EducationModalProps> = ({
  isOpen,
  onClose,
  education,
  onChange,
  onSave,
  mode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "edit" ? "Edit Education" : "Add Education"}
          </h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={education.title}
              onChange={onChange}
              placeholder="e.g. MD in Cardiology"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Institution</label>
            <input
              type="text"
              name="institution"
              value={education.institution}
              onChange={onChange}
              placeholder="e.g. Med University"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Achievement</label>
            <textarea
              name="achievement"
              value={education.achievement || ""}
              onChange={onChange}
              rows={3}
              placeholder="e.g. Summa Cum Laude"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Timeline</label>
            <input
              type="text"
              name="timeline"
              value={education.timeline}
              onChange={onChange}
              placeholder="e.g. 2010-2014"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
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
            {mode === "edit" ? "Save Changes" : "Add Education"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
