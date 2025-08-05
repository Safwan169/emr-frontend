import { baseApi } from "../../api/baseApi";

export const previousPrescriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPreviousPrescriptions: builder.query({
      query: () => ({
        method: "GET",
        url: "/previous-prescriptions",
      }),
      providesTags: ["previousPrescription"],
    }),

    getPreviousPrescriptionById: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/MedicalHistory/PreviousPrescription/${userId}`,
      }),
      providesTags: ["previousPrescription"],
    }),

    createPreviousPrescription: builder.mutation({
      query: ({ id, data }) => {
        console.log("Creating previous prescription with:", { id, data });
        return {
          method: "POST",
          url: `/MedicalHistory/PreviousPrescription/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["previousPrescription"],
    }),

    updatePreviousPrescriptionById: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/MedicalHistory/PreviousPrescription/${id}`,
        body: data,
      }),
      invalidatesTags: ["previousPrescription"],
    }),

    deletePreviousPrescriptionById: builder.mutation({
      query: (id) => {
        console.log("Deleting previous prescription with ID:", id);
        return {
          method: "DELETE",
          url: `/MedicalHistory/PreviousPrescription/${id}`,
        };
      },
      invalidatesTags: ["previousPrescription"],
    }),
  }),
});

export const {
  useGetPreviousPrescriptionsQuery,
  useGetPreviousPrescriptionByIdQuery,
  useCreatePreviousPrescriptionMutation,
  useUpdatePreviousPrescriptionByIdMutation,
  useDeletePreviousPrescriptionByIdMutation,
} = previousPrescriptionApi;
