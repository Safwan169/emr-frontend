import React, { useState } from "react";
import { useCreateAllergyMutation } from "../../redux/features/allergies/allergiesApi";

interface AllergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: Number; // passed from parent
}

const AllergyModal: React.FC<AllergyModalProps> = ({ isOpen, onClose, userId }) => {
  const [formData, setFormData] = useState({
    allergy_name: "",
    allergy_type: "",
    condition: "severe",
    reactions: "",
    note: "",
    status: "active",
  });

  const [createAllergy, { isLoading }] = useCreateAllergyMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createAllergy({ userId, allergyData: formData }).unwrap();
      console.log("🩺 Allergy added successfully");
      onClose();
      setFormData({
        allergy_name: "",
        allergy_type: "",
        condition: "severe",
        reactions: "",
        note: "",
        status: "active",
      });
    } catch (error) {
      console.error("❌ Failed to add allergy:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Allergy</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-600">Allergy Name</label>
            <input
              type="text"
              name="allergy_name"
              value={formData.allergy_name}
              onChange={handleChange}
              placeholder="Peanuts"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Allergy Type</label>
            <input
              type="text"
              name="allergy_type"
              value={formData.allergy_type}
              onChange={handleChange}
              placeholder="Food"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="severe">Severe</option>
              <option value="moderate">Moderate</option>
              <option value="mild">Mild</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Reactions</label>
            <input
              type="text"
              name="reactions"
              value={formData.reactions}
              onChange={handleChange}
              placeholder="Swelling, Hives, Anaphylaxis"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              placeholder="Carries epipen"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save Allergy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllergyModal;
