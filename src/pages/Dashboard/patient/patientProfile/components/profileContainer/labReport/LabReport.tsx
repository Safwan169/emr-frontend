import CurrentLabReport from "./currentLabReport/CurrentLabReport";
import PreferredLaboratory from "./preferredLaboratory/PreferredLaboratory";
import PreviousLabReport from "./previousLabReport/PreviousLabReport";

const LabReport = () => {
  return (
    <div>
      <CurrentLabReport />
      <PreviousLabReport />
      <PreferredLaboratory />
    </div>
  );
};

export default LabReport;
