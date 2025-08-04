import { Check, GraduationCap, Pencil } from "lucide-react";
import React from "react";

const DoctorProfile: React.FC = () => {
  // Simulating API response data
  const data = {
    personalInfo: {
      name: "Sakib Khan",
      specialization: "Cardiologist",
      license: "MD123456789",
      email: "sakib.khan@starsmartz.net",
      phone: "+000000000000000",
      hospital: "Starsmartz General Hospital",
      experience: "15 years",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    education: [
      {
        degree: "Bachelor of Science",
        institution: "Johns Hopkins Hospital",
        year: "1991-1995",
        details: "Major: Biology, Minor: Chemistry",
      },
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Harvard Medical School",
        year: "1995-2001",
        details: "Magna Cum Laude, Alpha Omega Alpha Honor Society",
      },
      {
        degree: "Residency in Internal Medicine",
        institution: "Johns Hopkins Hospital",
        year: "2001-2004",
        details: "Chief Resident - Final Year",
      },
      {
        degree: "Fellowship in Cardiology",
        institution: "Mayo Clinic",
        year: "2004-2007",
        details: "Specialized in Interventional Cardiology",
      },
    ],
    certifications: [
      { name: "American Board of Cardiology", year: "2007", validUntil: "2027", isActive: true },
      { name: "American Board of Internal Medicine", year: "2004", validUntil: "2024" },
      { name: "Advanced Cardiac Life Support (ACLS)", year: "2007", validUntil: "2027", isActive: true },
    ],
    awards: [
      { title: "Excellence in Patient Care Award", organization: "Metropolitan General Hospital", year: "2023" },
      { title: "Research Excellence Award", organization: "American College of Cardiology", year: "2021" },
      { title: "Top Doctor in Cardiology", organization: "City Medical Magazine", year: "2022, 2023" },
      { title: "Teaching Excellence Award", organization: "Medical Residents Program", year: "2020" },
    ],
    publications: [
      {
        title: "Advances in Minimally Invasive Cardiac Procedures",
        journal: "Journal of Cardiovascular Medicine",
        date: "January 2024",
      },
      {
        title: "Patient Outcomes in Transcatheter Aortic Valve Replacement",
        journal: "American Heart Journal",
        date: "September 2023",
      },
      {
        title: "Innovation in Heart Failure Management",
        journal: "Circulation Research",
        date: "June 2023",
      },
    ],
    research: {
      topics: [
        "AI-Assisted Diagnosis in Echocardiography",
        "Long-term Outcomes of Drug-Eluting Stents",
        "Telemedicine in Rural Cardiac Care",
      ],
    },
  };

  const { personalInfo, education, certifications, awards, publications, research } = data;

  return (
    <div className="max-w-5xl  ">
      {/* Header */}
      <div className="flex bg-white p-6  shadow rounded-lg justify-between border-b pb-4 ">
        <div className="flex items-center  ">

          <div className="relative">


            <img
              src={personalInfo.image}
              alt="Doctor"
              className="w-20 h-20 rounded-full object-cover mr-4"
            />
            <div className="bg-[#1C3BA4] absolute bottom-1 right-3 text-white w-6 h-6 rounded-lg flex items-center justify-center">
              <Pencil size={10} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
            <p className="text-blue-600 text-gray-500/95 font-medium">{personalInfo.specialization}</p>
            <p className="text-gray-500">License #: {personalInfo.license}</p>
          </div>
        </div>

        <div className="bg-[#1C3BA4] text-white w-8 h-8 rounded-lg flex items-center justify-center">
          <Pencil size={15} />
        </div>
      </div>

      {/* Contact Info */}
      <div className=" bg-white p-6 shadow rounded-lg gap-4 mt-3 text-sm">
        <h1 className=" border-b  font-bold text-[16px] border-gray-200/70 pb-3">Personal Information</h1>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div>
            <p className="text-gray-500/95 font-medium">Name</p>
            <p>{personalInfo.name}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Specialization</p>
            <p>{personalInfo.specialization}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Email</p>
            <p>{personalInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Phone</p>
            <p>{personalInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Hospital/Clinic</p>
            <p>{personalInfo.hospital}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Years of Experience</p>
            <p>{personalInfo.experience}</p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className=" bg-white p-6 shadow rounded-lg mt-3">

        <h2 className="text-lg font-bold pb-3 border-b border-gray-200/70 mb-4">Education & Qualifications</h2>
        <div className="space-y-3 mb-6">
          {education.map((edu, index) => (
            <div className="flex gap-3 p-4 border border-gray-200/70 rounded-lg bg-white">
              <GraduationCap className="w-10 h-10  text-[#1C3BA4] bg-[#ebedf7] p-2 rounded-full" />


              <div key={index} className=" max-w-xl space-y-2 w-full">
                <p className="text-[16px] font-medium">{edu.degree}</p>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.details && <p className="text-sm text-gray-500">{edu.details}</p>}
              </div>
              <p className="text-[16px] font-medium">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white p-6 shadow rounded-lg mt-3">
        <h2 className="text-lg font-bold pb-3 border-b border-gray-200/70 mb-4">Board Certifications</h2>
        <div className=" grid grid-cols-2 gap-4 mb-6">
          {certifications.map((cert, index) => (
            <div key={index} className="p-4 flex justify-between   border border-gray-200/70 rounded-lg bg-white">
              <div className="space-y-3">
                <p className="  text-[18px] font-medium">{cert.name}</p>
                <p className="text-[14px] font-normal text-gray-600">
                  Certified {cert.year} •{" "}
                  <span className="text-green-600 text-[14px]">Valid until {cert.validUntil}</span>
                </p>
              </div>
              <div>

                <Check size={25} className="text-[#00AA19] " />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="bg-white p-6 shadow rounded-lg mt-3">
        <h2 className="text-lg font-bold pb-3 border-b border-gray-200/70 mb-4">Awards</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {awards.map((award, index) => (
            <div key={index} className="p-4 border border-gray-200/70 rounded-lg ">
              <p className="text-gray-500/95 font-medium">{award.title}</p>
              <p className="text-sm text-gray-500">{award.organization} • {award.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Publications & Research */}
      <div className=" bg-white p-6 shadow rounded-lg mt-3">

        <h2 className="text-lg font-bold pb-3 border-b border-gray-200/70 mb-4">Research & Publications</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200/70 rounded-lg ">
            <h3 className="font-semibold mb-2">Recent Publications</h3>
            <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
              {publications.map((pub, index) => (
                <li key={index}>
                  <span className="text-gray-500/95 font-medium">{pub.title}</span>
                  <br />
                  <span className="text-gray-500">{pub.journal} • {pub.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border border-gray-200/70 rounded-lg ">
            <h3 className="font-semibold mb-2">Current Research Projects</h3>
            <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
              {research.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
