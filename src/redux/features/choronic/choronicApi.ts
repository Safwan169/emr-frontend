import { baseApi } from "../../api/baseApi";

export const chronicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChronicConditions: builder.query({
      query: () => ({
        method: "GET",
        url: "/chronic-conditions",
      }),
      providesTags: ["chronic"],
    }),

    getChronicConditionById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/medicalHistory/chronic/${id}`,
      }),
      providesTags: ["chronic"],
    }),

    createChronicCondition: builder.mutation({
      query: ({ formData, id }) => {
        console.log("Creating chronic condition with:", { formData, id });
        return {
          method: "POST",
          url: `/medicalHistory/chronic/${id}`,
          body: formData,
        };
      },
      invalidatesTags: ["chronic"],
    }),

    updateChronicConditionById: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `/medicalHistory/chronic/${id}`,
        body: data,
      }),
      invalidatesTags: ["chronic"],
    }),

    deleteChronicConditionById: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/medicalHistory/chronic/${id}`,
      }),
      invalidatesTags: ["chronic"],
    }),
  }),
});

export const {
  useGetChronicConditionsQuery,
  useGetChronicConditionByIdQuery,
  useCreateChronicConditionMutation,
  useUpdateChronicConditionByIdMutation,
  useDeleteChronicConditionByIdMutation,
} = chronicApi;
