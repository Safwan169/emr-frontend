import {
  AlertTriangle,
  ClipboardList,
  FileText,
  Pill,
  User,
} from "lucide-react";
import { useState } from "react";
import Allergies from "./allergies/Allergies";
import LabReports from "./labReport/LabReport";
import MedicalHistory from "./medicalHistory/MedicalHistory";
import PersonalInfo from "./personalInfo/PersonalInfo";
import Prescription from "./prescription/Prescription";

export default function MedicalInfoInterface() {
  const [activeTab, setActiveTab] = useState(0);

  const navItems = [
    { icon: User, label: "Personal Info" },
    { icon: FileText, label: "Medical History" },
    { icon: Pill, label: "Prescriptions" },
    { icon: ClipboardList, label: "Lab reports" },
    { icon: AlertTriangle, label: "Allergies" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <MedicalHistory />;
      case 2:
        return (
          <>
            <Prescription />
          </>
        );
      case 3:
        return <LabReports />;
      case 4:
        return <Allergies />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-6 py-4 cursor-pointer border-b-2 transition-colors ${
              activeTab === index
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            } w-full md:w-auto`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">{renderContent()}</div>
    </div>
  );
}
