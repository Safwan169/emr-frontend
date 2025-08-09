import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData).unwrap();

      if (res.message ===
        "Login successful") {
          localStorage.setItem("EMRtoken", res.access_token);
          navigate("/");
        }
        
      toast.success("Login successful! Sending OTP...");
      console.log("Login success response:", res);
      // navigate("/login-otp", {
      //   state: {
      //     email: formData.email,
      //     token: res.token,
      //   },
      // });
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        "Invalid email or password. Please try again.";
      toast.error(msg);
      console.error("Login error:", err);
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
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-500 mb-6">
              Please login to continue our apps
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-orange-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1434CB] hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Loging ..." : "Login"}
              </button>

              {/* Google Button */}
              {/* <div className="w-full text-center">
                <button
                  type="button"
                  className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-md gap-2"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google Icon"
                    className="w-5 h-5"
                  />
                  Sign in with Google
                </button>
              </div> */}

              {/* Signup Link */}
              <p className="text-sm text-center text-gray-500">
                Don’t have an account?{" "}
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
    </>
  );
};

export default Login;
