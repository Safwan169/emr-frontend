import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PersonalDetailsProps, PersonalInfo } from "../../../../../types/doctorTypes";
import PersonaDetailsModal from "./modals/PersonaDetailsModal";
import {
  useUpdateDoctorProfileMutation,
  useUpdateUserProfileMutation
} from "../../../../../redux/features/doctor/doctorApi";
import useGetUserData from "../../../../../hooks/useGetUserData";
import toast from "react-hot-toast";

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ reftch, image, personalInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);
  const { data, refetch } = useGetUserData();

  const [updateDoctorProfile] = useUpdateDoctorProfileMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const { userId } = JSON.parse(localStorage.getItem("profileInfo") || "{}");

  const [imageFile, setImageFile] = useState<File | null>(null);

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
      };

      const Details = {
        specialization: formData.specialization,
        license_number: formData.license_number,
        years_of_experience: formData.years_of_experience,
      };

      await updateUserProfile({ userId, profileData: userData }).unwrap();
      await updateDoctorProfile({ userId, profileData: Details }).unwrap();

      await reftch();
      await refetch().unwrap();

      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const payload = new FormData();
      payload.append("profile_image", file);

      try {
        await updateUserProfile({ userId, profileData: payload }).unwrap();
        console.log("Profile Image Updated");

        await refetch().unwrap(); // Force re-fetch updated data

        toast.success("Profile image updated successfully!");
      } catch (err) {
        console.error("Update failed", err);
        toast.error("Failed to update profile image.");
      }
    }
  };

  return (
    <>
      {/* Profile Card */}
      <div className="flex bg-white p-6 shadow rounded-lg justify-between border-b pb-4">
        <div className="w-full flex gap-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 group">
            <img
              src={
                data?.profile_image?.file_URL
                  ? `${process.env.REACT_APP_API_BASE_URL}${data.profile_image.file_URL}?t=${Date.now()}`
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

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {data?.first_name} {data?.last_name}
            </h2>
            <p className="text-sm text-blue-600">{personalInfo?.specialization}</p>
            <p className="text-sm text-gray-400"> License #: {personalInfo?.license_number}</p>
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
    </>
  );
};

export default PersonalDetails;
