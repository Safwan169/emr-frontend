import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useVerifyLoginOtpMutation,
  useResendLoginOtpMutation,
} from "../../redux/features/auth/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // Redirect to login if no email found
  useEffect(() => {
    if (!email) {
      toast.error("Email not found, please login again.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [email, navigate]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(75);

  const [verifyLoginOtp, { isLoading }] = useVerifyLoginOtpMutation();

  const [resendLoginOtp, { isLoading: isResending }] =
    useResendLoginOtpMutation();

  // Timer countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // OTP input change handler
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Format timer MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Clear OTP inputs
  const handleCancel = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  // Resend OTP handler
  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    try {
      const res = await resendLoginOtp({ email }).unwrap();
      console.log("Resend OTP success response:", res);

      setOtp(["", "", "", "", "", ""]);
      setTimer(75); // Reset timer to disable resend button for 75 sec
      toast.success("OTP sent again to your email.");
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      toast.error(
        err?.data?.message || "Failed to resend OTP. Please try again."
      );
    }
  };

  // Confirm OTP handler
  const handleConfirm = async () => {
    const otp_code = otp.join("");

    if (otp_code.length !== 6) {
      toast.warn("Please enter the full 6-digit OTP.");
      return;
    }

    try {
      const res = await verifyLoginOtp({ otp_code }).unwrap();
      localStorage.setItem("EMRtoken", res.access_token);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error("OTP verification failed.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex">
        {/* Left Section */}
        <div
          className="w-1/2 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('https://d1o986dsouikxg.cloudfront.net/loginLeft.png')`,
          }}
        >
          <div className="text-white text-center z-10">
            <div className="absolute top-10 w-full left-1/2 transform -translate-x-1/2 z-10 text-white text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Welcome to Our Platform
              </h1>
            </div>
            <div className="flex items-center justify-center h-full z-10 relative pt-20">
              <img
                src="https://d1o986dsouikxg.cloudfront.net/doctors.png"
                alt="Doctors"
                className="w-40 sm:w-60 md:w-80 lg:w-[400px] xl:w-[500px] h-auto"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex items-center justify-center px-4 sm:px-8">
          <div className="w-full max-w-md text-center">
            <img
              src="https://d1o986dsouikxg.cloudfront.net/image-email%20verification.png"
              alt="OTP Illustration"
              className="mx-auto w-40 h-40 mb-6"
            />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              OTP Verification
            </h2>
            <p className="text-gray-600 mb-2">
              Please complete the OTP verification. ⏱️ {formatTime()}
            </p>
            <p className="text-gray-500 mb-6">
              An OTP has been sent to your email.
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-10 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center text-sm mb-4">
              <button
                onClick={handleResend}
                className={`transition text-sm font-medium ${
                  timer > 0 || isResending
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:underline"
                }`}
                disabled={timer > 0 || isResending}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-semibold"
            >
              {isLoading ? "Verifying..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOtp;
