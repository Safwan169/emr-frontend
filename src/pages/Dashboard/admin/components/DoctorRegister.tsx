import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DoctorRegister: React.FC = () => {

  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    date_of_birth: "",
    gender: "male",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      role_id: 3,
      date_of_birth: new Date(formData.date_of_birth).toISOString(),
    };

    try {
      const response = await axios.post(  `${process.env.REACT_APP_API_BASE_URL}/Users  `, payload);
      setMessage("Doctor registered successfully!");
      console.log("Success:", response.data);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        date_of_birth: "",
        gender: "male",
      });

      if (response.data.statusCode===201) {
                toast.success("Doctor profile Created successfully!");
        
        navigate (`/admin/doctor-profile/${response.data.data.id}`)
        
      }
    } catch (error: any) {
      setMessage("Error registering doctor.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-10 bg-white shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
        Doctor Registration
      </h1>

      {message && (
        <div
          className={`text-center mb-6 font-medium ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="md:col-span-2 text-center">
      
       
       
          <button
            type="submit"
            className="bg-[#1a3eab] text-white px-10 py-3 rounded-md font-semibold hover:bg-blue-800 transition duration-200"
          >
            Register Doctor
          </button>
      
        </div>
      </form>
    </div>
    // giii
  );
};

export default DoctorRegister;
