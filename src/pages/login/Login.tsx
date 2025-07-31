import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
          {/* Image centered vertically and horizontally */}
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
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-500 mb-6">
            Please login to continue our apps
          </p>

          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Remember me
              </label>
              <a href="#" className="text-orange-400 hover:underline">
                Forget password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1434CB] hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              Login
            </button>

            <div className="w-full text-center">
              <button className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-md gap-2">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google Icon"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
            </div>

            <p className="text-sm text-center text-gray-500">
              Don’t have any account?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign Up Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
