import Cleander from "../patientDashboard/components/Cleander";
import AppointmentsList from "./components/AppointmentsList";
import AppointmentTabs from "./components/AppointmentTabs";
import RecentActivites from "./components/RecentActivites";

const Appointments = () => {
  return (
    <>



      <div className="lg:flex hidden flex-col lg:flex-row gap-5">
        <div className="bg-white p-3 rounded-lg w-full lg:w-[60%]">
          <AppointmentTabs />
          <AppointmentsList />

        </div>
        <div className="w-full lg:w-[40%]  space-y-2 p-3 lg:p-0">
          <Cleander weatherComponent={false} />
          <RecentActivites />
        </div>
      </div>


      <div className="space-y-5 md:hidden md:hidden">
        <AppointmentTabs />
        <AppointmentsList />
          {/* <Cleander weatherComponent={false} /> */}
          <RecentActivites />


      </div>
    </>
  );
};

export default Appointments;
