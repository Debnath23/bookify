"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import User from "@/types/user.interface";
import dayjs from "dayjs";
import Appointment from "@/types/appointment.interfce";

export default function Page() {
  const [user, setUser] = useState<User>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user`);
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/appointment-details`);
      if (response.status === 200) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
      fetchAppointments();
    }
  }, []);

  if (!isLoggedIn) {
    router.push("/sign-in");
    return null;
  }

  const today = dayjs().startOf("day");
  const upcomingAppointments = appointments.filter((appt) =>
    dayjs(appt.appointmentDate).isAfter(today)
  );
  const pastAppointments = appointments.filter((appt) =>
    dayjs(appt.appointmentDate).isBefore(today)
  );

  const AppointmentList = ({
    title,
    data,
    actionButton,
  }: {
    title: string;
    data: Appointment[];
    actionButton: (appt: Appointment) => React.ReactElement;
  }) => (
    <div className="bg-white shadow-md rounded-lg p-10 mt-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} available.</p>
      ) : (
        data.map((appt) => (
          <div
            key={appt._id}
            className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={appt.doctorId.profileImg || "/assets/avatar.png"}
                alt={appt.doctorId.name}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
              <div>
                <h4 className="text-lg font-semibold">{appt.doctorId.name}</h4>
                <p className="text-sm text-gray-500">
                  {appt.doctorId.speciality}
                </p>
                <p className="text-sm text-gray-500">
                  {dayjs(appt.appointmentDate).format("MMMM D, YYYY")} at{" "}
                  {appt.appointmentTime}
                </p>
              </div>
            </div>
            {actionButton(appt)}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="pb-4">
        <Link
          href="/"
          className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
        >
          Bookify
        </Link>
      </div>

      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <Image
            src="/assets/avatar.png"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover"
            width={112}
            height={112}
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <p>Age: 23</p>
            <p>Phone: +91 7319358180</p>
            <p>Address: Panskura, Kolkata, India</p>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <AppointmentList
        title="Upcoming Appointments"
        data={upcomingAppointments}
        actionButton={(appt) => (
          <button
            className={`px-4 py-2 rounded ${
              appt.paymentStatus === "pending"
                ? "bg-black text-white"
                : "bg-green-500 text-white"
            }`}
            onClick={() => {
              if (appt.paymentStatus === "pending") {
                router.push(
                  `/payment?appointmentId=${appt._id}&amountToPay=${appt.amountToPay}`
                );
              }
            }}
          >
            {appt.paymentStatus === "pending" ? "Pay Now" : "Paid"}
          </button>
        )}
      />

      {/* Past Appointments */}
      <AppointmentList
        title="Past Appointments"
        data={pastAppointments}
        actionButton={() => (
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            View Details
          </button>
        )}
      />
    </div>
  );
}
