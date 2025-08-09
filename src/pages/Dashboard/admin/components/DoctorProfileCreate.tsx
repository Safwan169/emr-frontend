import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorProfileCreate: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const navigate=useNavigate()
console.log(user_id,'user_id')
  const [formData, setFormData] = useState({
    license_number: "",
    specialization: "",
    fee: "",
    years_of_experience: "",
    phone: "",
    hospital: "",
    voice: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      voice: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user_id) {
      toast.error("User ID is missing from URL");
      return;
    }

    const form = new FormData();
    form.append("license_number", formData.license_number);
    form.append("specialization", formData.specialization);
    form.append("fee", formData.fee);
    form.append("years_of_experience", formData.years_of_experience);
    // form.append("phone", formData.phone);
    form.append("hospital", formData.hospital);
    if (formData.voice) {
      form.append("voice", formData.voice);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/DoctorProfile/${user_id}`,
        {
          method: "POST",
          body: form,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Doctor profile updated successfully!");
        setFormData({
          license_number: "",
          specialization: "",
          fee: "",
          years_of_experience: "",
          phone: "",
          hospital: "",
          voice: null,
        });

        navigate(`/add-doctors`)

      } else {
        console.error(result);
        toast.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-6">Edit Doctor Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="license_number"
          placeholder="License Number"
          value={formData.license_number}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="number"
          name="fee"
          placeholder="Fee"
          value={formData.fee}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="number"
          name="years_of_experience"
          placeholder="Years of Experience"
          value={formData.years_of_experience}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          name="hospital"
          placeholder="Hospital"
          value={formData.hospital}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Voice File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorProfileCreate;
