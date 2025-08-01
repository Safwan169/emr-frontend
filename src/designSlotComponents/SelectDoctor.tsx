import CalenderPicker from "./CalenderPicker";
import NeedHelp from "./components/NeedHelp";
import SelectedDoctorCard from "./components/SelectedDoctorCard";
import TimeSlotPicker from "./components/TimeSlotPicker";

const SelectDoctor = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 px-10 gap-5">
      <div className="md:col-span-2">
        <CalenderPicker />
        <div className="mt-4">
          <TimeSlotPicker />
        </div>
      </div>
      <div className="md:col-span-1 space-y-5">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Selected Doctor Section */}
          <SelectedDoctorCard />
        </div>

        {/* Need Help Section */}
        <NeedHelp />
      </div>
    </div>
  );
};

export default SelectDoctor;
