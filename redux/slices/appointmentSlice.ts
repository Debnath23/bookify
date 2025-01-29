import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Appointment {
  doctorId: string | null;
  appointmentDate: string | null;
  appointmentTime: string | null;
  appointmentType: string | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  age: string | null;
  bloodGroup: string | null;
  amountToPay: string | null;
  paymentType: string | null;
}

const initialState: { appointment: Appointment | null } = {
  appointment: {
    doctorId: null,
    appointmentDate: null,
    appointmentTime: null,
    appointmentType: null,
    name: null,
    email: null,
    phoneNumber: null,
    age: null,
    bloodGroup: null,
    amountToPay: null,
    paymentType: null,
  },
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setDoctorId: (state, action: PayloadAction<string>) => {
      if (state.appointment) {
        state.appointment.doctorId = action.payload;
      }
    },
    setAppointmentDetails: (
      state,
      action: PayloadAction<Partial<Appointment>>
    ) => {
      if (state.appointment) {
        state.appointment = { ...state.appointment, ...action.payload };
      }
    },
    clearAppointment: (state) => {
      state.appointment = null;
    },
  },
});

export const { setDoctorId, setAppointmentDetails, clearAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
