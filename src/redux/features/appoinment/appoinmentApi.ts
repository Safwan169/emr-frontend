import { baseApi } from "../../api/baseApi";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get available slots for a specific doctor
    getAvailableSlots: builder.query({
      query: (doctorId) => ({
        method: "GET",
        url: `/Appointments/Doctor/${doctorId}/AllSlots`,
        credentials: "include",
      }),
      providesTags: ["availableSlots"],
    }),

    // ✅ Book an appointment for a specific doctor
    bookAppointment: builder.mutation({
      query: ({ patientId, slotData }) => {
        console.log("Booking Payload:", slotData,'doctorId',patientId)
        return ({
        method: "POST",
        url: `/Appointments/Book/${patientId}/Slot`,
        body: slotData,
        credentials: "include",
      })
      },
      invalidatesTags: ["appointments"],
    }),

    // ✅ Get all appointments for a specific patient
    getPatientAppointments: builder.query({
      query: (patientId) => ({
        method: "GET",
        url: `/Appointments/Patient/${patientId}`,
        credentials: "include",
      }),
      providesTags: ["appointments"],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useBookAppointmentMutation,
  useGetPatientAppointmentsQuery,
} = appointmentApi;
