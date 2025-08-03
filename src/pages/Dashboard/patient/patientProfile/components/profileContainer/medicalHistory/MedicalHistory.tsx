import ChronicConditions from "./chronicCondition/ChronicCondition";
import ImmunizationHistory from "./immunizationHistory/ImmunizationHistory";
import SurgicalHistory from "./surgicalHistory/SurgicalHistory";

const MedicalHistory = () => {
  return (
    <div className="mx-auto bg-white px-4 sm:px-6 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Medical History Overview
      </h1>

      <ChronicConditions />
      <SurgicalHistory />
      <ImmunizationHistory />
    </div>
  );
};

export default MedicalHistory;
