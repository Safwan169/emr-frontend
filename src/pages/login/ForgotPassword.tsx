// // pages/ForgotPassword.tsx
// import React, { useState } from "react";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Call your backend API to send reset link
//     console.log("Reset link sent to:", email);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white p-6 shadow-md rounded-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
//         <p className="text-sm text-gray-600 mb-6 text-center">
//           Enter your email address and we’ll send you a link to reset your password.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
//           >
//             Send Reset Link
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;



import React from 'react'

const ForgotPassword = () => {
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword