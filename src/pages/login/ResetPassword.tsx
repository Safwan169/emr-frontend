// src/pages/ResetPassword.tsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Correct token reference from OTP page
  const resetToken = location?.state?.reset_token || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!resetToken) {
      toast.error("Invalid or expired reset token.");
      return;
    }

    try {
      const payload = {
        reset_token: resetToken,
        new_password: newPassword,
      };

      await resetPassword(payload).unwrap();
      toast.success("Password reset successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
              <h1 className="text-3xl font-bold">Set New Password</h1>
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
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create New Password
            </h2>
            <p className="text-gray-500 mb-6">
              Enter your new password and confirm to reset your account.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* New Password */}
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#1434CB] hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            {/* Back to Login */}
            <p className="text-sm text-center text-gray-500 mt-4">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
