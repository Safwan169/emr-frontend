import { Calendar, Mail, Phone, Pencil } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import useGetUserData from "../../../../../hooks/useGetUserData";
import { useUpdateUserProfileMutation } from "../../../../../redux/features/doctor/doctorApi";

interface FormDataType {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  bloodGroup: string;
  height: string;
  weight: string;
  temperature: string;
  bloodPressure: string;
  heartBitRate: string;
}

export default function PatientProfileCard() {
  const { data, refetch } = useGetUserData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    bloodGroup: "",
    height: "",
    weight: "",
    temperature: "",
    bloodPressure: "",
    heartBitRate: "",
  });

  // ✅ Populate formData from API response
  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        dateOfBirth: data.date_of_birth || "",
        gender: data.gender || "",
        phone: data.phone_number || "",
        email: data.email || "",
        address: data.address || "",
        country: data.country || "",
        bloodGroup: data.blood_group || "",
        height: data.height_cm?.toString() || "",
        weight: data.weight_lbs?.toString() || "",
        temperature: data.temperature || "",
        bloodPressure: data.blood_pressure || "",
        heartBitRate: data.heart_bit_rate || "",
      });
    }
  }, [data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { userId } = JSON.parse(localStorage.getItem("profileInfo") || "{}");
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  // ✅ Handle profile image upload
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      refetch()
      const payload = new FormData();
      payload.append("profile_image", file);

      try {
        const res = await updateUserProfile({ userId, profileData: payload }).unwrap();
        console.log(res, "Profile Image Updated");
        refetch()
        // alert("Profile image updated successfully!");
      } catch (err) {
        console.error("Update failed", err);
        alert("Failed to update profile image.");
      }
    }
  };

  // ✅ Convert camelCase → snake_case for API
  const convertToSnakeCase = (data: FormDataType) => {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      phone_number: data.phone,
      email: data.email,
      address: data.address,
      country: data.country,
      blood_group: data.bloodGroup,
      height_cm: data.height ? Number(data.height) : null,
      weight_lbs: data.weight ? Number(data.weight) : null,
      temperature: data.temperature,
      blood_pressure: data.bloodPressure,
      heart_bit_rate: data.heartBitRate,
    };
  };



  // ✅ Submit updated info
  const handleSubmit = async () => {
    const payload = convertToSnakeCase(formData);

    try {
      console.log(payload, "Payload sending to API...");
      const res = await updateUserProfile({ userId, profileData: payload }).unwrap();
      console.log(res, "Profile Updated");

      refetch()
      setIsModalOpen(false);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update information.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white mt-5 lg:mt-0 rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0">
        {/* Avatar */}
        <div className="flex items-start space-x-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 group">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : data?.profile_image?.file_URL
                    ? `${process.env.REACT_APP_API_BASE_URL}${data.profile_image.file_URL}`
                    : "/profile.jpg"
              }
              alt="Patient Avatar"
              className="w-full h-full object-cover"
            />

            <label className="absolute inset-0 bg-black bg-opacity-40 hidden group-hover:flex items-center justify-center cursor-pointer">
              <Pencil className="text-white w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {data?.first_name}{' '}{data?.last_name}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Patient ID: {data?.display_user_id}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Age: {data?.age} Years</span>
              </div>

              <div className={`${data?.phone_number ? '' : 'hidden'} flex items-center space-x-2 text-sm text-gray-600`}>
                <Phone className="w-4 h-4" />
                <span>{data?.phone_number}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{data?.email}</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-500">{data?.address}</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1a3eab] hover:bg-blue-700 text-white p-2 rounded-md transition-colors duration-200"
        >
          {isLoading ? "Updating..." : "Edit Info"}
        </button>
      </div>

      {/* ✅ Modal */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm font-medium capitalize text-gray-700 mb-1">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

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
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
