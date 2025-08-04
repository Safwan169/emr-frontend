import { baseApi } from "../../api/baseApi";

export const allergiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all allergies for a specific user
    getallergiesByUserId: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/Patient/allergies/${userId}`,
      }),
      providesTags: ["allergies"],
    }),

    // Get a single allergy by ID
    getSingleAllergy: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/Patient/allergies/Single/${id}`,
      }),
      providesTags: ["allergies"],
    }),

    // Create a new allergy for a user
createAllergy: builder.mutation({
  query: ({ userId, allergyData }) => {
    console.log("allergyData:", allergyData);
    return {
      method: "POST",
      url: `/Patient/Allergies/${userId}`,
      body: allergyData,
    };
  },
  invalidatesTags: ["allergies"],
}),


    // Update an existing allergy by ID
    updateAllergy: builder.mutation({
      query: ({ id, updatedData }) => ({
        method: "PUT",
        url: `/Patient/allergies/${id}`,
        body: updatedData,
      }),
      invalidatesTags: ["allergies"],
    }),

    // Delete an allergy by ID
    deleteAllergy: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/Patient/allergies/${id}`,
      }),
      invalidatesTags: ["allergies"],
    }),
  }),
});

export const {
  useGetallergiesByUserIdQuery,
  useGetSingleAllergyQuery,
  useCreateAllergyMutation,
  useUpdateAllergyMutation,
  useDeleteAllergyMutation,
} = allergiesApi;
