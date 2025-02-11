"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import UserInterface from "@/types/user.interface";
import Appointment from "@/types/appointment.interfce";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Mail,
  CheckCircle,
  RefreshCw,
  Download,
  Users,
  Star,
  ShieldCheck,
  Headphones,
  Video,
  FileText,
  MessageCircle,
  LifeBuoy,
  Pencil,
  Trash,
  User,
  NotebookTabsIcon,
  CreditCardIcon,
  BadgeIndianRupeeIcon,
  BriefcaseMedicalIcon,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function Page() {
  const [user, setUser] = useState<UserInterface>();
  const [appointment, setAppointment] = useState<Appointment>();
  const [selectedButton, setSelectedButton] = useState<string>(
    "appointment-details"
  );
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const params = useParams<{ appointment_id: string }>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleClick = () => {
    toast.success("Opps! It's coming soon.");
  };

  const fetchUserInfo = async () => {
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
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/user/appointment-details/${params.appointment_id}`
      );
      console.log(response.data.appointment);

      if (response.status === 200) {
        setAppointment(response.data.appointment);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
      fetchAppointments();
    } else {
      router.push("/sign-in");
    }
  }, [isLoggedIn]);

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

  const statuses = [
    {
      title: "Appointment Booked",
      date: `${dayjs(appointment?.createdAt).format("MMMM D, YYYY")} at 
        ${dayjs(appointment?.createdAt).format("h:mm A")}`,
      description: `Appointment successfully scheduled with ${appointment?.doctorId?.name}.`,
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    },
    appointment?.paymentStatus === "completed"
      ? {
          title: "Payment Completed",
          date: `${dayjs(appointment?.updatedAt).format("MMMM D, YYYY")} at 
            ${dayjs(appointment?.updatedAt).format("h:mm A")}`,
          description: `Payment of ₹${appointment?.amountToPay} processed successfully.`,
          icon: <CheckCircle className="text-green-500 w-6 h-6" />,
        }
      : null,
    {
      title: "Appointment Confirmed",
      date: `${dayjs(appointment?.updatedAt).format("MMMM D, YYYY")} at 
        ${dayjs(appointment?.updatedAt).format("h:mm A")}`,
      description: `Your appointment has been confirmed for ${dayjs(
        appointment?.appointmentDate
      ).format("MMMM D, YYYY")} at 
        ${appointment?.appointmentTime}`,
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    },
    {
      title: dayjs(appointment?.appointmentDate).isAfter(dayjs())
        ? "Upcoming Appointment"
        : "Past Appointment",
      date: `${dayjs(appointment?.appointmentDate).format("MMMM D, YYYY")} at 
            ${dayjs(appointment?.appointmentTime, "HH:mm").format("h:mm A")}`,
      description: `Scheduled consultation with ${appointment?.doctorId?.name}`,
      icon: dayjs(appointment?.appointmentDate).isAfter(dayjs()) ? (
        <Clock className="text-blue-500 w-6 h-6" />
      ) : (
        <CheckCircle className="text-green-500 w-6 h-6" />
      ),
    },
  ].filter(Boolean);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-slate-200 p-6 fixed h-screen hidden md:block">
        <Link
          href="/"
          className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
        >
          Bookify
        </Link>
        <ul className="mt-5 space-y-2">
          <a
            href="#appointment-details"
            onClick={() => setSelectedButton("appointment-details")}
          >
            <li
              className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
      ${
        selectedButton === "appointment-details"
          ? "bg-gradient-to-r from-blue-500 to-teal-400 text-slate-50 font-medium text-lg"
          : "bg-slate-200"
      }`}
            >
              <NotebookTabsIcon size={18} /> <span>Details</span>
            </li>
          </a>

          <a
            href="#doctor-profile"
            onClick={() => setSelectedButton("doctor-profile")}
          >
            <li
              className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
      ${
        selectedButton === "doctor-profile"
          ? "bg-gradient-to-r from-blue-500 to-teal-400 text-slate-50 font-medium text-lg"
          : "bg-slate-200"
      }`}
            >
              <User size={18} /> <span>Doctor</span>
            </li>
          </a>

          {appointment?.paymentStatus === "completed" && (
            <a href="#payment" onClick={() => setSelectedButton("payment")}>
              <li
                className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
        ${
          selectedButton === "payment"
            ? "bg-gradient-to-r from-blue-500 to-teal-400 text-slate-50 font-medium text-lg"
            : "bg-slate-200"
        }`}
              >
                <CreditCardIcon size={18} /> <span>Payment</span>
              </li>
            </a>
          )}

          <a href="#status" onClick={() => setSelectedButton("status")}>
            <li
              className={`flex items-center space-x-2 text-gray-600 px-4 py-2 rounded-md 
      ${
        selectedButton === "status"
          ? "bg-gradient-to-r from-blue-500 to-teal-400 text-slate-50 font-medium text-lg"
          : "bg-slate-200"
      }`}
            >
              <CheckCircle size={18} /> <span>Status</span>
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
      </div>

      <div className="flex-1 px-5 pb-6 md:pl-[20%]">
        {/* Appointment Details */}
        <section id="appointment-details">
          <div className="max-w-5xl mx-auto my-16 mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-700 mb-1">
                Appointment Details
              </h2>
              <div className="block md:hidden">
                <Link href="/profile">
                  <Image
                    src={"/assets/avatar.png"}
                    alt="profile"
                    className="rounded-full object-cover"
                    width={44}
                    height={44}
                  />
                </Link>
              </div>
            </div>
            <div className="w-1/6 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mb-10"></div>

            {/* Schedule & Payment Information */}
            <div className="grid grid-cols-2 gap-6">
              {/* Schedule */}
              <Card className="bg-white shadow-md p-6">
                <h4 className="font-semibold text-lg mb-3 text-slate-600">
                  Schedule
                </h4>
                <div className="text-gray-600 flex items-center mb-6">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Date</p>
                    <p className="text-slate-700">
                      {dayjs(appointment?.appointmentDate).format(
                        "MMMM D, YYYY"
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 flex items-center mb-6">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Time</p>
                    <p className="text-slate-700">
                      {appointment?.appointmentTime}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white shadow-md p-6">
                <h4 className="font-semibold text-lg mb-3 text-slate-600">
                  Payment Information
                </h4>
                <div
                  className={`${
                    appointment?.paymentStatus === "completed"
                      ? "text-green-600"
                      : "text-blue-600"
                  } flex items-center mb-6`}
                >
                  {appointment?.paymentStatus === "completed" ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <Clock className="w-5 h-5 mr-2" />
                  )}
                  <div>
                    <p className="text-slate-500 text-sm">Status</p>
                    <p className="font-medium">{appointment?.paymentStatus}</p>
                  </div>
                </div>
                <div className="text-gray-600 flex items-center mb-6">
                  <BadgeIndianRupeeIcon className="w-5 h-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Amount</p>
                    <p className="text-slate-700">
                      ₹ {appointment?.amountToPay}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Reference Information */}
            {appointment?.paymentStatus === "completed" && (
              <Card className="bg-white shadow-md p-6 mt-6">
                <h4 className="font-semibold text-lg mb-3 text-slate-600">
                  Reference Information
                </h4>
                <div className="grid grid-cols-2">
                  <div className="text-gray-700">
                    <p className="text-sm text-slate-500">Order ID</p>
                    <p className="font-medium">{appointment?.orderId}</p>
                  </div>
                  <div className="text-gray-700">
                    <p className="text-sm text-slate-500">Payment ID</p>
                    <p className="font-medium">{appointment?.paymentId}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={handleClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Download className="w-5 h-5 mr-2" /> Download Invoice
              </button>
              {appointment?.paymentStatus === "pending" && (
                <button
                  onClick={() =>
                    router.push(
                      `/payment?appointmentId=${appointment?._id}&amountToPay=${appointment?.amountToPay}`
                    )
                  }
                  className="bg-yellow-400 text-slate-100 px-4 py-2 rounded-md flex items-center"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Doctor Section */}
        <section id="doctor-profile">
          <div className="max-w-5xl mx-auto my-16 mt-10">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-1">
              Doctor Profile
            </h2>

            <div className="w-[10%] h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mb-10"></div>

            {/* Doctor Info Card */}
            <Card className="bg-white shadow-md p-6 flex items-center space-x-6">
              {/* Doctor Image */}
              <div className="w-auto h-auto border border-slate-400 rounded-xl">
                <Image
                  src={appointment?.doctorId.profileImg || "/assets/avatar.png"}
                  alt="Doctor"
                  className="w-28 h-28 rounded-lg object-cover"
                  width={112}
                  height={112}
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {appointment?.doctorId?.name}{" "}
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm">
                    {appointment?.doctorId?.degree}
                  </span>
                </h3>
                <div className="py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                      <BriefcaseMedicalIcon className="w-5 h-5 mr-2 text-green-600" />
                      {appointment?.doctorId?.speciality}
                    </p>
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                      <Clock className="w-5 h-5 mr-2 text-green-600" />{" "}
                      {appointment?.doctorId?.experience} Experience
                    </p>
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                      <Mail className="w-5 h-5 mr-2 text-green-600" />{" "}
                      {appointment?.doctorId?.email}
                    </p>
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                      <BadgeIndianRupeeIcon className="w-5 h-5 mr-2 text-green-600" />{" "}
                      Fee: ₹{appointment?.doctorId?.fees}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* About Section */}
            <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-gray-800">
                About
              </h4>
              <p className="text-gray-600">{appointment?.doctorId?.about}</p>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <Card className="bg-white shadow-md p-4 flex flex-col items-center">
                <Users className="w-6 h-6 text-blue-500" />
                <p className="text-lg font-semibold mt-2 text-gray-800">500+</p>
                <p className="text-gray-600 text-sm">Patients</p>
              </Card>
              <Card className="bg-white shadow-md p-4 flex flex-col items-center">
                <Star className="w-6 h-6 text-yellow-500" />
                <p className="text-lg font-semibold mt-2 text-gray-800">4.8</p>
                <p className="text-gray-600 text-sm">Rating</p>
              </Card>
              <Card className="bg-white shadow-md p-4 flex flex-col items-center">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <p className="text-lg font-semibold mt-2 text-gray-800">4+</p>
                <p className="text-gray-600 text-sm">Years</p>
              </Card>
              <Card className="bg-white shadow-md p-4 flex flex-col items-center">
                <Headphones className="w-6 h-6 text-indigo-500" />
                <p className="text-lg font-semibold mt-2 text-gray-800">24/7</p>
                <p className="text-gray-600 text-sm">Support</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Payment */}
        {appointment?.paymentStatus === "completed" && (
          <section id="payment">
            <div className="max-w-5xl mx-auto mt-10">
              {/* Header */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-1">
                Payment Information
              </h2>

              <div className="w-1/6 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mb-10"></div>

              {/* Payment Status */}
              <Card className="bg-white shadow-md p-6 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className={`w-6 h-6 text-green-400`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Payment Status</p>
                    <p className="text-xl font-semibold text-green-600">
                      Completed
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount Paid</p>
                  <p className="text-2xl font-semibold text-slate-700">
                    ₹{appointment?.amountToPay}.00
                  </p>
                </div>
              </Card>

              {/* Transaction & Breakdown */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                {/* Transaction Details */}
                <Card className="bg-white shadow-md p-6">
                  <h4 className="font-semibold text-lg mb-1 text-gray-800">
                    Transaction Details
                  </h4>
                  <div className="text-gray-600 flex items-center justify-between py-1">
                    <p className="font-medium">Payment ID:</p>
                    <p>{appointment?.paymentId}</p>
                  </div>
                  <div className="text-gray-600 flex items-center justify-between py-1">
                    <p className="font-medium">Order ID:</p>
                    <p>{appointment?.orderId}</p>
                  </div>
                  <div className="text-gray-600 flex items-center justify-between py-1">
                    <p className="font-medium">Payment Type:</p>
                    <p>{appointment?.paymentType}</p>
                  </div>
                  <div className="text-gray-600 flex items-center justify-between py-1">
                    <p className="font-medium">Date:</p>
                    <p>
                      {dayjs(appointment?.updatedAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </Card>

                {/* Payment Breakdown */}
                <Card className="bg-white shadow-md p-6">
                  <h4 className="font-semibold text-lg mb-1 text-gray-800">
                    Payment Breakdown
                  </h4>
                  <div className="text-gray-600 flex items-center justify-between py-1">
                    <p className="font-medium">Consultation Fee:</p>
                    <p>₹{appointment?.amountToPay}.00</p>
                  </div>
                  <div className="text-gray-600 flex items-center justify-between py-1">
                    <p className="font-medium">Platform Fee:</p>
                    <p>₹0.00</p>
                  </div>
                  <div className="text-gray-600 flex items-center justify-between py-1">
                    <p className="font-medium">Tax:</p>
                    <p>₹0.00</p>
                  </div>
                  <div className="text-gray-800 font-semibold flex items-center justify-between py-1">
                    <p>Total Amount:</p>
                    <p>₹{appointment?.amountToPay}</p>
                  </div>
                </Card>
              </div>

              {/* Digital Receipt */}
              <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-lg text-gray-800">
                    Digital Receipt
                  </h4>
                  <button
                    onClick={handleClick}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" /> Download Receipt
                  </button>
                </div>
                <div className="text-gray-600 truncate">
                  <p>Transaction ID:</p>
                  <p>{appointment?.signature}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Appt Status */}
        <section id="status">
          <div className="max-w-5xl mx-auto mt-10">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-1">
              Appointment Status
            </h2>
            <div className="w-1/6 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mb-10"></div>

            {/* Status Timeline */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              {statuses.map((status, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 relative pb-6 last:pb-0"
                >
                  {/* Timeline Indicator */}

                  <div className="relative z-10 ml-2">{status?.icon}</div>
                  {index < statuses.length - 1 && (
                    <div className="absolute left-1 top-6 w-0.5 bg-gray-300 h-[70px] rounded-xl"></div>
                  )}

                  {/* Status Content */}
                  <div>
                    <h4 className="font-semibold text-lg text-gray-700">
                      {status?.title}
                    </h4>
                    <p className="text-sm text-gray-500">{status?.date}</p>
                    <p className="text-gray-600">{status?.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2" /> Add to Calendar
              </button>
              <button
                onClick={handleClick}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" /> Reschedule
              </button>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="max-w-5xl mx-auto mt-10">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-1">
            Appointment Actions
          </h2>
          <div className="w-1/6 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mb-10"></div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="h-3 w-3 rounded-full bg-gray-400"></span>
            <span className="text-gray-600 text-sm">Completed</span>
            <span className="h-3 w-3 rounded-full bg-indigo-500"></span>
            <span className="text-gray-600 text-sm">Upcoming</span>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <Button
                  onClick={handleClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-2"
                >
                  <Calendar className="w-4 h-4 mr-2" /> Add to Calendar
                </Button>
                <Button
                  onClick={handleClick}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Video className="w-4 h-4 mr-2" /> Join Video Call
                </Button>
              </CardContent>
            </Card>

            {/* Manage Appointment */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Manage Appointment</h3>
                <Button
                  onClick={handleClick}
                  variant="outline"
                  className="w-full mb-2"
                >
                  <Pencil className="w-4 h-4 mr-2" /> Reschedule Appointment
                </Button>
                <Button
                  onClick={handleClick}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash className="w-4 h-4 mr-2" /> Cancel Appointment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Options */}
          <Card className="bg-white shadow-md mt-6">
            <CardContent className="p-4 flex space-x-4 justify-between">
              <Button onClick={handleClick} variant="outline">
                <FileText className="w-4 h-4 mr-2" /> View Documents
              </Button>
              <Button onClick={handleClick} variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" /> Send Message
              </Button>
              <Button onClick={handleClick} variant="outline">
                <LifeBuoy className="w-4 h-4 mr-2" /> Get Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
