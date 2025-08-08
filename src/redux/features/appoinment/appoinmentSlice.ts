import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedDoctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  nextAvailable: string;
  fee: number;
  imageUrl: string ;
  date?: string;
  timeSlot?: string;
  slotId?: string; 
}

interface AppointmentDetails {
  appointmentType: string;
  reason: string;
}

interface BookingState {
  step: number;
  selectedDoctor: SelectedDoctor | null;
  appointmentDetails: AppointmentDetails;
}

const initialState: BookingState = {
  step: 1,
  selectedDoctor: null,
  appointmentDetails: {
    appointmentType: "",
    reason: ""
  }
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedDoctor(state, action: PayloadAction<SelectedDoctor>) {
      state.selectedDoctor = action.payload;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    goNextStep(state) {
      state.step = Math.min(state.step + 1, 5);
    },
    goPreviousStep(state) {
      state.step = Math.max(state.step - 1, 1);
    },
    resetBooking(state) {
      state.selectedDoctor = null;
      state.step = 1;
    },
    addDate(state, action: PayloadAction<string>) {
      if (state.selectedDoctor) {
        state.selectedDoctor.date = action.payload;
      }
    },
    setBookingTimeSlot(
      state,
      action: PayloadAction<{ slotId: string; timeSlot: string }>
    ) {
      if (state.selectedDoctor) {
        state.selectedDoctor.timeSlot = action.payload.timeSlot;
        state.selectedDoctor.slotId = action.payload.slotId; // ✅ Store slotId
      }
    },
    setAppointmentDetails(
      state,
      action: PayloadAction<{ appointmentType: string; reason: string }>
    ) {
      state.appointmentDetails = action.payload;
    }
  }
});

export const {
  setSelectedDoctor,
  setStep,
  goNextStep,
  goPreviousStep,
  resetBooking,
  addDate,
  setBookingTimeSlot,
  setAppointmentDetails
} = bookingSlice.actions;

export default bookingSlice.reducer;
