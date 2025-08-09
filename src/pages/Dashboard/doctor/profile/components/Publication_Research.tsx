import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ResearchModal from "./modals/ResearchModal";
import {
  PublicationResearchProps,
  Research,
} from "../../../../../types/doctorTypes";
import {
  useCreateResearchMutation,
  useDeleteResearchMutation,
  useUpdateResearchMutation,
} from "../../../../../redux/features/doctor/doctorApi";
import Swal from "sweetalert2";

interface Props extends PublicationResearchProps {
  userId: number;
}

const Publication_Research: React.FC<Props> = ({
  publications,
  research,
  userId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResearch, setCurrentResearch] = useState<Research>({
    id: 0,
    research_name: "",
    publication_year: '',
    published_by: "",
  });
  const [mode, setMode] = useState<"add" | "edit">("add");

  const [createResearch] = useCreateResearchMutation();
  const [deleteResearch] = useDeleteResearchMutation();

  const [updateResearch] = useUpdateResearchMutation();

  const handleAddClick = () => {
    setCurrentResearch({
      id: 0,
      research_name: "",
      publication_year: "",
      published_by: "",
    });
    setMode("add");
    setIsModalOpen(true);
  };

  const handleEditClick = (item: Research) => {
    setCurrentResearch(item);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentResearch((prev) => ({
      ...prev,
      [name]: name === "publication_year" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (
      !currentResearch.research_name ||
      !currentResearch.publication_year ||
      !currentResearch.published_by
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (mode === "edit") {
        const data = {
          id: currentResearch.id,
          research_name: currentResearch.research_name,
          publication_year: currentResearch.publication_year,
          published_by: currentResearch.published_by
        }
        await updateResearch({
          userId,
          researchData: data,
        }).unwrap();
      }
      else {

        await createResearch({
          userId,
          researchData: {
            research_name: currentResearch.research_name,
            publication_year: currentResearch.publication_year,
            published_by: currentResearch.published_by,
          },
        }).unwrap();
      }

      toast.success(
        mode === "edit"
          ? "Research updated successfully!"
          : "Research added successfully!"
      );

      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save research");
    }
  };

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
      await deleteResearch({ userId, researchId: id }).unwrap();
      toast.success("Research deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete research");
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg mt-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Research & Publications</h2>
        <button
          onClick={handleAddClick}
          className="text-white bg-[#1C3BA4] rounded-full p-2 hover:bg-[#163185]"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* ✅ Research List */}
      <div className="space-y-4">
        {research.length === 0 && (
          <p className="text-gray-500">No research found.</p>
        )}

        {research.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[15px] font-semibold text-gray-800">
                  “{item.research_name}”
                </p>
                <p className="text-sm text-gray-500">
                  {item.published_by} • {item.publication_year}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 flex gap-3">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ResearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          research={currentResearch}
          onChange={handleChange}
          onSave={handleSave}
          mode={mode}
        />
      )}
    </div>
  );
};

export default Publication_Research;
