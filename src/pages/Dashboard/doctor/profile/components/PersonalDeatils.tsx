import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PersonalDetailsProps, PersonalInfo } from "../../../../../types/doctorTypes";
import PersonaDetailsModal from "./modals/PersonaDetailsModal";
import { useUpdateDoctorProfileMutation, useUpdateUserProfileMutation } from "../../../../../redux/features/doctor/doctorApi";

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ image, personalInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);

  const [updateDoctorProfile, { isLoading, isSuccess, isError }] = useUpdateDoctorProfileMutation();
  const [updateUserProfile, { isLoading: isLoading1, isSuccess: isSuccess1, isError: isError1 }] = useUpdateUserProfileMutation();
  const { userId } = JSON.parse(localStorage.getItem("profileInfo") || "{}");

  useEffect(() => {
    setFormData(personalInfo);
  }, [personalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSave = async () => {

    try {
      const userData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      }



      const Details = {
        specialization: formData.specialization,
        license_number: formData.license_number,
        years_of_experience: formData.years_of_experience


      }




      await updateUserProfile({ userId, profileData: userData }).unwrap();
      await updateDoctorProfile({ userId, profileData: Details }).unwrap();

      setIsModalOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      {/* Profile Card */}
      <div className="flex bg-white p-6 shadow rounded-lg justify-between border-b pb-4">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={image}
              alt="Doctor"
              className="w-20 h-20 rounded-full object-cover mr-4"
            />
            <div
              className="bg-[#1C3BA4] absolute bottom-1 right-3 text-white w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Pencil size={10} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{formData.first_name}</h1>
            <h1 className="text-2xl font-bold">{formData.last_name}</h1>
            <p className="text-blue-600 text-gray-500/95 font-medium">
              {formData.specialization}
            </p>
            <p className="text-gray-500">License #: {formData.license_number}</p>
          </div>
        </div>
        <div
          className="bg-[#1C3BA4] text-white w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil size={15} />
        </div>
      </div>

      {/* Modal */}
      <PersonaDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
      />

      {/* Status Messages */}
      {/* {isLoading && <p className="text-blue-500 text-center mt-2">Updating profile...</p>}
      {isSuccess && <p className="text-green-500 text-center mt-2">Profile updated!</p>}
      {isError && <p className="text-red-500 text-center mt-2">Update failed!</p>} */}
    </>
  );
};

export default PersonalDetails;
