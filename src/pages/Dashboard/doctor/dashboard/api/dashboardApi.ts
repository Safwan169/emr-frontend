// src/pages/Dashboard/doctor/dashboard/dashboardAPI/dashboardApi.ts
import { baseApi } from "../../../../../redux/api/baseApi";

interface AppointmentPatient {
  user_id: number;
  name: string;
  gender: string;
  age: number;
  appointment_date: string;
  condition: string;
  status: string;
}

interface TodaysAppointment {
  user_id: number;
  name: string;
  gender: string;
  age: number;
  appointment_time: string;  // notice this is appointment_time in your example, not appointment_date
  condition: string;
  status: string;
}

interface TodaysAppointmentsResponse {
  total: number;
  appointments: TodaysAppointment[];
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

    // 🧑‍🤝‍🧑 Patients list
    getPatientsList: builder.query<AppointmentPatient[], string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Doctor/${doctorId}/Patients`,
      }),
    }),

    // Todays appointment list (same as getTodaysAppointments)
    getTodaysAppoimentList: builder.query<TodaysAppointmentsResponse, string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Today/${doctorId}`,
      }),
    }),
  }),
});

export const {
  useGetDoctorPatientCountQuery,
  useGetTodaysAppointmentsQuery,
  useGetPatientsListQuery,
  useGetTodaysAppoimentListQuery,
} = dashboardApi;
