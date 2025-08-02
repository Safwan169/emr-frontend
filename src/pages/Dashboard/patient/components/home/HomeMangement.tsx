import AppointmentConfirmation from "../../../../../designSlotComponents/AppointmentConfirmation";
import AppointmentDetails from "../../../../../designSlotComponents/AppointmentDetails";
import Available from "./Available";
import TotalVisit from "./TotalVisit";
import Upcoming from "./Upcoming";

const HomeMangement = () => {
  return (
    <div className="py-10">
      <TotalVisit />
      <div className="flex flex-col lg:flex-row mt-5 px-6 gap-5">
        <Available />
        <Upcoming />
      </div>

      <div className="my-20">
        <AppointmentConfirmation />
      </div>

      <AppointmentDetails />
    </div>
  );
};

export default HomeMangement;
