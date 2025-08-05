import { useGetUserByIdQuery } from "../redux/features/user/userApi";

const useGetUserData = () => {
  const userId = 1;

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
