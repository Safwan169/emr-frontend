import { useGetUserByIdQuery } from "../redux/features/user/userApi";

const useGetUserData = () => {
  const {userId} = JSON.parse(localStorage.getItem("profileInfo") || "{}");
  console.log(userId,'thsis is user id');

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetUserByIdQuery(userId);

  return {
    data: userData?.data,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useGetUserData;
