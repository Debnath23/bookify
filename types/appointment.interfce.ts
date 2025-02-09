export default interface Appointment {
  _id: string;
  userId: string;
  doctorId: {
    _id: string;
    name: string;
    email: string;
    about: string;
    profileImg: string;
    speciality: string;
    degree: string;
    fees: string;
    experience: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  amountToPay: string;
  paymentType: "Online" | "Cash";
  paymentStatus: "pending" | "completed" | "failed";
  orderId?: string;
  paymentId?: string;
  signature?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
