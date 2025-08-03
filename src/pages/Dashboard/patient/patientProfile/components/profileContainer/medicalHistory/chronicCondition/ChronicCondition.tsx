import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateChronicConditionMutation,
  useDeleteChronicConditionByIdMutation,
  useGetChronicConditionByIdQuery,
  useUpdateChronicConditionByIdMutation,
} from "../../../../../../../../redux/features/choronic/choronicApi";
import { ChronicCondition } from "../../../../../../../../types/patientTypes";
import Pagination from "./Pagination";

const ChronicConditions = () => {
  const { data, isLoading, isError } = useGetChronicConditionByIdQuery(1);
  const [deleteChronic] = useDeleteChronicConditionByIdMutation();
  const [updateChronic] = useUpdateChronicConditionByIdMutation();
  const [createChronic] = useCreateChronicConditionMutation();

  const chronicData = (data || []) as ChronicCondition[];

  const [chronicPage, setChronicPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCondition, setEditingCondition] =
    useState<ChronicCondition | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    diagnosed: "",
    treating_physician: "",
  });

  const itemsPerPage = 2;

  // Calculate pagination data
  const getPaginatedData = <T,>(data: T[], currentPage: number): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data: any[]) => Math.ceil(data.length / itemsPerPage);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createChronic({
        ...formData,
        id: 1,
        diagnosed: new Date(formData.diagnosed).toISOString(),
        last_updated: new Date().toISOString(),
      }).unwrap();

      console.log("my c result", result);

      setFormData({ name: "", diagnosed: "", treating_physician: "" });
      setShowCreateForm(false);
      toast.success("✅ Chronic condition created successfully!");
    } catch (error) {
      console.error("Failed to create chronic condition:", error);
      toast.error("❌ Failed to create chronic condition. Please try again.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCondition) return;

    try {
      const result = await updateChronic({
        id: editingCondition.id,
        ...formData,
        diagnosed: new Date(formData.diagnosed).toISOString(),
        last_updated: new Date().toISOString(),
      }).unwrap();

      console.log("update r", result);

      setFormData({ name: "", diagnosed: "", treating_physician: "" });
      setEditingCondition(null);
      toast.success("✅ Chronic condition updated successfully!");
    } catch (error) {
      console.error("Failed to update chronic condition:", error);
      toast.error("❌ Failed to update chronic condition. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteChronic(id).unwrap();
      toast.success("🗑️ Chronic condition deleted successfully!");
    } catch (error) {
      console.error("Failed to delete chronic condition:", error);
      toast.error("❌ Failed to delete chronic condition. Please try again.");
    }
  };

  // Open edit form
  const openEditForm = (condition: ChronicCondition) => {
    setEditingCondition(condition);
    setFormData({
      name: condition.name,
      diagnosed: new Date(condition.diagnosed).toISOString().split("T")[0],
      treating_physician: condition.treating_physician,
    });
  };

  // Close forms
  const closeForms = () => {
    setShowCreateForm(false);
    setEditingCondition(null);
    setFormData({ name: "", diagnosed: "", treating_physician: "" });
  };

  if (isLoading)
    return <p className="text-gray-500">Loading chronic conditions...</p>;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Current Chronic Conditions
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add New Condition
        </button>
      </div>

      {isError || chronicData.length === 0 ? (
        <p className="text-red-500">No chronic conditions found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getPaginatedData(chronicData, chronicPage).map(
              (condition, index) => (
                <div
                  key={condition.id || index}
                  className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-semibold text-gray-900">
                      {condition.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditForm(condition)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(condition.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <span>
                        Diagnosed:{" "}
                        {new Date(condition.diagnosed).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <span>
                        Treating Physician: {condition.treating_physician}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <span>
                        Last Updated:{" "}
                        {new Date(condition.last_updated).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <Pagination
            currentPage={chronicPage}
            totalPages={getTotalPages(chronicData)}
            onPageChange={setChronicPage}
          />
        </>
      )}

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingCondition) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingCondition
                ? "Edit Chronic Condition"
                : "Add New Chronic Condition"}
            </h3>

            <form onSubmit={editingCondition ? handleUpdate : handleCreate}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Condition Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter condition name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="diagnosed"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Diagnosis Date *
                  </label>
                  <input
                    type="date"
                    id="diagnosed"
                    name="diagnosed"
                    value={formData.diagnosed}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="treating_physician"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Treating Physician *
                  </label>
                  <input
                    type="text"
                    id="treating_physician"
                    name="treating_physician"
                    value={formData.treating_physician}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter physician name"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeForms}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  {editingCondition ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChronicConditions;
