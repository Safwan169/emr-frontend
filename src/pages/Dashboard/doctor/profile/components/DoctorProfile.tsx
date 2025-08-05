import React from "react";
import Contact from "./Contact";
import Education from "./Education";
import Certifications from "./Certifications";
import Publication_Research from "./Publication_Research";
import PersonalDetails from "./PersonalDeatils";
import { useGetDoctorProfileQuery } from "../../../../../redux/features/doctor/doctorApi";

const DoctorProfile: React.FC = () => {
  const { userId } = JSON.parse(localStorage.getItem("profileInfo") || "{}");

  const { data: doctorData,refetch, isLoading, isError, } = useGetDoctorProfileQuery(userId);

  console.log("Doctor Data:", doctorData);

  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Loading profile...</div>;
  }

  if (isError || !doctorData?.data) {
    return <div className="p-4 text-center text-red-500">Failed to load profile data.</div>;
  }

  const doctor = doctorData.data;

  const personalInfo = {
    first_name: `${doctor?.user?.first_name || ""} `,
    last_name:`${doctor?.user?.last_name || ""}`,
    specialization: doctor?.specialization || "N/A",
    license_number: doctor?.license_number || "N/A",
    email: doctor?.user?.email || "N/A",
    phone: doctor?.phone || "N/A",
    hospital: doctor?.hospital || "N/A",
    years_of_experience: `${doctor?.years_of_experience || 0} `,
   
  };

  const educationList = doctor?.DoctorProfileEducationAndQualification || [];
  const certifications = doctor?.DoctorCertification || [];
  const researchList = doctor?.DoctorResearchAndPublication || [];

  return (
    <div className="max-w-5xl mx-auto">
      <PersonalDetails reftch={refetch} image="ad" personalInfo={personalInfo} />
      <Contact personalInfo={personalInfo} />
      <Education reftch={refetch} userId={userId} education={educationList} />
      <Certifications userId={userId} certifications={certifications} />
      <Publication_Research
        userId={userId}
        publications={[]} // Add if backend sends publications
        research={researchList}
      />
    </div>
  );
};

export default DoctorProfile;
