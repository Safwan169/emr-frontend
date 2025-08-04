import { baseApi } from "../../api/baseApi";

export const immunizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getImmunizations: builder.query({
      query: () => ({
        method: "GET",
        url: "/medicalHistory/vaccine",
      }),
      providesTags: ["immunization"],
    }),

    getImmunizationById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/medicalHistory/vaccine/${id}`,
      }),
      providesTags: ["immunization"],
    }),

    createImmunization: builder.mutation({
      query: ({ data, id }) => {
        console.log("Creating immunization with:", { data, id });
        return {
          method: "POST",
          url: `/medicalHistory/vaccine/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["immunization"],
    }),

    updateImmunizationById: builder.mutation({
      query: ({ id, data }) => {
        console.log("Updating immunization with:", { id, data });
        return {
          method: "PUT",
          url: `/medicalHistory/vaccine/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["immunization"],
    }),

    deleteImmunizationById: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/medicalHistory/vaccine/${id}`,
      }),
      invalidatesTags: ["immunization"],
    }),
  }),
});

export const {
  useGetImmunizationsQuery,
  useGetImmunizationByIdQuery,
  useCreateImmunizationMutation,
  useUpdateImmunizationByIdMutation,
  useDeleteImmunizationByIdMutation,
} = immunizationApi;
