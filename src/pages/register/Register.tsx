import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    gender: "",
    dob: "",
    insuranceId: null as File | null,
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] || null;
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div
        className="w-1/2 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://d1o986dsouikxg.cloudfront.net/loginLeft.png')",
        }}
      >
        <div className="text-white text-center z-10">
          <div className="absolute top-10 w-full left-1/2 transform -translate-x-1/2 z-10 text-white text-center">
            <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
          </div>
          <div className="flex items-center justify-center h-full z-10 relative pt-20">
            <img
              src="https://d1o986dsouikxg.cloudfront.net/doctors.png"
              alt="Logo"
              className="w-40 sm:w-60 md:w-80 lg:w-[400px] xl:w-[500px] h-auto"
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Create an account to explore about our services
          </p>

          <div className="space-y-4">
            {/* First Name */}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full border rounded-md px-4 py-2"
              onChange={handleInputChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full border rounded-md px-4 py-2"
              onChange={handleInputChange}
              required
            />

            {/* Gender Dropdown */}
            <select
              name="gender"
              className="w-full border rounded-md px-4 py-2 text-gray-700"
              onChange={handleInputChange}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {/* Date Picker with placeholder */}
            <input
              type="text"
              name="dob"
              className="w-full border rounded-md px-4 py-2 text-gray-700"
              placeholder="Choose your birthdate"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={handleInputChange}
              required
            />

            {/* File Upload */}
            <div className="relative">
              <label
                htmlFor="insuranceId"
                className="w-full flex items-center justify-between border rounded-md px-4 py-2 cursor-pointer text-gray-700 bg-white hover:bg-gray-50"
              >
                {formData.insuranceId ? (
                  <span className="truncate">
                    📎 {formData.insuranceId.name}
                  </span>
                ) : (
                  <span className="text-gray-400">
                    Choose your insurance ID
                  </span>
                )}
                <HiOutlineIdentification className="ml-2 text-xl text-gray-500" />
              </label>
              <input
                id="insuranceId"
                type="file"
                name="insuranceId"
                accept=".jpg,.png,.pdf"
                className="hidden"
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border rounded-md px-4 py-2 pr-10"
                onChange={handleInputChange}
                required
              />
              <span
                className="absolute right-3 top-3 text-xl text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full border rounded-md px-4 py-2 pr-10"
                onChange={handleInputChange}
                required
              />
              <span
                className="absolute right-3 top-3 text-xl text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1434CB] hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
