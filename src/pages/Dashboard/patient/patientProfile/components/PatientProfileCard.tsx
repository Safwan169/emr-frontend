import { Calendar, Edit, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { ModalFormFields } from "./profileContainer/personalInfo/ModalFormFields";

export default function PatientProfileCard() {
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
    <div className="bg-white mt-5 lg:mt-0 rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0">
        {/* Left section with avatar and info */}
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
              alt="Patient Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Patient Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Salil Chakma
            </h2>
            <p className="text-sm text-gray-600 mb-3">Patient ID: #12345</p>

            {/* Contact Information */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Age: 28 Years</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+8801234567890</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>salilchakma5@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors duration-200"
        >
          <Edit className="w-4 h-4" />
        </button>
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
              {/* <ModalFormFields
                formData={formData}
                handleInputChange={handleInputChange}
              /> */}

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
}
