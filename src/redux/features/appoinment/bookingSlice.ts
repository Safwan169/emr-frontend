// store/slices/bookingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedDoctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  nextAvailable: string;
  fee: number;
  imageUrl: string;
}

interface BookingState {
  step: number;
  selectedDoctor: SelectedDoctor | null;
}

const initialState: BookingState = {
  step: 1,
  selectedDoctor: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDoctor(state, action: PayloadAction<SelectedDoctor>) {
      state.selectedDoctor = action.payload;
      state.step = state.step+1; // Go to next step when doctor is selected
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
  },
});

export const {
  setSelectedDoctor,
  setStep,
  goNextStep,
  goPreviousStep,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
