"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import User from "@/types/user.interface";
import dayjs from "dayjs";
import Appointment from "@/types/appointment.interfce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { logout } from "@/redux/slices/authSlice";
import { removeTokens } from "@/lib/token";

export default function Page() {
  const [user, setUser] = useState<User>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user`);
      if (response.status === 200) {
        setUser(response.data.user);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setLoading(false);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/appointments-details`);
      if (response.status === 200) {
        setAppointments(response.data.appointments);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      const response = await axiosInstance.delete("/auth/logout");
      console.log(response);

      if (response.status === 200) {
        removeTokens();
        dispatch(logout());
        router.push("/sign-in");
        setLoadingLogout(false);
        toast.success(response.data.message);
      }
    } catch {
      toast.error("Opps! Please try later.");
    } finally {
      setLoadingLogout(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
      fetchAppointments();
    } else {
      router.push("/sign-in");
    }
  }, [fetchAppointments, fetchUserInfo, isLoggedIn, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <video controls={false} autoPlay loop className="w-32 sm:w-64">
          <source src="/assets/loading.mp4" type="video/mp4" />
        </video>
      </div>
    );
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
    <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 mt-6 w-full">
      <h3 className="text-lg sm:text-xl font-bold mb-4">{title}</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} available.</p>
      ) : (
        data.map((appt) => (
          <div
            key={appt._id}
            className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-[100px] h-[100px] sm:w-[104px] sm:h-[104px] bg-green-200 rounded-full flex justify-center items-center">
                <Image
                  src={appt.doctorId.profileImg || "/assets/avatar.png"}
                  alt={appt.doctorId.name}
                  className="rounded-full object-cover"
                  width={104}
                  height={104}
                />
              </div>
              <div className="text-left">
                <h4 className="text-base sm:text-lg font-semibold">
                  {appt.doctorId.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  {appt.doctorId.speciality}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {dayjs(appt.appointmentDate).format("MMMM D, YYYY")} at{" "}
                  {appt.appointmentTime}
                </p>
                <div className="mt-3 flex gap-4 md:hidden">
                  {actionButton(appt)}
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 gap-4 hidden md:block">
              {actionButton(appt)}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-6">
      {/* Header */}
      <div className="pb-4 flex justify-between">
        <Link
          href="/"
          className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
        >
          Bookify
        </Link>
        {loadingLogout ? (
          <div className="w-12 h-12">
            <video
              controls={false}
              autoPlay
              loop
              className="w-full h-auto rounded-full p-0"
            >
              <source src="/assets/loader.mp4" type="video/mp4" />
            </video>
          </div>
        ) : (
          <p
            className="font-bold text-lg sm:text-xl bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
          </p>
        )}
      </div>

      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-6 text-center sm:text-left">
          {/* Avatar */}
          <Image
            src="/assets/avatar.png"
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
            width={112}
            height={112}
          />
          {/* User Details */}
          <div className="mt-4 sm:mt-0">
            <h2 className="text-lg sm:text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-sm sm:text-base">Age: 23</p>
            <p className="text-sm sm:text-base">Phone: +91 7319358180</p>
            <p className="text-sm sm:text-base">
              Address: Panskura, Kolkata, India
            </p>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="max-w-4xl mx-auto w-full mt-6">
        {/* Upcoming Appointments */}
        <AppointmentList
          title="Upcoming Appointments"
          data={upcomingAppointments}
          actionButton={(appt) => (
            <div className="flex gap-4">
              <button
                className={`px-2 py-1 md:px-4 md:py-2 text-[8px] md:text-sm rounded ${
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
              <button
                onClick={() => router.push(`/appointment/${appt._id}`)}
                className="px-2 py-1 md:px-4 md:py-2 text-[8px] md:text-sm bg-blue-500 text-white rounded"
              >
                View Details
              </button>
            </div>
          )}
        />

        {/* Past Appointments */}
        <AppointmentList
          title="Past Appointments"
          data={pastAppointments}
          actionButton={(appt) => (
            <button
              onClick={() => router.push(`/appointment/${appt._id}`)}
              className="px-2 py-1 md:px-4 md:py-2 text-[8px] md:text-sm bg-blue-500 text-white rounded"
            >
              View Details
            </button>
          )}
        />
      </div>
    </div>
  );
}
