/* eslint-disable no-restricted-globals */
import { Calendar, Edit, Eye, FileText, Plus, Save, X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  useCreatePreviousLabReportMutation,
  useDeletePreviousLabReportByIdMutation,
  useGetPreviousLabReportByIdQuery,
  useUpdatePreviousLabReportByIdMutation,
} from "../../../../../../../../redux/features/previousLabReport/previousLabReport";

export interface TLabReportImage {
  id: number;
  description: string;
  file_url: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  url: string;
}

interface ImageModalProps {
  image: TLabReportImage | null;
  onClose: () => void;
}

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LabReportFormData) => void;
  isCreating: boolean;
}

interface LabReportFormData {
  description: string;
  file: File | null;
}

const userId = 1;

// Move ImageModal outside of main component to prevent re-creation
const ImageModal: React.FC<ImageModalProps> = React.memo(
  ({ image, onClose }) => {
    if (!image) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-lg max-w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-auto w-full mx-2 sm:mx-0">
          <div className="flex justify-between items-center p-3 sm:p-4 border-b">
            <h3 className="text-sm sm:text-lg font-semibold truncate pr-2">
              Lab Report Details
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="p-3 sm:p-4">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}${image.url}`}
              alt="lab report"
              className="max-w-full h-auto mx-auto"
            />
            <div className="mt-4 text-xs sm:text-sm text-gray-600">
              <p>
                <strong>Uploaded:</strong> {image.created_at}
              </p>
              {image.description && (
                <p>
                  <strong>Description:</strong> {image.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Move CreateModal outside and memoize it
const CreateModal: React.FC<
  CreateModalProps & {
    createFormData: LabReportFormData;
    setCreateFormData: React.Dispatch<React.SetStateAction<LabReportFormData>>;
    formErrors: { [key: string]: string };
    setFormErrors: React.Dispatch<
      React.SetStateAction<{ [key: string]: string }>
    >;
  }
> = React.memo(
  ({
    isOpen,
    onClose,
    onSubmit,
    isCreating,
    createFormData,
    setCreateFormData,
    formErrors,
    setFormErrors,
  }) => {
    const handleClose = useCallback(() => {
      // Reset form when closing
      setCreateFormData({
        description: "",
        file: null,
      });
      setFormErrors({});

      // Reset file input
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      onClose();
    }, [onClose, setCreateFormData, setFormErrors]);

    const handleDescriptionChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCreateFormData((prev) => ({
          ...prev,
          description: e.target.value,
        }));
      },
      [setCreateFormData]
    );

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        console.log(
          "File selected:",
          file
            ? {
                name: file.name,
                size: file.size,
                type: file.type,
              }
            : null
        );

        setCreateFormData((prev) => ({
          ...prev,
          file: file,
        }));
      },
      [setCreateFormData]
    );

    const handleSubmit = useCallback(() => {
      onSubmit(createFormData);
    }, [onSubmit, createFormData]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Add New Lab Report</h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={createFormData.description}
                  onChange={handleDescriptionChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                    formErrors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  rows={3}
                  placeholder="Enter lab report description..."
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lab Report Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                    formErrors.file ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.file && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.file}</p>
                )}

                {/* Show selected file info */}
                {createFormData.file && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                    <p>
                      <strong>Selected:</strong> {createFormData.file.name}
                    </p>
                    <p>
                      <strong>Size:</strong>{" "}
                      {(createFormData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p>
                      <strong>Type:</strong> {createFormData.file.type}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isCreating}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isCreating ? "Uploading..." : "Upload Lab Report"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isCreating}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const PreviousLabReport: React.FC = () => {
  // States
  const [viewingImage, setViewingImage] = useState<TLabReportImage | null>(
    null
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // RTK Query hooks
  const {
    data: labReportData,
    isLoading,
    isError,
    refetch,
  } = useGetPreviousLabReportByIdQuery(1);

  const [deleteLabReport, { isLoading: isDeleting }] =
    useDeletePreviousLabReportByIdMutation();

  const [updateLabReport, { isLoading: isUpdating }] =
    useUpdatePreviousLabReportByIdMutation();

  const [createLabReport, { isLoading: isCreating }] =
    useCreatePreviousLabReportMutation();

  // Form states
  const [createFormData, setCreateFormData] = useState<LabReportFormData>({
    description: "",
    file: null,
  });

  const [updateFormData, setUpdateFormData] = useState<LabReportFormData>({
    description: "",
    file: null,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  console.log("labReportData", labReportData);

  // Memoize transformed data to prevent unnecessary re-renders
  const transformedData: TLabReportImage[] = useMemo(
    () =>
      labReportData?.map((item: TLabReportImage) => ({
        id: item.id,
        name: `Lab Report ${item.id}`,
        uploadDate: new Date(item.created_at).toLocaleDateString("en-GB"),
        url: item.file_url,
        description: item.description,
        created_at: new Date(item.created_at).toLocaleDateString("en-GB"),
      })) || [],
    [labReportData]
  );

  // Memoize utility functions
  const buildFormData = useCallback(
    (file: File, description: string): FormData => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);
      formData.append("user_id", userId.toString());

      console.log("FormData contents:");
      console.log("- file:", file.name, `(${file.size} bytes, ${file.type})`);
      console.log("- description:", description);
      console.log("- user_id:", userId.toString());

      return formData;
    },
    []
  );

  const validateForm = useCallback(
    (data: LabReportFormData): { [key: string]: string } => {
      const errors: { [key: string]: string } = {};

      if (!data.description.trim()) {
        errors.description = "Description is required";
      }

      if (!data.file) {
        errors.file = "Please select an image";
      } else {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(data.file.type)) {
          errors.file =
            "Please select a valid image file (JPEG, PNG, GIF, WebP)";
        }

        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (data.file.size > maxSize) {
          errors.file = "File size must be less than 10MB";
        }
      }

      return errors;
    },
    []
  );

  // Memoize handlers
  const onCreateSubmit = useCallback(async () => {
    setFormErrors({});

    console.log("Create form data:", {
      description: createFormData.description,
      file: createFormData.file
        ? {
            name: createFormData.file.name,
            size: createFormData.file.size,
            type: createFormData.file.type,
          }
        : null,
    });

    const errors = validateForm(createFormData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);

      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: Object.values(errors)
          .map((error) => `• ${error}`)
          .join("<br>"),
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    try {
      if (createFormData.file) {
        const formData = buildFormData(
          createFormData.file,
          createFormData.description
        );

        console.log("lab report formData", formData);

        const result = await createLabReport({
          id: userId,
          data: formData,
        }).unwrap();

        console.log("API Response:", result);

        setCreateFormData({
          description: "",
          file: null,
        });
        setFormErrors({});
        setShowCreateModal(false);

        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }

        refetch();

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Lab report uploaded successfully!",
          confirmButtonColor: "#7c3aed",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error: any) {
      console.error("Error creating lab report:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to create lab report. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: errorMessage,
        confirmButtonColor: "#7c3aed",
      });
    }
  }, [createFormData, validateForm, buildFormData, createLabReport, refetch]);

  const onUpdateSubmit = useCallback(async () => {
    if (!editingId) return;

    try {
      const formData = new FormData();
      formData.append("description", updateFormData.description);

      if (updateFormData.file) {
        formData.append("file", updateFormData.file);
      }

      await updateLabReport({
        id: editingId,
        data: formData,
      }).unwrap();

      setUpdateFormData({
        description: "",
        file: null,
      });
      setEditingId(null);

      refetch();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Lab report updated successfully!",
        confirmButtonColor: "#7c3aed",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error: any) {
      console.error("Error updating lab report:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update lab report. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: errorMessage,
        confirmButtonColor: "#7c3aed",
      });
    }
  }, [editingId, updateFormData, updateLabReport, refetch]);

  const handleDelete = useCallback(
    async (id: number) => {
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
        await deleteLabReport(id).unwrap();
        refetch();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Lab report deleted successfully!",
          confirmButtonColor: "#7c3aed",
          timer: 3000,
          timerProgressBar: true,
        });
      } catch (error: any) {
        console.error("Error deleting lab report:", error);

        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Failed to delete lab report. Please try again.";

        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: errorMessage,
          confirmButtonColor: "#7c3aed",
        });
      }
    },
    [deleteLabReport, refetch]
  );

  const startEdit = useCallback((image: TLabReportImage) => {
    setEditingId(image.id);
    setUpdateFormData({
      description: image.description || "",
      file: null,
    });
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setUpdateFormData({
      description: "",
      file: null,
    });
  }, []);

  const handleModalClose = useCallback(() => {
    setShowCreateModal(false);
    setCreateFormData({
      description: "",
      file: null,
    });
    setFormErrors({});
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Error Loading Lab Reports
          </h3>
          <p className="text-red-600 mb-4">
            Failed to load your lab reports. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Previous Lab Reports
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[#1a3eab] text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      {transformedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {transformedData.map((image) => {
            console.log("lab report image", image);
            return (
              <div
                key={image.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${image.url}`}
                    alt="lab report"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDelete(image.id)}
                    disabled={isDeleting}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  {editingId === image.id ? (
                    // Edit Form
                    <div className="space-y-2">
                      <textarea
                        value={updateFormData.description}
                        onChange={(e) =>
                          setUpdateFormData({
                            ...updateFormData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        rows={2}
                        placeholder="Description"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setUpdateFormData({
                            ...updateFormData,
                            file: e.target.files?.[0] || null,
                          })
                        }
                        className="w-full text-xs"
                      />
                      <div className="flex space-x-1">
                        <button
                          onClick={onUpdateSubmit}
                          disabled={isUpdating}
                          className="flex-1 flex items-center justify-center space-x-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50"
                        >
                          <Save className="w-3 h-3" />
                          <span>{isUpdating ? "Saving..." : "Save"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display Mode
                    <>
                      <div className="space-y-1 text-xs sm:text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">
                            Uploaded: {image.created_at}
                          </span>
                        </div>
                        {image.description && (
                          <p className="text-xs text-gray-500 truncate">
                            {image.description}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setViewingImage(image)}
                          className="flex-1 flex items-center justify-center space-x-1 px-2 py-2 bg-[#1a3eab] text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => startEdit(image)}
                          className="flex items-center justify-center px-2 py-2 bg-green-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 sm:p-8 text-center">
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No previous lab reports uploaded
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 px-2">
            Upload images of your past lab reports to keep track of your medical
            test results
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Lab Report</span>
          </button>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal image={viewingImage} onClose={() => setViewingImage(null)} />

      {/* Create Modal */}
      <CreateModal
        isOpen={showCreateModal}
        onClose={handleModalClose}
        onSubmit={onCreateSubmit}
        isCreating={isCreating}
        createFormData={createFormData}
        setCreateFormData={setCreateFormData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
      />
    </div>
  );
};

export default PreviousLabReport;
