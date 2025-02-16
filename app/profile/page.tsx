"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import dayjs from "dayjs";
import Appointment from "@/types/appointment.interfce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { logout } from "@/redux/slices/authSlice";
import { removeTokens } from "@/lib/token";
import {
  Calendar,
  CheckCircle,
  FilterIcon,
  IndianRupeeIcon,
  NotebookTabsIcon,
  PlusIcon,
  Settings,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Switch } from "@headlessui/react";
import UserInterface from "@/types/user.interface";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string>("profile");
  const [user, setUser] = useState<UserInterface>();
  const [totalAppt, setTotalAppt] = useState<number>();
  const [loadingButtonId, setLoadingButtonId] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    } catch {
      setLoading(false);
      toast.error("Unable to fetch user info!");
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/appointments-details`);

      if (response.status === 200) {
        setAppointment(response.data.appointments);
        setTotalAppt(response.data.totalCount);
        setLoading(false);
      }
    } catch {
      setLoading(false);
      
      toast.error("Unable to fetch user appointments details!");
    }
  }, []);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      const response = await axiosInstance.delete("/auth/logout");

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

  const handleClick = () => {
    toast("Opps! Is's coming soon.");
  };

  const today = dayjs().startOf("day");
  const upcomingAppointments = appointment.filter((appt) =>
    dayjs(appt.appointmentDate).isAfter(today)
  );
  const pastAppointments = appointment
    .filter((appt) => dayjs(appt.appointmentDate).isBefore(today))
    .slice(0, 10);

  const completedPayments = appointment.filter(
    (appt) => appt.paymentStatus === "completed"
  );

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
        <video
          controls={false}
          autoPlay
          loop
          className="w-40 sm:w-72 bg-white rounded-full shadow-lg"
        >
          <source src="/assets/loading.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <aside className="w-[284px] bg-white p-6 shadow-md fixed h-screen hidden md:block">
        <Link
          href="/"
          className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
        >
          Bookify
        </Link>
        <nav className="mt-6 space-y-6">
          <ul>
            <a href="#profile" onClick={() => setSelectedButton("profile")}>
              <li
                className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
              ${
                selectedButton === "profile" &&
                "bg-gray-200 hover:bg-gray-300 cursor-pointer text-slate-700"
              }`}
              >
                <User size={18} /> <span>Profile</span>
              </li>
            </a>
            <a
              href="#appointments"
              onClick={() => setSelectedButton("appointments")}
            >
              <li
                className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
               ${
                 selectedButton === "appointments" &&
                 "bg-gray-200 hover:bg-gray-300 cursor-pointer text-slate-700"
               }`}
              >
                <NotebookTabsIcon size={18} /> <span>Appointments</span>
              </li>
            </a>
            <a href="#settings" onClick={() => setSelectedButton("settings")}>
              <li
                className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
               ${
                 selectedButton === "settings" &&
                 "bg-gray-200 hover:bg-gray-300 cursor-pointer text-slate-700"
               }`}
              >
                <Settings size={18} /> <span>settings</span>
              </li>
            </a>
          </ul>

          <div className="absolute bottom-6">
            <div className="flex gap-2">
              <Link href="/profile">
                <Image
                  src={"/assets/avatar.png"}
                  alt="profile"
                  className="rounded-full object-cover"
                  width={44}
                  height={44}
                />
              </Link>
              <div className="mt-2">
                <p className="text-gray-800 text-sm">{user?.name}</p>
                <p className="text-slate-500 text-xs">{user?.email}</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <nav className="bg-transparent fixed w-full z-50 mt-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with Smooth Transition */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                className="md:hidden fixed top-0 right-0 h-screen w-3/4 sm:w-1/2 bg-neutral-100 shadow-lg p-6 z-40"
              >
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-6 text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
                  >
                    Bookify
                  </Link>
                  <nav className="mt-6 space-y-6">
                    <ul>
                      <a
                        href="#profile"
                        onClick={() => setSelectedButton("profile")}
                      >
                        <li
                          className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
                    ${
                      selectedButton === "profile" &&
                      "bg-gray-200 hover:bg-gray-300 cursor-pointer text-slate-700"
                    }`}
                        >
                          <User size={18} /> <span>Profile</span>
                        </li>
                      </a>
                      <a
                        href="#appointments"
                        onClick={() => setSelectedButton("appointments")}
                      >
                        <li
                          className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
                     ${
                       selectedButton === "appointments" &&
                       "bg-gray-200 hover:bg-gray-300 cursor-pointer text-slate-700"
                     }`}
                        >
                          <NotebookTabsIcon size={18} />{" "}
                          <span>Appointments</span>
                        </li>
                      </a>
                      <a
                        href="#settings"
                        onClick={() => setSelectedButton("settings")}
                      >
                        <li
                          className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
                     ${
                       selectedButton === "settings" &&
                       "bg-gray-200 hover:bg-gray-300 cursor-pointer text-slate-700"
                     }`}
                        >
                          <Settings size={18} /> <span>settings</span>
                        </li>
                      </a>
                    </ul>

                    <div className="absolute bottom-6">
                      <div className="flex gap-2">
                        <Link href="/profile">
                          <Image
                            src={"/assets/avatar.png"}
                            alt="profile"
                            className="rounded-full object-cover"
                            width={44}
                            height={44}
                          />
                        </Link>
                        <div className="mt-2">
                          <p className="text-gray-800 text-sm">{user?.name}</p>
                          <p className="text-slate-500 text-xs">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <div className="md:pl-[20%] w-full">
        <main className="flex-1 p-3 md:p-6" id="profile">
          <h2 className="text-sm md:text-2xl font-semibold text-gray-800">
            Welcome Back, {user?.name.split(" ")[0]}!
          </h2>
          <p className="text-gray-600">Here&apos;s your health dashboard</p>

          {/* Profile Card */}
          <div className="bg-white p-3 md:p-6 rounded-lg shadow-md mt-3 md:mt-6 flex items-center gap-4">
            <div className="rounded-full">
              <Image
                src="/assets/avatar.png"
                alt="Profile"
                className="rounded-full object-cover"
                width={94}
                height={94}
              />
            </div>
            <div>
              <h3 className="text-sm md:text-xl font-semibold">{user?.name}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{user?.email}</p>
              <span className="bg-green-100 text-green-700 px-1 md:px-3 py-1 rounded-full text-[8px] md:text-sm">
                Active Account
              </span>
            </div>
            <button
              onClick={handleClick}
              className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-1 md:px-4 py-0.5 md:py-2 rounded md:rounded-lg text-[8px] md:text-lg"
            >
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3 md:mt-6">
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm md:text-lg">
                  Total Appointments
                </p>
                <div className="bg-blue-100 rounded-md p-1 md:p-2">
                  <Calendar className="text-blue-500 text-xl md:text-3xl" />
                </div>
              </div>

              <div className="mt-1 md:mt-2">
                <h3 className="text-xl md:text-3xl font-semibold text-slate-700">
                  {totalAppt}
                </h3>
              </div>
            </div>
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm md:text-lg">
                  Completed Payments
                </p>
                <div className="bg-yellow-100 rounded-md p-1 md:p-2">
                  <IndianRupeeIcon className="text-yellow-500 text-xl md:text-3xl" />
                </div>
              </div>

              <div className="mt-1 md:mt-2">
                <h3 className="text-xl md:text-3xl font-semibold text-slate-700">
                  {completedPayments.length}
                </h3>
              </div>
            </div>
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm md:text-lg">
                  Completed Visits
                </p>
                <div className="bg-green-100 rounded-md p-1 md:p-2">
                  <CheckCircle className="text-green-500 text-xl md:text-3xl" />
                </div>
              </div>

              <div className="mt-1 md:mt-2">
                <h3 className="text-xl md:text-3xl font-semibold text-slate-700">
                  {pastAppointments.length}
                </h3>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {appointment[0] && (
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-md mt-3 md:mt-6">
              <h3 className="tex-sm md:text-lg font-semibold text-slate-700">
                Recent Activity
              </h3>
              <div className="mt-4 md:mt-8 space-y-6">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="p-1 md:p-2 bg-blue-100 rounded-full">
                    <Calendar className="text-blue-500 text-sm md:text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">
                      Appointment with {appointment[0]?.doctorId.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {dayjs(appointment[0]?.appointmentDate).format(
                        "MMMM D, YYYY"
                      )}{" "}
                      at {appointment[0]?.appointmentTime}
                    </p>
                  </div>
                  <span className="ml-auto bg-green-100 text-green-600 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm">
                    Confirmed
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="p-1 md:p-2 bg-yellow-100 rounded-full">
                    <IndianRupeeIcon className="text-yellow-500 text-sm md:text-xl" />
                  </div>

                  {appointment[0]?.paymentStatus === "completed" ? (
                    <div>
                      <p className="text-gray-600 text-sm">Payment Completed</p>
                      <p className="text-gray-500 text-xs">
                        ₹{appointment[0]?.amountToPay} - Online Payment
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 text-sm">Payment Pending</p>
                      <p className="text-gray-500 text-xs">
                        ₹{appointment[0]?.amountToPay} - Cash Payment
                      </p>
                    </div>
                  )}

                  <span className="ml-auto bg-blue-100 text-blue-600 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm">
                    {appointment[0]?.paymentStatus === "completed"
                      ? "Paid"
                      : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>

        <main className="flex-1 p-3 md:p-6" id="appointments">
          {/* Appointments Section */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-sm md:text-2xl font-semibold text-gray-800">
                  Your Appointments
                </h2>
                <p className="text-gray-600 text-xs md:text-lg">
                  Manage your upcoming and past appointments
                </p>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={handleClick}
                  className="ml-auto bg-slate-50 hover:bg-slate-100 text-gray-700 px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center gap-1 md:gap-2"
                >
                  <FilterIcon className="w-2 h-3 md:w-5 md:h-6" />
                  <span className="text-xs md:text-lg">Filters</span>
                </button>
                <button
                  onClick={() => router.push("/doctors")}
                  className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-1 md:px-4 py-0.5 md:py-2 rounded-lg flex items-center gap-1 md:gap-2"
                >
                  <PlusIcon className="w-2 h-3 md:w-5 md:h-6" />
                  <span className="text-[8px] md:text-lg">New Appointment</span>
                </button>
              </div>
            </div>

            {/* Appointments Section */}
            <section className="mb-3 md:mb-6">
              <Card className="mb-3 md:mb-6">
                <h2 className="text-sm md:text-lg font-semibold text-gray-600 mt-1 md:mt-2 ml-0.5 md:ml-4">
                  Upcoming Appointments
                </h2>
                <div className="p-0.5 md:p-4">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-600 border-b text-xs md:text-lg">
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAppointments.map((appointment, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-1 md:py-4 flex items-center gap-2 text-gray-700">
                            <Image
                              src={
                                appointment?.doctorId.profileImg ||
                                "/assets/avatar.png"
                              }
                              alt={appointment?.doctorId.name}
                              width={44}
                              height={44}
                              className="rounded-full"
                            />
                            <div>
                              <p className="md:font-medium text-xs md:text-lg">
                                {appointment?.doctorId.name}
                              </p>
                              <p className="text-[8px] md:text-sm text-gray-500">
                                {appointment?.doctorId.speciality}
                              </p>
                            </div>
                          </td>
                          <td className="text-[8px] md:text-lg">
                            {dayjs(appointment?.appointmentDate).format(
                              "MMMM D, YYYY"
                            )}
                          </td>
                          <td className="text-[8px] md:text-lg">
                            {appointment?.appointmentTime}
                          </td>
                          <td className="text-[8px] md:text-lg">
                            ₹{appointment?.amountToPay}
                          </td>
                          <td>
                            <Badge className="cursor-pointer text-[8px] md:text-xs">
                              {appointment?.paymentType}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              className={
                                appointment?.paymentStatus === "completed"
                                  ? "bg-green-200 text-green-700 hover:bg-green-100 cursor-pointer text-[8px] md:text-xs"
                                  : "bg-yellow-200 text-yellow-700 hover:bg-yellow-100 cursor-pointer text-[8px] md:text-xs"
                              }
                            >
                              {appointment?.paymentStatus}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              onClick={() => {
                                setLoadingButtonId(appointment?._id);
                                router.push(`/appointment/${appointment?._id}`);
                              }}
                              className="bg-green-200 text-green-700 hover:bg-green-100 cursor-pointer text-[8px] md:text-xs"
                            >
                              {loadingButtonId === appointment?._id
                                ? "Loading..."
                                : "Details"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-3 md:mt-6 mb-1">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            className="cursor-pointer text-[8px] md:text-xs"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive
                            className="text-[8px] md:text-xs"
                          >
                            {currentPage}
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            className="cursor-pointer text-[8px] md:text-xs"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </Card>

              <Card className="mb-3 md:mb-6">
                <h2 className="text-sm md:text-lg font-semibold text-gray-600 mt-1 md:mt-2 ml-0.5 md:ml-4">
                  Past Appointments
                </h2>
                <div className="p-0.5 md:p-4">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-600 border-b text-xs md:text-lg">
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastAppointments.map((appointment, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-1 md:py-4 flex items-center gap-2 text-gray-700">
                            <Image
                              src={
                                appointment?.doctorId.profileImg ||
                                "/assets/avatar.png"
                              }
                              alt={appointment?.doctorId.name}
                              width={44}
                              height={44}
                              className="rounded-full"
                            />
                            <div>
                              <p className="md:font-medium text-xs md:text-lg">
                                {appointment?.doctorId.name}
                              </p>
                              <p className="text-[8px] md:text-sm text-gray-500">
                                {appointment?.doctorId.speciality}
                              </p>
                            </div>
                          </td>
                          <td className="text-[8px] md:text-lg">
                            {dayjs(appointment?.appointmentDate).format(
                              "MMMM D, YYYY"
                            )}
                          </td>
                          <td className="text-[8px] md:text-lg">
                            {appointment?.appointmentTime}
                          </td>
                          <td className="text-[8px] md:text-lg">
                            ₹{appointment?.amountToPay}
                          </td>
                          <td>
                            <Badge className="cursor-pointer text-[8px] md:text-xs">
                              {appointment?.paymentType}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              className={
                                appointment?.paymentStatus === "completed"
                                  ? "bg-green-200 text-green-700 hover:bg-green-100 cursor-pointer text-[8px] md:text-xs"
                                  : "bg-yellow-200 text-yellow-700 hover:bg-yellow-100 cursor-pointer text-[8px] md:text-xs"
                              }
                            >
                              {appointment?.paymentStatus}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              onClick={() => {
                                setLoadingButtonId(appointment?._id);
                                router.push(`/appointment/${appointment?._id}`);
                              }}
                              className="bg-green-200 text-green-700 hover:bg-green-100 cursor-pointer text-[8px] md:text-xs"
                            >
                              {loadingButtonId === appointment?._id
                                ? "Loading..."
                                : "Details"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-3 md:mt-6 mb-1">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            className="cursor-pointer text-[8px] md:text-xs"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive
                            className="text-[8px] md:text-xs"
                          >
                            {currentPage}
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            className="cursor-pointer text-[8px] md:text-xs"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </main>

        <main className="flex-1 p-3 md:p-6" id="settings">
          <div className="mx-auto">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
              Settings
            </h2>
            <p className="text-gray-600 mb-2">
              Manage your account preferences
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
              <div className="flex flex-col gap-6 w-full md:w-[70%]">
                {/* Profile Information */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold">Profile Information</h3>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">
                      Change Photo
                    </button>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Ed Sheeran"
                      className="w-full p-2 border rounded mt-1"
                      readOnly
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="sheeran@ai.com"
                      className="w-full p-2 border rounded mt-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Security */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold">Security</h3>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded mt-1"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded mt-1"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded mt-1"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full md:w-[30%] gap-2 md:gap-4">
                {/* Notifications */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span>Email Notifications</span>
                    <Switch
                      checked={emailNotifications}
                      onChange={setEmailNotifications}
                      className={`${
                        emailNotifications ? "bg-blue-500" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">
                        Enable email notifications
                      </span>
                      <span
                        className={`${
                          emailNotifications ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span>SMS Notifications</span>
                    <Switch
                      checked={smsNotifications}
                      onChange={setSmsNotifications}
                      className={`${
                        smsNotifications ? "bg-blue-500" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable SMS notifications</span>
                      <span
                        className={`${
                          smsNotifications ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold">Account Actions</h3>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-4 p-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
                  >
                    {loadingLogout ? "Loading..." : "Log Out"}
                  </button>
                  <button className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
