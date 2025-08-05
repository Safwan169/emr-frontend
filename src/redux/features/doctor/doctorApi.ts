import { baseApi } from "../../api/baseApi";

export const doctorProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get full doctor profile by userId
    getDoctorProfile: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/DoctorProfile/${userId}`,
      }),
      providesTags: ["doctorProfile"],
    }),

    getAllDoctors: builder.query({
      query: () => ({
        method: "GET",
        url: "/DoctorProfile",
        credentials: "include",
      }),
      providesTags: ["doctors"],
      
    }),

    // ✅ Create Education
    createEducation: builder.mutation({
      query: ({ userId, educationData }) => {
        console.log("Education Data:", educationData);
        return {
          method: "POST",
          url: `/DoctorProfile/${userId}/Education`,
          body: educationData,
        };
      },}),

    // ✅ Delete Education by ID
    deleteEducation: builder.mutation({
      query: ({ userId, educationId }) => ({
        method: "DELETE",
        url: `/DoctorProfile/${userId}/Education/${educationId}`,
      }),
      invalidatesTags: ["doctorProfile"],
    }),

    // ✅ Create Certification
    createCertification: builder.mutation({
      query: ({ userId, certificationData }) => ({
        method: "POST",
        url: `/DoctorProfile/${userId}/Certification`,
        body: certificationData,
      }),
      invalidatesTags: ["doctorProfile"],
    }),

    // ✅ Delete Certification by ID
    deleteCertification: builder.mutation({
      query: ({ userId, certificationId }) => ({
        method: "DELETE",
        url: `/DoctorProfile/${userId}/Certification/${certificationId}`,
      }),
      invalidatesTags: ["doctorProfile"],
    }),

    // ✅ Create Research
    createResearch: builder.mutation({
      query: ({ userId, researchData }) => ({
        method: "POST",
        url: `/DoctorProfile/${userId}/Research`,
        body: researchData,
      }),
      invalidatesTags: ["doctorProfile"],
    }),

    // ✅ Delete Research by ID
    deleteResearch: builder.mutation({
      query: ({ userId, researchId }) => ({
        method: "DELETE",
        url: `/DoctorProfile/${userId}/Research/${researchId}`,
      }),
      invalidatesTags: ["doctorProfile"],
    }),

    // ✅ Update Doctor Profile (PUT /users/:id)
   updateDoctorProfile: builder.mutation({
  query: ({ userId, profileData }) => {
    console.log("Updating doctor profile with data:", profileData);


    const dd={
     specialization:"ddd"
    }
    return {
      method: "POST",
      url: `/DoctorProfile/${userId}`,
      body: profileData,
      credentials: "include",
    };
  },
  invalidatesTags: ["doctorProfile"],
}),

updateUserProfile: builder.mutation({
  query: ({ userId, profileData }) => {
    console.log("Updating user profile with data:", profileData);
    return {
      method: "PUT",
      url: `/users/${userId}`,
      body: profileData,
      credentials: "include",
    };
  },
  invalidatesTags: ["userProfile"],
}),

  }),
});

export const {
  useGetDoctorProfileQuery,
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useCreateCertificationMutation,
  useDeleteCertificationMutation,
  useCreateResearchMutation,
  useDeleteResearchMutation,
  useUpdateDoctorProfileMutation,
  useUpdateUserProfileMutation,
  useGetAllDoctorsQuery
} = doctorProfileApi;
