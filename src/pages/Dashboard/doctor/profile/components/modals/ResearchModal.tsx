import React from "react";
import { X } from "lucide-react";

interface ResearchItem {
  id: number;
  research_name: string;
  publication_year: number;
  published_by: string;
}

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  research: ResearchItem;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  mode: "add" | "edit";
}

const ResearchModal: React.FC<ResearchModalProps> = ({
  isOpen,
  onClose,
  research,
  onChange,
  onSave,
  mode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">{mode === "edit" ? "Edit Research" : "Add Research"}</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Research Name</label>
            <input
              type="text"
              name="research_name"
              value={research.research_name}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Publication Year</label>
            <input
              type="number"
              name="publication_year"
              value={research.publication_year}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Published By</label>
            <input
              type="text"
              name="published_by"
              value={research.published_by}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1C3BA4]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-[#1C3BA4] text-white rounded hover:bg-[#163185]">
            {mode === "edit" ? "Save Changes" : "Add Research"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchModal;
