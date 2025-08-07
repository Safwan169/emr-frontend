import Available from "./components/Available";
import Cleander from "./components/Cleander";
import TotalVisit from "./components/TotalVisit";
import Upcoming from "./components/Upcoming";

const PatientDashboard = () => {

  console.log('dfasf')
  return (
    <div>
      <div className=" gap-3 grid grid-cols-1 xl:grid-cols-2 ">
        <div className="space-y-3">
          <TotalVisit />
          <Available />
        </div>
        <div className=" space-y-3">
        <div className="w-full mt-4 xl:mt-0">
          <Cleander  weatherComponent={true}/>
        </div>
          <Upcoming />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
