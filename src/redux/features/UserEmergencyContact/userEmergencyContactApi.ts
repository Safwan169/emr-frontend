import { baseApi } from "../../api/baseApi";

export const userEmergencyContactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        method: "GET",
        url: "/users",
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
      query: ({ id, data }) => ({
        method: "PUT",
        url: `/users/${id}`,
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    // 👇 GET emergency contact
    getUserEmergencyContact: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/users/${userId}/emergency-contact`,
      }),
      providesTags: ["users"],
    }),

    // 👇 UPDATE emergency contact
    updateUserEmergencyContact: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `/users/${id}/emergency-contact`,
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByEmailQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
  useGetUserEmergencyContactQuery,
  useUpdateUserEmergencyContactMutation,
} = userEmergencyContactApi;
