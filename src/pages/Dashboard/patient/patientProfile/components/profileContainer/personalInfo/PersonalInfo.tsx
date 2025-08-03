import { useState } from "react";
import { ModalFormFields } from "./ModalFormFields";

const PersonalInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Salil",
    lastName: "Salil",
    dateOfBirth: "1989-03-15",
    gender: "Male",
    phone: "+8801234567890",
    email: "salilchakma5@gmail.com",
    address: "5123 Medical Center Drive,Dhaka",
    country: "Bangladesh",
    bloodGroup: "A+",
    height: "5'4\"",
    weight: "175 lbs",
    emergencyContact: "+8809876543321",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updated data:", formData);
    alert("Information updated successfully!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Personal Information
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Edit ✏️
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="border rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Basic Information
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              <div className="text-gray-900 font-medium">
                {formData.firstName}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <div className="text-gray-900 font-medium">
                {formData.lastName}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date of Birth
              </label>
              <div className="text-gray-900 font-medium">
                {new Date(formData.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <div className="text-gray-900 font-medium">{formData.gender}</div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Contact Information
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              <div className="text-gray-900 font-medium">{formData.phone}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <div className="text-gray-900 font-medium">{formData.email}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <div className="text-gray-900 font-medium">
                {formData.address}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Country
              </label>
              <div className="text-gray-900 font-medium">
                {formData.country}
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Medical & Emergency
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Blood Group
              </label>
              <div className="text-gray-900 font-medium">
                {formData.bloodGroup}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Height
              </label>
              <div className="text-gray-900 font-medium">{formData.height}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Weight
              </label>
              <div className="text-gray-900 font-medium">{formData.weight}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Emergency Contact
              </label>
              <div className="text-gray-900 font-medium">
                {formData.emergencyContact}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Edit Personal Information
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Using the separated ModalFormFields component */}
              <ModalFormFields
                formData={formData}
                handleInputChange={handleInputChange}
              />

              {/* Modal Footer */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
