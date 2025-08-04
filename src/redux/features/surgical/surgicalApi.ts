import { baseApi } from "../../api/baseApi";

export const surgicalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSurgicalConditions: builder.query({
      query: () => ({
        method: "GET",
        url: "/surgical-conditions",
      }),
      providesTags: ["surgical"],
    }),

    getSurgicalConditionById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/MedicalHistory/Surgical/${id}`,
      }),
      providesTags: ["surgical"],
    }),

    createSurgicalCondition: builder.mutation({
      query: ({ data, id }) => {
        console.log("Creating surgical condition with:", { data, id });
        return {
          method: "POST",
          url: `/MedicalHistory/Surgical/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["surgical"],
    }),

    updateSurgicalConditionById: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `/MedicalHistory/Surgical/${id}`,
        body: data,
      }),
      invalidatesTags: ["surgical"],
    }),

    deleteSurgicalConditionById: builder.mutation({
      query: (id) => {
        console.log("Deleting surgical condition with ID:", id);
        return {
          method: "DELETE",
          url: `/MedicalHistory/Surgical/${id}`,
        };
      },
      invalidatesTags: ["surgical"],
    }),
  }),
});

export const {
  useGetSurgicalConditionsQuery,
  useGetSurgicalConditionByIdQuery,
  useCreateSurgicalConditionMutation,
  useUpdateSurgicalConditionByIdMutation,
  useDeleteSurgicalConditionByIdMutation,
} = surgicalApi;
