// src/pages/Dashboard/doctor/dashboard/dashboardAPI/dashboardApi.ts
import { baseApi } from "../../../../../redux/api/baseApi";

interface TodaysAppointmentsResponse {
  total: number;
  appointments: any[]; // You can replace `any` with a proper Appointment type later
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔐 at a glance section
    getDoctorPatientCount: builder.query<{ patientCount: number }, string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Doctor/${doctorId}/Patients/Count`,
      }),
    }),

    getTodaysAppointments: builder.query<TodaysAppointmentsResponse, string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Today/${doctorId}`,
      }),
    }),
  }),
});

export const {
  useGetDoctorPatientCountQuery,
  useGetTodaysAppointmentsQuery,
} = dashboardApi;
