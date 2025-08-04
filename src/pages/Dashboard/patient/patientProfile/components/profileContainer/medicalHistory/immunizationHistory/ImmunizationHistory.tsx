import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  useCreateImmunizationMutation,
  useDeleteImmunizationByIdMutation,
  useGetImmunizationByIdQuery,
  useUpdateImmunizationByIdMutation,
} from "../../../../../../../../redux/features/immunization/immunizationApi";
import {
  createImmunizationSchema,
  updateImmunizationSchema,
} from "../../../../../../../../schemas/immunization.schema";
import { TImmunizationHistory } from "../../../../../../../../types/patientTypes";
import Pagination from "../chronicCondition/Pagination";

const userId = 1;

// Date formatting utility function
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }

    // Format as MM/dd/yyyy
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (error) {
    return dateString; // Return original if error
  }
};

// Convert MM/dd/yyyy back to yyyy-MM-dd for input field
const formatDateForInput = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    return dateString;
  }
};

const ImmunizationHistory = () => {
  const [immunizationPage, setImmunizationPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TImmunizationHistory | null>(
    null
  );
  const [formData, setFormData] = useState<TImmunizationHistory>({
    vaccine_name: "",
    date: "",
    dose_name: "",
    vaccine_provider: "",
  });

  const itemsPerPage = 2;

  // RTK Query hooks
  const {
    data: immunizationData,
    isLoading,
    isError,
  } = useGetImmunizationByIdQuery(1);
  const [deleteImmunization, { isLoading: isDeleting }] =
    useDeleteImmunizationByIdMutation();
  const [updateImmunization, { isLoading: isUpdating }] =
    useUpdateImmunizationByIdMutation();
  const [createImmunization, { isLoading: isCreating }] =
    useCreateImmunizationMutation();

  console.log("immunizationData", immunizationData);

  // Get immunization history array from the API response
  const immunizationHistory: TImmunizationHistory[] = immunizationData || [];

  const getPaginatedData = <T,>(data: T[], currentPage: number): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data: any[]) => Math.ceil(data.length / itemsPerPage);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      vaccine_name: "",
      date: "",
      dose_name: "",
      vaccine_provider: "",
    });
    setEditingItem(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: TImmunizationHistory) => {
    setFormData({
      vaccine_name: item.vaccine_name,
      date: formatDateForInput(item.date),
      dose_name: item.dose_name,
      vaccine_provider: item.vaccine_provider,
    });
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Choose schema based on mode
      const schema = editingItem
        ? updateImmunizationSchema
        : createImmunizationSchema;

      // ✅ Validate form data
      await schema.validate(formData, { abortEarly: false });

      if (editingItem && editingItem.id) {
        // Update
        await updateImmunization({
          id: editingItem.id,
          data: formData,
        }).unwrap();

        Swal.fire({
          title: "Success!",
          text: "Immunization record updated successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
        });
      } else {
        // Create
        await createImmunization({ id: userId, data: formData }).unwrap();

        Swal.fire({
          title: "Success!",
          text: "Immunization record created successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
        });
      }

      closeModal();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        // ✅ Show all validation messages
        const errorMessages = err.inner
          .map((error: any) => error.message)
          .join("<br>");

        Swal.fire({
          title: "Validation Error",
          html: errorMessages,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      } else {
        console.error("Unexpected error:", err);

        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this immunization record? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteImmunization(id).unwrap();

        Swal.fire({
          title: "Deleted!",
          text: "Immunization record has been deleted successfully.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
        });
      } catch (error) {
        console.error("Error deleting immunization:", error);

        Swal.fire({
          title: "Error!",
          text: "Failed to delete immunization record. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Loading immunization history...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-8">
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">Error loading immunization history</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Immunization History
        </h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Vaccine
              </th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Dose
              </th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Provider
              </th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {getPaginatedData(immunizationHistory, immunizationPage).map(
              (immunization, index) => (
                <tr
                  key={immunization.id || index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">
                    {immunization.vaccine_name}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                    {formatDate(immunization.date)}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                    {immunization.dose_name}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                    {immunization.vaccine_provider}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(immunization)}
                        className="flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                        disabled={isUpdating}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() =>
                          immunization.id && handleDelete(immunization.id)
                        }
                        className="flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                        disabled={isDeleting}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
            {immunizationHistory.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No immunization records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {immunizationHistory.length > 0 && (
        <Pagination
          currentPage={immunizationPage}
          totalPages={getTotalPages(immunizationHistory)}
          onPageChange={setImmunizationPage}
        />
      )}

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingItem ? "Edit Immunization" : "Add New Immunization"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccine Name
                </label>
                <input
                  type="text"
                  name="vaccine_name"
                  value={formData.vaccine_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dose Name
                </label>
                <input
                  type="text"
                  name="dose_name"
                  value={formData.dose_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccine Provider
                </label>
                <input
                  type="text"
                  name="vaccine_provider"
                  value={formData.vaccine_provider}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isCreating || isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isCreating || isUpdating
                    ? "Saving..."
                    : editingItem
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImmunizationHistory;
