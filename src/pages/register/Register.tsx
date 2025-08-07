// // src/components/Register.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSignupMutation } from "../../redux/features/auth/authApi";
// import { registerSchema } from "../../schemas/register.schema";

// const Register = () => {
//   const navigate = useNavigate();
//   const [signup, { isLoading, isSuccess, error }] = useSignupMutation();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     gender: "",
//     dob: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await registerSchema.validate(formData, { abortEarly: false });
//       setValidationErrors({});

//       const {
//         firstName,
//         lastName,
//         email,
//         password,
//         gender,
//         dob,
//       } = formData;

//       const formattedData = {
//         first_name: firstName,
//         last_name: lastName,
//         email,
//         password,
//         date_of_birth: dob,
//         gender: gender.toLowerCase(),
//       };

//       const result = await signup(formattedData).unwrap();
//       console.log("Registration success:", result);

//       // Redirect to OTP page
//       navigate("/otp-validation", {
//         state: { email: formData.email },
//       });
//     } catch (err: any) {
//       if (err.name === "ValidationError") {
//         const errs: Record<string, string> = {};
//         err.inner.forEach((validationError: any) => {
//           if (validationError.path) errs[validationError.path] = validationError.message;
//         });
//         setValidationErrors(errs);
//       } else {
//         console.error("Registration error:", err);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Side */}
//       <div
//         className="w-full md:w-1/2 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
//         style={{
//           backgroundImage: "url('https://d1o986dsouikxg.cloudfront.net/loginLeft.png')",
//         }}
//       >
//         <div className="text-white text-center z-10">
//           <div className="absolute top-10 w-full left-1/2 transform -translate-x-1/2 z-10 text-white text-center">
//             <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
//           </div>
//           <div className="flex items-center justify-center h-full z-10 relative pt-20">
//             <img
//               src="https://d1o986dsouikxg.cloudfront.net/doctors.png"
//               alt="Logo"
//               className="w-40 sm:w-60 md:w-80 lg:w-[400px] xl:w-[500px] h-auto"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-8"
//           noValidate
//         >
//           <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
//           <p className="text-sm text-gray-500 mb-6">
//             Create an account to explore about our services
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* First Name */}
//             <div>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 className={`w-full border rounded-md px-4 py-2 ${
//                   validationErrors.firstName ? "border-red-500" : ""
//                 }`}
//                 onChange={handleInputChange}
//                 required
//               />
//               {validationErrors.firstName && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
//               )}
//             </div>

//             {/* Last Name */}
//             <div>
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 className={`w-full border rounded-md px-4 py-2 ${
//                   validationErrors.lastName ? "border-red-500" : ""
//                 }`}
//                 onChange={handleInputChange}
//                 required
//               />
//               {validationErrors.lastName && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter Email"
//                 className={`w-full border rounded-md px-4 py-2 ${
//                   validationErrors.email ? "border-red-500" : ""
//                 }`}
//                 onChange={handleInputChange}
//                 required
//               />
//               {validationErrors.email && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
//               )}
//             </div>

//             {/* Gender */}
//             <div>
//               <select
//                 name="gender"
//                 className={`w-full border rounded-md px-4 py-2 text-gray-700 ${
//                   validationErrors.gender ? "border-red-500" : ""
//                 }`}
//                 onChange={handleInputChange}
//                 required
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Select Gender
//                 </option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {validationErrors.gender && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.gender}</p>
//               )}
//             </div>

//             {/* DOB */}
//             <div>
//               <input
//                 type="text"
//                 name="dob"
//                 className={`w-full border rounded-md px-4 py-2 text-gray-700 ${
//                   validationErrors.dob ? "border-red-500" : ""
//                 }`}
//                 placeholder="Choose your birthdate"
//                 onFocus={(e) => (e.target.type = "date")}
//                 onBlur={(e) => {
//                   if (!e.target.value) e.target.type = "text";
//                 }}
//                 onChange={handleInputChange}
//                 required
//               />
//               {validationErrors.dob && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.dob}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 className={`w-full border rounded-md px-4 py-2 pr-10 ${
//                   validationErrors.password ? "border-red-500" : ""
//                 }`}
//                 onChange={handleInputChange}
//                 required
//               />
//               <span
//                 className="absolute right-3 top-3 cursor-pointer select-none"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
//               {validationErrors.password && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 className={`w-full border rounded-md px-4 py-2 pr-10 ${
//                   validationErrors.confirmPassword ? "border-red-500" : ""
//                 }`}
//                 onChange={handleInputChange}
//                 required
//               />
//               <span
//                 className="absolute right-3 top-3 cursor-pointer select-none"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               />
//               {validationErrors.confirmPassword && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.confirmPassword}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-4">
//             <button
//               type="submit"
//               className="w-full bg-[#1C3BA4] hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
//               disabled={isLoading}
//             >
//               {isLoading ? "Sending OTP to your mail...." : "Sign up"}
//             </button>

//             {error && (
//               <p className="mt-2 text-red-500">
//                 Error: {(error as any)?.data?.message || "Something went wrong"}
//               </p>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { registerSchema } from "../../schemas/register.schema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerSchema.validate(formData, { abortEarly: false });
      toast.success("OTP has been sent to your email");
      setValidationErrors({});

      const { firstName, lastName, email, password, gender, dob } = formData;

      const formattedData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        date_of_birth: dob,
        gender: gender.toLowerCase(),
      };

      const result = await signup(formattedData).unwrap();
      console.log("Registration success:", result);

      navigate("/otp-validation", {
        state: { email: formData.email },
      });
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const errs: Record<string, string> = {};
        err.inner.forEach((validationError: any) => {
          if (validationError.path)
            errs[validationError.path] = validationError.message;
        });
        setValidationErrors(errs);
      } else {
        const errorMessage =
          err?.data?.message || "Something went wrong during registration.";
        toast.error(`Error: ${errorMessage}`);
        console.error("Registration error:", err);
      }
    }
  };

  // Simple text toggle for password visibility
  const toggleText = (show: boolean) => (show ? "Hide" : "Show");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
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
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-8"
          noValidate
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Create an account to explore about our services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`w-full border rounded-md px-4 py-2 ${
                  validationErrors.firstName ? "border-red-500" : ""
                }`}
                onChange={handleInputChange}
                required
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`w-full border rounded-md px-4 py-2 ${
                  validationErrors.lastName ? "border-red-500" : ""
                }`}
                onChange={handleInputChange}
                required
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className={`w-full border rounded-md px-4 py-2 ${
                  validationErrors.email ? "border-red-500" : ""
                }`}
                onChange={handleInputChange}
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <select
                name="gender"
                className={`w-full border rounded-md px-4 py-2 text-gray-700 ${
                  validationErrors.gender ? "border-red-500" : ""
                }`}
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
              {validationErrors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.gender}
                </p>
              )}
            </div>

            {/* DOB */}
            <div>
              <input
                type="text"
                name="dob"
                className={`w-full border rounded-md px-4 py-2 text-gray-700 ${
                  validationErrors.dob ? "border-red-500" : ""
                }`}
                placeholder="Choose your birthdate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                onChange={handleInputChange}
                required
              />
              {validationErrors.dob && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.dob}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`w-full border rounded-md px-4 py-2 pr-10 ${
                  validationErrors.password ? "border-red-500" : ""
                }`}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {toggleText(showPassword)}
              </button>
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`w-full border rounded-md px-4 py-2 pr-10 ${
                  validationErrors.confirmPassword ? "border-red-500" : ""
                }`}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {toggleText(showConfirmPassword)}
              </button>
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-[#1C3BA4] hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP to your mail...." : "Sign up"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
