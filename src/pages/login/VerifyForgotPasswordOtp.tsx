import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useVerifyForgotPasswordOtpMutation,
  useForgotPasswordRequestMutation,
} from "../../redux/features/auth/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyForgotPasswordOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(75);

  const [verifyOtp, { isLoading }] = useVerifyForgotPasswordOtpMutation();
  const [resendOtp, { isLoading: isResending }] =
    useForgotPasswordRequestMutation();

  useEffect(() => {
    if (!email) {
      toast.error("Email not found, please retry.");
      setTimeout(() => navigate("/forgot-password"), 2000);
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleCancel = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  const handleResend = async () => {
    if (!email) return toast.error("No email found.");
    try {
      await resendOtp({ email }).unwrap();
      setTimer(75);
      toast.success("OTP resent to your email.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend OTP.");
    }
  };

  const handleConfirm = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      return toast.warn("Enter the full 6-digit OTP.");
    }

    try {
      const res = await verifyOtp({ email, otp: code }).unwrap();
      toast.success("OTP verified!");

      // Send token to next page via route state
      setTimeout(() => {
        navigate("/reset-password", {
          state: { reset_token: res.reset_token },
        });
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
          className="w-1/2 hidden lg:flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url('https://d1o986dsouikxg.cloudfront.net/loginLeft.png')`,
          }}
        >
          <div className="text-white text-center z-10">
            <h1 className="text-2xl font-semibold mt-10">
              Verify Your Identity
            </h1>
            <img
              src="https://d1o986dsouikxg.cloudfront.net/doctors.png"
              alt="OTP"
              className="w-80 h-auto mt-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8">
          <div className="w-full max-w-md text-center">
            <img
              src="https://d1o986dsouikxg.cloudfront.net/image-email%20verification.png"
              alt="OTP"
              className="mx-auto w-32 h-32 mb-6"
            />
            <h2 className="text-xl font-bold mb-2">OTP Verification</h2>
            <p className="text-gray-600 mb-2">
              Check your email for the OTP. ⏱️ {formatTime()}
            </p>

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

export default VerifyForgotPasswordOtp;
