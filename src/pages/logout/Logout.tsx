// src/pages/Logout.tsx
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser(null).unwrap();
      toast.success("Logged out successfully");
      localStorage.removeItem("token");
      sessionStorage.clear();
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Logout;
