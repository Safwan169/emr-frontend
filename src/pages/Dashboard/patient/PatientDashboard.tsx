import Available from "./components/home/Available";
import TotalVisit from "./components/home/TotalVisit";
import Upcoming from "./components/home/Upcoming";

const PatientDashboard = () => {
  return (
    <div>
      <div className="py-10">
        <TotalVisit />
        <div className="flex flex-col lg:flex-row mt-5 px-6 gap-5">
          <Available />
          <Upcoming />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
