import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Appointment {
  appointmentId: string | null;
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
}

const initialState: { appointment: Appointment | null } = {
  appointment: {
    appointmentId: null,
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
  },
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setDoctorId: (state, action: PayloadAction<{ doctorId: string }>) => {
      if (state.appointment) {
        state.appointment.doctorId = action.payload.doctorId;
      }
    },

    setAppointmentId: (
      state,
      action: PayloadAction<{ appointmentId: string }>
    ) => {
      if (state.appointment) {
        state.appointment.appointmentId = action.payload.appointmentId;
      }
    },

    setAppointmentDetails: (
      state,
      action: PayloadAction<{
        appointmentDate: string;
        appointmentTime: string;
        appointmentType: string;
        amountToPay: string;
      }>
    ) => {
      if (state.appointment) {
        state.appointment.appointmentDate = action.payload.appointmentDate;
        state.appointment.appointmentTime = action.payload.appointmentTime;
        state.appointment.appointmentType = action.payload.appointmentType;
        state.appointment.amountToPay = action.payload.amountToPay;
      }
    },

    setPatientDetails: (state, action: PayloadAction<Partial<Appointment>>) => {
      if (state.appointment) {
        state.appointment = { ...state.appointment, ...action.payload };
      }
    },

    clearAppointment: (state) => {
      state.appointment = null;
    },
  },
});

export const {
  setDoctorId,
  setAppointmentId,
  setAppointmentDetails,
  setPatientDetails,
  clearAppointment,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
