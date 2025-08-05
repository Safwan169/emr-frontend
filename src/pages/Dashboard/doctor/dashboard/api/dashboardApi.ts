// src/pages/Dashboard/doctor/dashboard/dashboardAPI/dashboardApi.ts
import { baseApi } from "../../../../../redux/api/baseApi";

// Interfaces
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
  appointment_time: string;
  condition: string;
  status: string;
}

interface TodaysAppointmentsResponse {
  total: number;
  appointments: TodaysAppointment[];
}

interface DailyStat {
  date: string;
  count: number;
}

// API slice
export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔐 At a glance
    getDoctorPatientCount: builder.query<{ patientCount: number }, string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Doctor/${doctorId}/Patients/Count`,
      }),
    }),

    // 📅 Today's Appointments
    getTodaysAppointments: builder.query<TodaysAppointmentsResponse, string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Today/${doctorId}`,
      }),
    }),

    // 🧑‍🤝‍🧑 All Patients
    getPatientsList: builder.query<AppointmentPatient[], string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Doctor/${doctorId}/Patients`,
      }),
    }),

    // 📅 Today's Appointment List (alias of above)
    getTodaysAppoimentList: builder.query<TodaysAppointmentsResponse, string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Today/${doctorId}`,
      }),
    }),

    // 📈 Daily new patients in last 7 days
    getDailyNewPatientsLast7Days: builder.query<DailyStat[], string>({
      query: (doctorId: string) => ({
        url: `/Appointments/DailyNewPatientsLast7Days/${doctorId}`,
      }),
    }),

    // 📈 Daily appointments in last 7 days
    getDailyAppointmentsLast7Days: builder.query<DailyStat[], string>({
      query: (doctorId: string) => ({
        url: `/Appointments/DailyAppointmentsLast7Days/${doctorId}`,
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetDoctorPatientCountQuery,
  useGetTodaysAppointmentsQuery,
  useGetPatientsListQuery,
  useGetTodaysAppoimentListQuery,
  useGetDailyNewPatientsLast7DaysQuery,
  useGetDailyAppointmentsLast7DaysQuery,
} = dashboardApi;
