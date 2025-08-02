import AppointmentsList from "./components/AppointmentsList";
import AppointmentTabs from "./components/AppointmentTabs";
import RecentActivites from "./components/RecentActivites";

const Appointments = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="bg-white p-3 rounded-lg w-full lg:w-[60%]">
        <AppointmentTabs />
        <AppointmentsList />
      </div>
      <div className="w-full lg:w-[40%]  p-3 lg:p-0">
        <RecentActivites />
      </div>
    </div>
  );
};

export default Appointments;
