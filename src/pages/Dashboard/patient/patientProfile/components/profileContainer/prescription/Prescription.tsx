import CurrentPrescription from "./currentPrescription/CurrentPrescription";
import PreviousPrescription from "./previousPrescription/PreviousPrescription";

const Prescription = () => {
  return (
    <div>
      <CurrentPrescription />
      <PreviousPrescription />
    </div>
  );
};

export default Prescription;
