import { useGetUserByIdQuery } from "../redux/features/user/userApi";

const useGetUserData = () => {
  const userId = JSON.parse(localStorage.getItem("profileInfo") || "{}").userId;
  console.log(userId,'thsis is user id');

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(userId);

  return {
    data: userData?.data,
    isLoading,
    isError,
    error,
  };
};

export default useGetUserData;
