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
  CreditCardIcon,
  IndianRupeeIcon,
  NotebookTabsIcon,
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

export default function Page() {
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string>("profile");
  const [user] = useState({
    name: "Debnath Mahapatra",
    email: "debnathmahapatra740@gmail.com",
    status: "Active Account",
    appointments: 24,
    pendingPayments: 5,
    completedVisits: 19,
  });

  const [appointments, setAppointments] = useState([
    {
      doctor: "Dr. Richard James",
      specialty: "General Physician",
      date: "Feb 10, 2025",
      time: "10:00 AM",
      amount: "$50",
      payment: "Online",
      status: "Completed",
      image: "/doctor1.png",
    },
    {
      doctor: "Dr. Christopher Lee",
      specialty: "Pediatrician",
      date: "Feb 09, 2025",
      time: "10:00 AM",
      amount: "$40",
      payment: "Cash",
      status: "Pending",
      image: "/doctor2.png",
    },
  ]);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  //   const fetchUserInfo = useCallback(async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axiosInstance.get(`/user`);
  //       if (response.status === 200) {
  //         setUsers(response.data.user);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user info:", error);
  //       setLoading(false);
  //     }
  //   }, []);

  //   const fetchAppointments = useCallback(async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axiosInstance.get(`/user/appointments-details`);
  //       if (response.status === 200) {
  //         setAppointment(response.data.appointments);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching appointments:", error);
  //       setLoading(false);
  //     }
  //   }, []);

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

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       //   fetchUserInfo();
  //       fetchAppointments();
  //     } else {
  //       router.push("/sign-in");
  //     }
  //   }, [fetchAppointments, isLoggedIn, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <video
          controls={false}
          autoPlay
          loop
          className="w-32 sm:w-72 bg-white rounded-full shadow-lg"
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
            <a href="#payments" onClick={() => setSelectedButton("payments")}>
              <li
                className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
               ${
                 selectedButton === "payments" &&
                 "bg-gray-200 hover:bg-gray-300 cursor-pointer text-slate-700"
               }`}
              >
                <CreditCardIcon size={18} /> <span>Payments</span>
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

      {/* Main Content */}
      <div className="md:pl-[20%] w-full">
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold">
            Welcome Back, {user.name.split(" ")[0]}!
          </h2>
          <p className="text-gray-600">Here's your health dashboard</p>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6 flex items-center gap-4">
            <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full">
              <Image
                src="/assets/avatar.png"
                alt="Profile"
                className="w-8 h-8 sm:w-16 sm:h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {user.status}
              </span>
            </div>
            <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <Calendar className="text-blue-500 text-3xl" />
              <div>
                <p className="text-gray-600">Total Appointments</p>
                <h3 className="text-xl font-semibold">{user.appointments}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <IndianRupeeIcon className="text-yellow-500 text-3xl" />
              <div>
                <p className="text-gray-600">Pending Payments</p>
                <h3 className="text-xl font-semibold">
                  {user.pendingPayments}
                </h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <CheckCircle className="text-green-500 text-3xl" />
              <div>
                <p className="text-gray-600">Completed Visits</p>
                <h3 className="text-xl font-semibold">
                  {user.completedVisits}
                </h3>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className="text-blue-500 text-xl" />
                <div>
                  <p>Appointment with Dr. Richard James</p>
                  <p className="text-gray-600">February 10, 2025 - 10:00 AM</p>
                </div>
                <span className="ml-auto bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center gap-4">
                <IndianRupeeIcon className="text-yellow-500 text-xl" />
                <div>
                  <p>Payment Completed</p>
                  <p className="text-gray-600">$50 - Online Payment</p>
                </div>
                <span className="ml-auto bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Paid
                </span>
              </div>
            </div>
          </div>
        </main>

        <main className="flex-1 p-6">
          {/* Appointments Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold">Your Appointments</h3>
            <p className="text-gray-600">
              Manage your upcoming and past appointments
            </p>
            <table className="w-full mt-4">
              <thead>
                <tr className="text-left border-b">
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td>Dr. Richard James</td>
                  <td>Feb 10, 2025</td>
                  <td>10:00 AM</td>
                  <td>$50</td>
                  <td>
                    <span className="text-green-600">Online</span>
                  </td>
                  <td>
                    <span className="text-green-600">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Dr. Christopher Lee</td>
                  <td>Feb 09, 2025</td>
                  <td>10:00 AM</td>
                  <td>$40</td>
                  <td>
                    <span className="text-yellow-600">Cash</span>
                  </td>
                  <td>
                    <span className="text-yellow-600">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payments History Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Payments History</h3>
            <p className="text-gray-600">Track all your medical payments</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <p>Total Spent</p>
                <h4 className="text-2xl">$450</h4>
                <p>+$50 from last month</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p>Pending Payments</p>
                <h4 className="text-2xl">$200</h4>
                <p>Due within 30 days</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p>Completed Payments</p>
                <h4 className="text-2xl">$250</h4>
                <p>Last payment 2 days ago</p>
              </div>
            </div>
          </div>
        </main>

        <main className="flex-1 p-6">
          {/* Appointments Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
            <Card>
              <div className="p-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 flex items-center gap-2">
                          <img
                            src={appointment.image}
                            alt={appointment.doctor}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{appointment.doctor}</p>
                            <p className="text-sm text-gray-500">
                              {appointment.specialty}
                            </p>
                          </div>
                        </td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.amount}</td>
                        <td>
                          <Badge>{appointment.payment}</Badge>
                        </td>
                        <td>
                          <Badge
                            className={
                              appointment.status === "Completed"
                                ? "bg-green-200 text-green-700"
                                : "bg-yellow-200 text-yellow-700"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          className="cursor-pointer"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          className="cursor-pointer"
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </Card>
          </section>

          {/* Payments Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Payments History</h2>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-blue-500 text-white">
                <p>Total Spent</p>
                <h3 className="text-2xl font-bold">$450</h3>
                <p>+ $50 from last month</p>
              </Card>
              <Card className="p-4">
                <p>Pending Payments</p>
                <h3 className="text-2xl font-bold">$200</h3>
                <p>Due within 30 days</p>
              </Card>
              <Card className="p-4">
                <p>Completed Payments</p>
                <h3 className="text-2xl font-bold">$250</h3>
                <p>Last payment 2 days ago</p>
              </Card>
            </div>
          </section>
        </main>

        <div className="min-h-screen p-6">
          <div className="mx-auto">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="text-gray-600">Manage your account preferences</p>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-[70%]">
                {/* Profile Information */}
                <div className="mt-6 bg-white p-4 rounded-lg">
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
                      value="Debnath Mahapatra"
                      className="w-full p-2 border rounded mt-1"
                      readOnly
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value="debnathmahapatra740@gmail.com"
                      className="w-full p-2 border rounded mt-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Security */}
                <div className="mt-6 bg-white p-4 rounded-lg">
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

              <div className="flex flex-col">
                {/* Notifications */}
                <div className="mt-6 bg-white p-4 rounded-lg">
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
                <div className="mt-6 bg-white p-4 rounded-lg">
                  <h3 className="font-semibold">Account Actions</h3>
                  <button className="w-full mt-4 p-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white">
                    Deactivate Account
                  </button>
                  <button className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
