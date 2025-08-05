import { GraduationCap, Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { EducationProps, EducationItem } from "../../../../../types/doctorTypes";
import EducationModal from "./modals/EducationModal";
import { useCreateEducationMutation, useDeleteEducationMutation } from "../../../../../redux/features/doctor/doctorApi";

const Education: React.FC<EducationProps & { userId: number }> = ({ reftch, education, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<EducationItem>({
    id: 0,
    title: "",
    institution: "",
    achievement: "",
    timeline: "",
  });
  const [mode, setMode] = useState<"edit" | "add">("add");
  const [educationList, setEducationList] = useState<EducationItem[]>(education);

  // API hooks
  const [createEducation] = useCreateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  // Open Edit Modal
  const handleEditClick = (edu: EducationItem) => {
    setCurrentEducation(edu);
    setMode("edit");
    setIsModalOpen(true);
  };

  // Open Add Modal
  const handleAddClick = () => {
    setCurrentEducation({ id: 0, title: "", institution: "", achievement: "", timeline: "" });
    setMode("add");
    setIsModalOpen(true);
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEducation((prev) => ({ ...prev, [name]: value }));
  };

  // Save (Add or Edit) with API
  const handleSave = async () => {
    if (!currentEducation.title || !currentEducation.institution || !currentEducation.timeline) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      if (mode === "edit") {
        // TODO: Implement update API call here if available
        // For now just show success toast
        const res = await createEducation({ userId, educationData: currentEducation }).unwrap();
        toast.success("Education updated successfully!");
        if (res.statusCode == 201) {

          console.log(res, 'thsi sis response')
          reftch()

          console.log(education, 'thsi is educatoin')
        }
      } else {
        const res = await createEducation({ userId, educationData: currentEducation }).unwrap();
        if (res.statusCode == 201) {

          console.log(res, 'thsi sis response')
          reftch()

          console.log(education, 'thsi is educatoin')
        }
        console.log("New education added:", currentEducation);
        toast.success("New education added!");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  // Delete Education
  const handleDelete = async (educationId: number) => {
    try {
      await deleteEducation({ userId, educationId }).unwrap();
      toast.success("Education deleted!");
      // Optionally remove from local list here for immediate UI update:
      setEducationList((prev) => prev.filter((edu) => edu.id !== educationId));
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete education");
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white p-6 shadow rounded-lg mt-3">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200/70 mb-4">
          <h2 className="text-lg font-bold">Education & Qualifications</h2>
          <button
            onClick={handleAddClick}
            className="text-white bg-[#1C3BA4] rounded-full p-2 hover:bg-[#163185]"
            title="Add Education"
          >
            <Plus size={18} />
          </button>
        </div>
           <div className="space-y-4">
        {education?.length === 0 && (
          <p className="text-gray-500">No education found.</p>
        )}
        </div>


        <div className="space-y-3 mb-6">
          {education?.map((edu) => (
            <div
              key={edu.id}
              className="group flex gap-3 p-4 border border-gray-200/70 rounded-lg bg-white items-center"
            >
              {/* Left Icon */}
              <GraduationCap className="w-10 h-10 text-[#1C3BA4] bg-[#ebedf7] p-2 rounded-full" />

              {/* Info */}
              <div className="max-w-xl space-y-2 flex-1">
                <p className="text-[16px] font-medium">{edu.title}</p>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.achievement && (
                  <p className="text-sm text-gray-500">{edu.achievement}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <p className="text-[16px] font-medium">{edu.timeline}</p>
                <button
                  onClick={() => handleEditClick(edu)}
                  className="text-[#1C3BA4] hover:text-[#163185] hidden group-hover:block"
                  title="Edit Education"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="text-red-500 hover:text-red-700 hidden group-hover:block"
                  title="Delete Education"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <EducationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          education={currentEducation}
          onChange={handleChange}
          onSave={handleSave}
          mode={mode}
        />
      )}
    </>
  );
};

export default Education;
