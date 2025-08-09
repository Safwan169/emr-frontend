import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CertificationModal from "./modals/CertificationModal";
import { CertificationProps, Certification } from "../../../../../types/doctorTypes";
import {
  useCreateCertificationMutation,
  useDeleteCertificationMutation,
  useUpdateCertificationMutation,
} from "../../../../../redux/features/doctor/doctorApi";
import Swal from "sweetalert2";

interface Props extends CertificationProps {
  userId: number; // ✅ For API calls
}

const Certifications: React.FC<Props> = ({ certifications, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateCertification] = useUpdateCertificationMutation();
  const [currentCertification, setCurrentCertification] = useState<Certification>({
    id: 0,
    name: "",
    certified_year: "",
    validation_year: "",
    institution: "",
    isActive: false,
  });
  const [mode, setMode] = useState<"add" | "edit">("add");

  // ✅ RTK Query mutations
  const [createCertification] = useCreateCertificationMutation();
  const [deleteCertification] = useDeleteCertificationMutation();

  // ✅ Add Certification
  const handleAddClick = () => {
    setCurrentCertification({
      id: 0,
      name: "",
      certified_year: "",
      validation_year: "",
      institution: "",
      isActive: false,
    });
    setMode("add");
    setIsModalOpen(true);
  };

  // ✅ Edit Certification
  const handleEditClick = (cert: Certification) => {
    setCurrentCertification(cert);
    setMode("edit");
    setIsModalOpen(true);
  };

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCertification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  // ✅ Save (Add or Edit)
  const handleSave = async () => {
    try {
      if (mode === "edit" && currentCertification.id) {

        // For now: delete old, add new (since update API is missing)
        console.log(currentCertification);
        const data={
          id: currentCertification.id,
          name: currentCertification.name,
          certified_year: Number(currentCertification.certified_year),
          validation_year: Number(currentCertification.validation_year),
          institution: currentCertification.institution,

        }
        console.log(data)
        await updateCertification({ userId,  certificationData: data }).unwrap();
      }
      else {

        await createCertification({
          userId,
          certificationData: {
            name: currentCertification.name,
            certified_year: Number(currentCertification.certified_year),
            validation_year: Number(currentCertification.validation_year),
            institution: currentCertification.institution,
          },
        }).unwrap();
      }

      toast.success(mode === "edit" ? "Certification updated successfully!" : "Certification added successfully!");

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save certification");
      console.error(error);
    }
  };

  // ✅ Delete Certification
  const handleDelete = async (id: number) => {

       const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

    try {
      await deleteCertification({ userId, certificationId: id }).unwrap();
      toast.success("Certification deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete certification");
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white p-6 shadow rounded-lg mt-3">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200/70 mb-4">
          <h2 className="text-lg font-bold">Board Certifications</h2>
          <button
            onClick={handleAddClick}
            className="text-white bg-[#1C3BA4] rounded-full p-2 hover:bg-[#163185]"
            title="Add Certification"
          >
            <Plus size={18} />
          </button>
        </div>


        <div className="space-y-4">
          {certifications?.length === 0 && (
            <p className="text-gray-500">No Certifications found.</p>
          )}

        </div>

        <div className="grid   grid-cols-1sm:grid-cols-2 gap-4 mb-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 sm:flex block justify-between border border-gray-200/70 rounded-lg bg-white relative group"
            >
              <div className="space-y-2">
                <p className="text-[18px] font-medium">{cert.name}</p>
                <p className="text-[14px] text-gray-600">
                  Certified {cert.certified_year} •{" "}
                  <span className="text-green-600">Valid until {cert.validation_year}</span>
                </p>
                <p className="text-sm text-gray-500">{cert.institution}</p>
                {cert.isActive && (
                  <p className="text-xs text-green-500 font-semibold">Active</p>
                )}
              </div>
              <div className="mt-5">
                <Check size={25} className="text-[#00AA19]" />
              </div>

              {/* Edit & Delete Icons */}
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                <button
                  onClick={() => handleEditClick(cert)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CertificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          certification={currentCertification}
          onChange={handleChange}
          onSave={handleSave}
          mode={mode}
        />
      )}
    </>
  );
};

export default Certifications;
