import { baseApi } from "../../api/baseApi";

export const previousLabReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPreviousLabReports: builder.query({
      query: () => ({
        method: "GET",
        url: "/previous-lab-reports",
      }),
      providesTags: ["previousLabReport"],
    }),

    getPreviousLabReportById: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/MedicalHistory/PreviousLabReport/${userId}`,
      }),
      providesTags: ["previousLabReport"],
    }),

    createPreviousLabReport: builder.mutation({
      query: ({ id, data }) => {
        console.log("Creating previous lab report with:", { id, data });
        return {
          method: "POST",
          url: `/MedicalHistory/PreviousLabReport/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["previousLabReport"],
    }),

    updatePreviousLabReportById: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/MedicalHistory/PreviousLabReport/${id}`,
        body: data,
      }),
      invalidatesTags: ["previousLabReport"],
    }),

    deletePreviousLabReportById: builder.mutation({
      query: (id) => {
        console.log("Deleting previous lab report with ID:", id);
        return {
          method: "DELETE",
          url: `/MedicalHistory/PreviousLabReport/${id}`,
        };
      },
      invalidatesTags: ["previousLabReport"],
    }),
  }),
});

export const {
  useGetPreviousLabReportsQuery,
  useGetPreviousLabReportByIdQuery,
  useCreatePreviousLabReportMutation,
  useUpdatePreviousLabReportByIdMutation,
  useDeletePreviousLabReportByIdMutation,
} = previousLabReportApi;
