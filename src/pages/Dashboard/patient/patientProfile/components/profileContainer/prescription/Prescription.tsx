import {
  Calendar,
  Clock,
  Download,
  Eye,
  FileText,
  Phone,
  RotateCcw,
  Upload,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

// Type definitions
interface UploadedImage {
  id: number;
  name: string;
  uploadDate: string;
  prescribedBy: string;
  url: string;
}

interface Prescription {
  id: number;
  name: string;
  prescribedBy: string;
  specialty: string;
  dateIssued: string;
  duration: string;
  dosage: string;
  refillsLeft: string;
  instruction: string;
  status: "Active" | "Completed";
}

interface PrescriptionCardProps {
  prescription: Prescription;
}

interface ImageModalProps {
  image: UploadedImage | null;
  onClose: () => void;
}

const Prescription: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([
    {
      id: 1,
      name: "Prescription_Jan_2025.jpg",
      uploadDate: "15/01/2025",
      prescribedBy: "Dr. Ahmed Rahman",
      url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRyLiBBaG1lZCBSYWhtYW48L3RleHQ+PC9zdmc+",
    },
    {
      id: 2,
      name: "Old_Prescription_Dec_2024.jpg",
      uploadDate: "28/12/2024",
      prescribedBy: "Dr. Fatima Khan",
      url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWZmNmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5MzNjYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRyLiBGYXRpbWEgS2hhbjwvdGV4dD48L3N2Zz4=",
    },
  ]);
  const [viewingImage, setViewingImage] = useState<UploadedImage | null>(null);
  const itemsPerPage: number = 4;

  // Sample prescription data
  const prescriptions: Prescription[] = [
    {
      id: 1,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Active",
    },
    {
      id: 2,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Active",
    },
    {
      id: 3,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Completed",
    },
    {
      id: 4,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Active",
    },
    {
      id: 5,
      name: "Metformin 500mg",
      prescribedBy: "Dr. John Smith",
      specialty: "Endocrinologist",
      dateIssued: "28/07/2025",
      duration: "6 months",
      dosage: "Twice daily with meals",
      refillsLeft: "2 refills left",
      instruction:
        "Take with food to reduce stomach upset. Monitor blood sugar levels.",
      status: "Active",
    },
    {
      id: 6,
      name: "Atorvastatin 20mg",
      prescribedBy: "Dr. Emily Davis",
      specialty: "Cardiologist",
      dateIssued: "25/07/2025",
      duration: "12 months",
      dosage: "Once daily at bedtime",
      refillsLeft: "5 refills left",
      instruction: "Take at bedtime. Avoid grapefruit juice.",
      status: "Active",
    },
  ];

  // Calculate pagination
  const totalPages: number = Math.ceil(prescriptions.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentPrescriptions: Prescription[] = prescriptions.slice(
    startIndex,
    endIndex
  );

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            const newImage: UploadedImage = {
              id: Date.now() + Math.random(),
              name: file.name,
              uploadDate: new Date().toLocaleDateString("en-GB"),
              prescribedBy: "Unknown Doctor",
              url: e.target.result as string,
            };
            setUploadedImages((prev) => [newImage, ...prev]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = "";
  };

  const removeImage = (id: number): void => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
    prescription,
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
            {prescription.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              prescription.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {prescription.status}
          </span>
          <Download className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      <div className="text-xs sm:text-sm text-gray-600 mb-3">
        <span>Prescribed by </span>
        <span className="text-blue-600 font-medium break-words">
          {prescription.prescribedBy}
        </span>
        <span className="text-blue-600 break-words">
          {" "}
          • {prescription.specialty}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Date Issued</div>
          <div className="text-xs sm:text-sm font-medium">
            {prescription.dateIssued}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Duration</div>
          <div className="text-xs sm:text-sm font-medium">
            {prescription.duration}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Dosage</div>
          <div className="text-xs sm:text-sm font-medium break-words">
            {prescription.dosage}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Refills Left</div>
          <div className="text-xs sm:text-sm font-medium">
            {prescription.refillsLeft}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Instructions</div>
        <div className="text-xs sm:text-sm break-words">
          {prescription.instruction}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm">
          <RotateCcw className="w-4 h-4" />
          <span>Request Refill</span>
        </button>
        <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm">
          <User className="w-4 h-4" />
          <span>Contact Doctor</span>
        </button>
      </div>
    </div>
  );

  const Pagination: React.FC = () => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 px-2 space-y-4 sm:space-y-0">
      <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
        Showing {startIndex + 1} to {Math.min(endIndex, prescriptions.length)}{" "}
        of {prescriptions.length} prescriptions
      </div>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );

  const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
    if (!image) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-lg max-w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-auto w-full mx-2 sm:mx-0">
          <div className="flex justify-between items-center p-3 sm:p-4 border-b">
            <h3 className="text-sm sm:text-lg font-semibold truncate pr-2">
              {image.name}
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
              src={image.url}
              alt={image.name}
              className="max-w-full h-auto mx-auto"
            />
            <div className="mt-4 text-xs sm:text-sm text-gray-600">
              <p>
                <strong>Uploaded:</strong> {image.uploadDate}
              </p>
              <p>
                <strong>Prescribed by:</strong> {image.prescribedBy}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-3 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            My Prescriptions
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Request</span>
            </button>
          </div>
        </div>

        {/* Current Chronic Conditions */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Current Chronic Conditions
          </h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {currentPrescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                prescription={prescription}
              />
            ))}
          </div>

          <Pagination />
        </div>

        {/* Previous Prescriptions */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Previous Prescriptions
            </h2>
            <label className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer text-sm">
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {uploadedImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {uploadedImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-medium text-gray-900 mb-2 truncate text-sm">
                      {image.name}
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                          Uploaded: {image.uploadDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{image.prescribedBy}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewingImage(image)}
                      className="flex items-center justify-center space-x-1 px-2 sm:px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full text-xs sm:text-sm"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>View Full Size</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 sm:p-8 text-center">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No previous prescriptions uploaded
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 px-2">
                Upload images of your past prescriptions to keep track of your
                medical history
              </p>
              <label className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer text-sm">
                <Upload className="w-4 h-4" />
                <span>Upload First Image</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Preferred Pharmacy */}
        <div className="bg-gray-200 rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Preferred Pharmacy
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Starlight Pharmacy
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <div className="space-y-1 sm:space-y-2 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-600">
                  3rd Floor, Shaik Bhurhan Tower,
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Lake Road, Sector 07
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Uttara, Dhaka 1230
                </p>
              </div>
              <div className="mt-4 text-center sm:text-left">
                <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium">
                  Change Pharmacy
                </button>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">
                  Phone: +880 18 9231 1409
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">
                  Hours: Mon-Fri 8AM-6PM
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Sat-Sun 9AM-5PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        <ImageModal
          image={viewingImage}
          onClose={() => setViewingImage(null)}
        />
      </div>
    </div>
  );
};

export default Prescription;
