import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Doctor = {
  user_id: number;
  name: string;
  email: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    profile_image: {
      file_URL: string;
    };
  }
};

const DoctorMan: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/DoctorProfile`
        );
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="p-6">
      {/* Header with Add Doctor button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Doctors List</h2>
        <Link
          to="/doctor/register"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Doctor
        </Link>
      </div>

      {/* Doctor list */}
      <div className="space-y-4">
        {doctors?.map((doctor) => (
          <div
            key={doctor.user_id}
            className="flex justify-between items-center border rounded p-4 shadow-sm"
          >
            <div>
              <p className="text-lg font-medium">{doctor.user.first_name}</p>
              <p className="text-sm text-gray-500">{doctor.email}</p>
            </div>
            <Link
              to={`/admin/doctor-profile/${doctor.user_id}`}
              className="bg-[#1A3EAB] hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorMan;
