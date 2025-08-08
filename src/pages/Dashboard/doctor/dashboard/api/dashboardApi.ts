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

// 🆕 New Interface for Doctor Availability POST Payload
interface DoctorAvailabilityPayload {
  weekdays: string[];
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
}

// 🆕 Interfaces matching your All Available Slots JSON response

interface Doctor {
  id: number;
  name: string;
}

interface WorkingHours {
  start_time: string;
  end_time: string;
  slot_duration: number;
}

interface Availability {
  working_hours: WorkingHours;
  available_days: string[];
}

interface Slot {
  slot_id: number;
  start_time: string;
  end_time: string;
  day: string;
  is_booked: boolean;
  status: string | null;
  appointment: any | null;
}

interface SlotsByDate {
  [date: string]: Slot[];
}

interface AllAvailableSlotsResponse {
  success: boolean;
  doctor: Doctor;
  availability: Availability;
  slots: SlotsByDate;
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

    // 🆕 POST Doctor Availability
    postDoctorAvailability: builder.mutation<void, { doctorId: string; data: DoctorAvailabilityPayload }>({
      query: ({ doctorId, data }) => ({
        url: `/DoctorAvailability/${doctorId}`,
        method: "POST",
        body: data,
      }),
    }),

    // 🆕 GET All Available Slots - UPDATED with correct typing
    getAllAvailableSlots: builder.query<AllAvailableSlotsResponse, string>({
      query: (doctorId: string) => ({
        url: `/Appointments/Doctor/${doctorId}/AllSlots`,
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
  usePostDoctorAvailabilityMutation,
  useGetAllAvailableSlotsQuery, // 🆕 Updated hook
} = dashboardApi;
