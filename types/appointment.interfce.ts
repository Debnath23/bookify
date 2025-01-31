export default interface Appointment {
  _id: string;
  userId: string;
  doctorId: {
    _id: string;
    name: string;
    profileImg: string;
    speciality: string;
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
