import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUpdateUserEmergencyContactMutation } from "../../../../../../../redux/features/UserEmergencyContact/userEmergencyContactApi";
import { UserDataType } from "../../../../../../../types/userData";
import { ModalFormFields } from "./ModalFormFields";

interface PersonalInfoProps {
  userData: UserDataType;
}

interface EmergencyContactData {
  first_name: string;
  last_name: string;
  phone: string;
  relationship: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserEmergencyContactMutation();
  const [updateEmergencyContact, { isLoading: isEmergencyLoading }] =
    useUpdateUserEmergencyContactMutation();

  console.log("userdata", userData);

  // State to manage form data
  const [formData, setFormData] = useState<UserDataType>(userData);

  // State to manage emergency contact form data
  const [emergencyContactData, setEmergencyContactData] =
    useState<EmergencyContactData>({
      first_name: "",
      last_name: "",
      phone: "",
      relationship: "",
    });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Map form field names to userData properties
    const fieldMapping: { [key: string]: keyof UserDataType } = {
      firstName: "first_name",
      lastName: "last_name",
      dateOfBirth: "date_of_birth",
      gender: "gender",
      phone: "phone_number",
      email: "email",
      address: "address",
      country: "country",
      bloodGroup: "blood_group",
      height: "height_cm",
      weight: "weight_lbs",
      temperature: "temperature",
      bloodPressure: "blood_pressure",
      heartBitRate: "heart_bit_rate",
    };

    const dataKey = fieldMapping[name] || (name as keyof UserDataType);

    // Convert to number for height and weight fields
    let processedValue: string | number = value;

    if (dataKey === "height_cm" || dataKey === "weight_lbs") {
      // Convert to number, but handle empty string case
      processedValue = value === "" ? 0 : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [dataKey]: processedValue,
    }));
  };

  // Handle emergency contact input change
  const handleEmergencyInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmergencyContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Updated handleSubmit function
  const handleSubmit = async () => {
    try {
      // Destructure only the allowed fields based on your schema
      const {
        first_name,
        last_name,
        date_of_birth,
        gender,
        phone_number,
        email,
        address,
        country,
        blood_group,
        height_cm,
        weight_lbs,
        temperature,
        blood_pressure,
        heart_bit_rate,
      } = formData;

      const filteredData = {
        first_name,
        last_name,
        date_of_birth,
        gender,
        phone_number,
        email,
        address,
        country,
        blood_group,
        height_cm: height_cm ? Number(height_cm) : null,
        weight_lbs: weight_lbs ? Number(weight_lbs) : null,
        temperature,
        blood_pressure,
        heart_bit_rate,
      };

      const result = await updateUser({
        id: userData.id,
        data: filteredData,
      }).unwrap();

      toast.success("Information updated successfully!");
      setIsModalOpen(false);
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update information. Please try again.");
    }
  };

  // Handle emergency contact submit
  const handleEmergencySubmit = async () => {
    try {
      // Basic validation
      if (
        !emergencyContactData.first_name ||
        !emergencyContactData.last_name ||
        !emergencyContactData.phone ||
        !emergencyContactData.relationship
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const result = await updateEmergencyContact({
        id: userData.id,
        data: emergencyContactData,
      }).unwrap();

      toast.success("Emergency contact added successfully!");
      setIsEmergencyModalOpen(false);
      // Reset form data
      setEmergencyContactData({
        first_name: "",
        last_name: "",
        phone: "",
        relationship: "",
      });
      console.log("Emergency contact update successful:", result);
    } catch (error) {
      console.error("Emergency contact update failed:", error);
      toast.error("Failed to add emergency contact. Please try again.");
    }
  };

  const handleCancel = () => {
    // Reset form data to original userData
    setFormData(userData);
    setIsModalOpen(false);
  };

  const handleEmergencyCancel = () => {
    // Reset emergency contact form data
    setEmergencyContactData({
      first_name: "",
      last_name: "",
      phone: "",
      relationship: "",
    });
    setIsEmergencyModalOpen(false);
  };

  // Open modal and initialize form data
  const handleEditClick = () => {
    setFormData(userData);
    setIsModalOpen(true);
  };

  // Open emergency contact modal
  const handleEmergencyClick = () => {
    setIsEmergencyModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Personal Information
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={handleEmergencyClick}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Add Emergency Contact 🚨
          </button>
          <button
            onClick={handleEditClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Edit ✏️
          </button>
        </div>
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
                {userData?.first_name || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.last_name || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date of Birth
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.date_of_birth &&
                  new Date(userData.date_of_birth).toLocaleDateString("en-US", {
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
              <div className="text-gray-900 font-medium">
                {userData?.gender || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Age
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.age || "Not provided"}
              </div>
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
              <div className="text-gray-900 font-medium">
                {userData?.phone_number || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.email || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.address || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Country
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.country || "Not provided"}
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Medical & Health Information
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Blood Group
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.blood_group || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Height (cm)
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.height_cm
                  ? `${userData.height_cm} cm`
                  : "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Weight (lbs)
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.weight_lbs
                  ? `${userData.weight_lbs} lbs`
                  : "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Temperature
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.temperature || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Blood Pressure
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.blood_pressure || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Heart Rate
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.heart_bit_rate || "Not provided"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Personal Info Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Edit Personal Information
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Add Emergency Contact
                </h2>
                <button
                  onClick={handleEmergencyCancel}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  disabled={isEmergencyLoading}
                >
                  ×
                </button>
              </div>

              {/* Emergency Contact Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={emergencyContactData.first_name}
                    onChange={handleEmergencyInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={emergencyContactData.last_name}
                    onChange={handleEmergencyInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={emergencyContactData.phone}
                    onChange={handleEmergencyInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship *
                  </label>
                  <select
                    name="relationship"
                    value={emergencyContactData.relationship}
                    onChange={handleEmergencyInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="Parent">Parent</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Child">Child</option>
                    <option value="Friend">Friend</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Emergency Modal Footer */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleEmergencyCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                  disabled={isEmergencyLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEmergencySubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  disabled={isEmergencyLoading}
                >
                  {isEmergencyLoading ? "Adding..." : "Add Emergency Contact"}
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
