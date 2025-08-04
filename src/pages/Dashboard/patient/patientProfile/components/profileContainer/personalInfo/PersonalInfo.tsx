import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUpdateUserByIdMutation } from "../../../../../../../redux/features/user/userApi";
import { UserDataType } from "../../../../../../../types/userData";
import { ModalFormFields } from "./ModalFormFields";

interface PersonalInfoProps {
  userData: UserDataType;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserByIdMutation();

  // State to manage form data
  const [formData, setFormData] = useState<UserDataType>(userData);

  // const handleInputChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name, value } = e.target;

  //   // Map form field names to userData properties
  //   const fieldMapping: { [key: string]: keyof UserDataType } = {
  //     firstName: "first_name",
  //     lastName: "last_name",
  //     dateOfBirth: "date_of_birth",
  //     gender: "gender",
  //     phone: "phone_number",
  //     email: "email",
  //     address: "address",
  //     country: "country",
  //     bloodGroup: "blood_group",
  //     height: "height_cm", // 👈 expects number
  //     weight: "weight_lbs", // 👈 expects number
  //     emergencyContact: "phone_number",
  //   };
  //   const dataKey = fieldMapping[name] || (name as keyof UserDataType);

  //   setFormData((prev) => ({
  //     ...prev,
  //     [dataKey]: value,
  //   }));
  // };

  // const handleSubmit = async () => {
  //   try {
  //     // Destructure only the allowed fields
  //     const {
  //       first_name,
  //       last_name,
  //       date_of_birth,
  //       gender,
  //       phone_number,
  //       email,
  //       address,
  //       country,
  //       blood_group,
  //       height_cm,
  //       weight_lbs,
  //     } = formData;

  //     const filteredData = {
  //       first_name,
  //       last_name,
  //       date_of_birth,
  //       gender,
  //       phone_number,
  //       email,
  //       address,
  //       country,
  //       blood_group,
  //       height_cm,
  //       weight_lbs,
  //     };

  //     const result = await updateUser({
  //       id: userData.id,
  //       data: filteredData,
  //     }).unwrap();

  //     toast.success("Information updated successfully!");
  //     setIsModalOpen(false);
  //     console.log("Update successful:", result);
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     alert("Failed to update information. Please try again.");
  //   }
  // };

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
      height: "height_cm", // 👈 expects number
      weight: "weight_lbs", // 👈 expects number
      emergencyContact: "phone_number",
    };

    const dataKey = fieldMapping[name] || (name as keyof UserDataType);

    // Convert to number for height and weight fields
    let processedValue: string | number = value;

    if (dataKey === "height_cm" || dataKey === "weight_lbs") {
      // Convert to number, but handle empty string case
      processedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [dataKey]: processedValue,
    }));
  };

  // Updated handleSubmit function
  const handleSubmit = async () => {
    try {
      // Destructure only the allowed fields
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
        height_cm: Number(height_cm), // Ensure it's a number or null
        weight_lbs: Number(weight_lbs), // Ensure it's a number or null
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
      alert("Failed to update information. Please try again.");
    }
  };

  const handleCancel = () => {
    // Reset form data to original userData
    setFormData(userData);
    setIsModalOpen(false);
  };

  // Open modal and initialize form data
  const handleEditClick = () => {
    setFormData(userData);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Personal Information
        </h1>
        <button
          onClick={handleEditClick}
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
                {userData?.first_name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.last_name}
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
                {userData?.gender}
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
              <div className="text-gray-900 font-medium">{userData?.email}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.address}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Country
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.country}
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
                {userData?.blood_group}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Height
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.height_cm}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Weight
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.weight_lbs}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Emergency Contact
              </label>
              <div className="text-gray-900 font-medium">
                {userData?.phone_number}
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
    </div>
  );
};

export default PersonalInfo;
