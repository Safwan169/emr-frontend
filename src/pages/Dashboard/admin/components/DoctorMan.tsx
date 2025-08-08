import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Doctor = {
  user_id: number;
  name: string;
  email: string;
};

const DoctorMan: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Appointments/Doctors/Count"
        );
        setDoctors(response.data.doctors);
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
        {doctors.map((doctor) => (
          <div
            key={doctor.user_id}
            className="flex justify-between items-center border rounded p-4 shadow-sm"
          >
            <div>
              <p className="text-lg font-medium">{doctor.name}</p>
              <p className="text-sm text-gray-500">{doctor.email}</p>
            </div>
            <Link
              to={`/admin/doctor-profile/${doctor.user_id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
