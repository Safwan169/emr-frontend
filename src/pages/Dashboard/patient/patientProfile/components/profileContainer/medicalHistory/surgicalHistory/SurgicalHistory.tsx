import { Edit, MapPin, Trash2, User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast"; // Changed from react-toastify
import {
  useCreateSurgicalConditionMutation,
  useDeleteSurgicalConditionByIdMutation,
  useGetSurgicalConditionByIdQuery,
  useUpdateSurgicalConditionByIdMutation,
} from "../../../../../../../../redux/features/surgical/surgicalApi";
import {
  createSurgicalHistorySchema,
  updateSurgicalHistorySchema,
} from "../../../../../../../../schemas/surgical.schema";
import { ISurgicalHistory } from "../../../../../../../../types/patientTypes";
import Pagination from "../chronicCondition/Pagination";

const userId = 1;

const SurgicalHistory = () => {
  const {
    data: surgicalData,
    isLoading,
    isError,
  } = useGetSurgicalConditionByIdQuery(1);

  console.log("surgicalData", surgicalData);

  const [deleteSurgical] = useDeleteSurgicalConditionByIdMutation();
  const [updateSurgical] = useUpdateSurgicalConditionByIdMutation();
  const [createSurgical] = useCreateSurgicalConditionMutation();

  const [surgicalPage, setSurgicalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ISurgicalHistory | null>(null);
  const [formData, setFormData] = useState<ISurgicalHistory>({
    procedure: "",
    surgery_date: "",
    surgeon_name: "",
    hospital_name: "",
    complications: "",
  });

  const itemsPerPage = 2;

  const surgicalHistory: ISurgicalHistory[] = surgicalData || [];

  const getPaginatedData = <T,>(data: T[], currentPage: number): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data: any[]) => Math.ceil(data.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      procedure: "",
      surgery_date: "",
      surgeon_name: "",
      hospital_name: "",
      complications: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: ISurgicalHistory) => {
    setEditingItem(item);
    setFormData({
      ...item,
      surgery_date: item.surgery_date.split("T")[0], // Convert to date input format
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    // Custom confirmation toast with promise
    toast.promise(
      new Promise<string>((resolve, reject) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this surgical history?"
        );
        if (confirmDelete) {
          deleteSurgical(id)
            .unwrap()
            .then(() => resolve("Surgical history deleted successfully!"))
            .catch((error) => {
              console.error("Error deleting surgical history:", error);
              reject("Failed to delete surgical history. Please try again.");
            });
        } else {
          reject("Delete cancelled");
        }
      }),
      {
        loading: "Deleting surgical history...",
        success: (message: string) => message,
        error: (err: string) => (err !== "Delete cancelled" ? err : null),
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading(
      editingItem
        ? "Updating surgical history..."
        : "Adding surgical history..."
    );

    try {
      const schema = editingItem
        ? updateSurgicalHistorySchema
        : createSurgicalHistorySchema;

      const cleanPayload = {
        procedure: formData.procedure,
        surgery_date: new Date(formData.surgery_date).toISOString(),
        surgeon_name: formData.surgeon_name,
        hospital_name: formData.hospital_name,
        complications: formData.complications,
      };

      // ✅ Yup validation
      await schema.validate(cleanPayload, { abortEarly: false });

      if (editingItem) {
        await updateSurgical({
          id: editingItem.id!,
          data: cleanPayload,
        }).unwrap();

        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Surgical history updated successfully!", {
          duration: 3000,
          icon: "✅",
        });
      } else {
        await createSurgical({
          id: userId,
          data: cleanPayload,
        }).unwrap();

        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Surgical history added successfully!", {
          duration: 3000,
          icon: "🎉",
        });
      }

      setIsModalOpen(false);
    } catch (error: any) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (error.name === "ValidationError") {
        toast.error(error.errors?.[0] || "Validation failed.", {
          duration: 4000,
          icon: "❌",
        });
      } else {
        console.error("Error saving surgical history:", error);
        toast.error(
          editingItem
            ? "Failed to update surgical history. Please try again."
            : "Failed to add surgical history. Please try again.",
          {
            duration: 4000,
            icon: "⚠️",
          }
        );
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Surgical History
        </h2>
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Surgical History
        </h2>
        <div className="text-center py-8 text-red-500">
          Error loading surgical history
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Surgical History
        </h2>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-[#1a3eab] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Add New
        </button>
      </div>

      <div className="space-y-4">
        {surgicalHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No surgical history found. Click "Add Surgery" to add one.
          </div>
        ) : (
          getPaginatedData(surgicalHistory, surgicalPage).map(
            (surgery, index) => (
              <div
                key={surgery.id || index}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-gray-900">
                    {surgery.procedure}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm text-gray-500">
                      {formatDate(surgery.surgery_date)}
                    </span>
                    <button
                      onClick={() => handleEdit(surgery)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(surgery.id!)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Surgeon: {surgery.surgeon_name}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-green-500" />
                    <span>Hospital: {surgery.hospital_name}</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        !surgery.complications ||
                        surgery.complications.toLowerCase() === "none"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <span>
                      Complications: {surgery.complications || "None"}
                    </span>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>

      {surgicalHistory.length > 0 && (
        <Pagination
          currentPage={surgicalPage}
          totalPages={getTotalPages(surgicalHistory)}
          onPageChange={setSurgicalPage}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingItem ? "Edit Surgery" : "Add New Surgery"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Procedure *
                </label>
                <input
                  type="text"
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter procedure name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surgery Date *
                </label>
                <input
                  type="date"
                  name="surgery_date"
                  value={formData.surgery_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surgeon Name *
                </label>
                <input
                  type="text"
                  name="surgeon_name"
                  value={formData.surgeon_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter surgeon name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital Name *
                </label>
                <input
                  type="text"
                  name="hospital_name"
                  value={formData.hospital_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hospital name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complications
                </label>
                <textarea
                  name="complications"
                  value={formData.complications}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any complications (optional)"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurgicalHistory;
