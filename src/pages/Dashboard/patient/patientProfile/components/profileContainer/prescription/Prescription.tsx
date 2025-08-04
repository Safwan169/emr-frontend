import CurrentPrescription from "./currentPrescription/CurrentPrescription";
import PreferredPharmacy from "./preferredPharmacy/PreferredPharmacy";
import PreviousPrescription from "./previousPrescription/PreviousPrescription";

const Prescription = () => {
  return (
    <div>
      <CurrentPrescription />
      <PreviousPrescription />
      <PreferredPharmacy />
    </div>
  );
};

export default Prescription;
