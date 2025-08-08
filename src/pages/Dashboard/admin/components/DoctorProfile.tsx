import React from 'react';
import { GraduationCap, Stethoscope } from 'lucide-react';

interface Stat {
  title: string;
  img: string;
  value: string;
}

interface Qualification {
  degree: string;
  institution: string;
  year: string;
}

const DoctorProfile: React.FC = () => {
  // Doctor Info
  const doctor = {
    name: 'Sakib Khan',
    specialization: 'Cardiologist',
    rating: 4.7,
    experience: '15 Years Experience',
    image: '/public/Vector.png',
  };

  // Performance Stats
  const stats: Stat[] = [
    { title: 'Patients Treated', img: '/images/patients.png', value: '1,250+' },
    { title: 'Successful Surgeries', img: '/images/surgeries.png', value: '870' },
    { title: 'Years of Service', img: '/images/service.png', value: '15+' },
  ];

  // Education
  const qualifications: Qualification[] = [
    {
      degree: 'MBBS - Bachelor of Medicine & Surgery',
      institution: 'Dhaka Medical College',
      year: '2005 - 2010',
    },
    {
      degree: 'MD - Cardiology',
      institution: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)',
      year: '2011 - 2015',
    },
    {
      degree: 'FACC - Fellow of the American College of Cardiology',
      institution: 'American College of Cardiology',
      year: '2016-2017',
    },
  ];

  // Specializations
  const specialties: string[] = [
    'Interventional Cardiology',
    'Pediatric Cardiology',
    'Electrophysiology',
    'Heart Failure Management',
    'Cardiac Imaging',
    'Preventive Cardiology',
  ];

  return (
    <div className="py-5 px-5 flex flex-col items-center gap-5">
      {/* Doctor Profile */}
      <div className="flex flex-col sm:flex-row items-center p-4 rounded-lg bg-white w-full max-w-8xl shadow gap-4">
        <div className="relative">
          <img
            src={doctor.image}
            alt="Doctor"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
            ✎
          </button>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
          <div className="mt-2 flex items-center justify-center sm:justify-start space-x-3">
            <div className="flex items-center text-sm">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{doctor.rating}</span>
            </div>
            <div className="h-4 border-l border-gray-300" />
            <div className="text-sm text-gray-600">{doctor.experience}</div>
          </div>
        </div>
        <button className="text-2xl text-gray-600 hidden sm:block">×</button>
      </div>

      {/* Performance Statistics */}
      <div className="w-full max-w-8xl p-6 bg-blue-50 rounded-xl shadow">
        <h2 className="text-lg font-bold text-gray-800">Performance Statistics</h2>
        <hr className="my-4 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-center p-4 rounded-xl shadow-sm bg-gray-50"
            >
              <h3 className="text-xl font-medium text-gray-700 mb-2">{stat.title}</h3>
              <div className="flex items-center gap-3">
                <img
                  src={stat.img }
                  alt={stat.title}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-semibold text-gray-800">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Qualifications */}
      <div className="w-full max-w-8xl p-6 bg-white border border-gray-200 rounded-xl shadow">
        <h2 className="text-lg font-bold text-gray-800">Education & Qualifications</h2>
        <hr className="my-4 border-gray-300" />

        <div className="flex flex-col gap-4">
          {qualifications.map((qual, index) => (
            <div
              key={index}
              className="w-full bg-green-100 border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 bg-gray-200 rounded-full text-green-700" />
                  <h3 className="text-lg font-semibold text-gray-800">{qual.degree}</h3>
                </div>
                <span className="text-sm text-gray-500">{qual.year}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{qual.institution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specializations */}
      <div className="w-full max-w-8xl p-6 bg-white rounded-xl border border-gray-200 shadow">
        <h2 className="text-lg font-bold text-gray-800">Specializations</h2>
        <hr className="my-4 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialties.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-green-100 border border-gray-200 rounded-lg px-4 py-2 h-14 w-full"
            >
              <Stethoscope className="w-5 h-5 text-green-700" />
              <span className="text-sm font-medium text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
