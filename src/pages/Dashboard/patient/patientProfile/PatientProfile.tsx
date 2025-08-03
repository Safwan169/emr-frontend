import PatientProfileCard from "./components/PatientProfileCard";
import ProfileInfoContainer from "./components/profileContainer/ProfileInfoContainer";

const PatientProfile = () => {
  return (
    <div className="space-y-4 max-w-7xl px-2">
      <PatientProfileCard />
      <ProfileInfoContainer />
    </div>
  );
};

export default PatientProfile;
