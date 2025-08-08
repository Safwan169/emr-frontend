import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        method: "GET",
        url: "/users",
      }),
      providesTags: ["users"],
    }),
    getUserPreviousPrescreption: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `Dashboard/PreviousPrescription/${userId}`,
      }),
      providesTags: ["users"],
    }),
    getUserPreviousLabReport: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `Dashboard/PreviousLabReport/${userId}`,
      }),
      providesTags: ["users"],
    }),
    getUserByEmail: builder.query({
      query: (email) => ({
        method: "GET",
        url: `/users/${email}`,
      }),
      providesTags: ["users"],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/users/${userId}`,
      }),
      providesTags: ["users"],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        method: "POST",
        url: `/users`,
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUserById: builder.mutation({
      query: (userId) => ({
        method: "DELETE",
        url: `/users/${userId}`,
      }),
      invalidatesTags: ["users"],
    }),
    updateUserById: builder.mutation({
      query: ({ id, data }) => {
        console.log("api hitting", id, data);
        return {
          method: "PUT",
          url: `/users/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserByIdMutation,
  useCreateUserMutation,
  useDeleteUserByIdMutation,
  useGetUserByEmailQuery,
  useGetUserByIdQuery,
  useGetUserPreviousPrescreptionQuery,
  useGetUserPreviousLabReportQuery,
} = userApi;
