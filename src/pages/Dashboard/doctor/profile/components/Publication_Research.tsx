import React, { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ResearchModal from "./modals/ResearchModal";
import { PublicationResearchProps, Research } from "../../../../../types/doctorTypes";
import { useCreateResearchMutation, useDeleteResearchMutation } from "../../../../../redux/features/doctor/doctorApi";


interface Props extends PublicationResearchProps {
  userId: number; // ✅ Added userId for API calls
}

const Publication_Research: React.FC<Props> = ({ publications, research, userId }) => {
  // Ensure research is always an array
  const [researchList, setResearchList] = useState<Research[]>(Array.isArray(research) ? research : [research]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResearch, setCurrentResearch] = useState<Research>({
    id: 0,
    research_name: "",
    publication_year: 0,
    published_by: "",
  });
  const [mode, setMode] = useState<"add" | "edit">("add");

  // ✅ RTK Query Hooks
  const [createResearch] = useCreateResearchMutation();
  const [deleteResearch] = useDeleteResearchMutation();

  // ✅ Open Add Modal
  const handleAddClick = () => {
    setCurrentResearch({ id: 0, research_name: "", publication_year: 0, published_by: "" });
    setMode("add");
    setIsModalOpen(true);
  };

  // ✅ Open Edit Modal
  const handleEditClick = (item: Research) => {
    setCurrentResearch(item);
    setMode("edit");
    setIsModalOpen(true);
  };

  // ✅ Handle input changes in modal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentResearch((prev) => ({
      ...prev,
      [name]: name === "publication_year" ? Number(value) : value,
    }));
  };

  // ✅ Save new or updated research via API
  const handleSave = async () => {
    if (!currentResearch.research_name || !currentResearch.publication_year || !currentResearch.published_by) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (mode === "edit") {
        // Since there's no update API, delete old and add new
        await deleteResearch({ userId, researchId: currentResearch.id }).unwrap();
      }

      await createResearch({
        userId,
        researchData: {
          research_name: currentResearch.research_name,
          publication_year: currentResearch.publication_year,
          published_by: currentResearch.published_by,
        },
      }).unwrap();

      if (mode === "edit") {
        toast.success("Research updated successfully!");
      } else {
        toast.success("Research added successfully!");
      }

      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save research");
      console.error(error);
    }
  };

  // ✅ Delete research via API
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this research?")) return;

    try {
      await deleteResearch({ userId, researchId: id }).unwrap();
      toast.success("Research deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete research");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg mt-3">
      <h2 className="text-lg font-bold pb-3 border-b border-gray-200/70 mb-4">Research & Publications</h2>

      <div className="grid grid-cols-2 gap-4">
      

        {/* Research */}
        <div className="p-4 border border-gray-200/70 rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Research</h3>
            <button
              onClick={handleAddClick}
              title="Add Research"
              className="text-white bg-[#1C3BA4] rounded-full p-3 hover:bg-[#163185] flex items-center gap-1"
            >
              <Plus size={16} />
            </button>
          </div>

          <ul className="list-disc ml-4 text-sm text-gray-700 space-y-2 flex-1 overflow-auto max-h-72">
            {researchList.length === 0 && <p className="text-gray-500">No research found.</p>}
            {researchList.map((item) => (
              <li key={item.id} className="relative group">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.research_name}</span> ({item.publication_year})
                    <br />
                    <span className="text-gray-500 text-xs">Published by: {item.published_by}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Research"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Research"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
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
