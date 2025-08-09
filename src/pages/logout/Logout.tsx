import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { baseApi } from "../../redux/api/baseApi"; // ✅ Correct location of baseApi
import { logout } from "../../redux/features/auth/authSlice"; // ✅ Auth slice logout action
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser(null).unwrap();

      // 🧹 Clear auth state
      dispatch(logout());

      // 🔁 Clear RTK Query cache
      dispatch(baseApi.util.resetApiState());

      // 🧼 Clear storage
      localStorage.removeItem("EMRtoken");
      sessionStorage.clear();

      toast.success("Logged out successfully");

      // ✅ Navigate to login after delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center">
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
