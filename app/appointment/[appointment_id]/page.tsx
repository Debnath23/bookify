"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import UserInterface from "@/types/user.interface";
import Appointment from "@/types/appointment.interfce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { logout } from "@/redux/slices/authSlice";
import { removeTokens } from "@/lib/token";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  DollarSign,
  Mail,
  CheckCircle,
  RefreshCw,
  Download,
  Users,
  Star,
  ShieldCheck,
  Headphones,
  HelpCircle,
  CreditCard,
  Video,
  FileText,
  MessageCircle,
  LifeBuoy,
  Pencil,
  Trash,
  User,
  NotebookTabsIcon,
  CreditCardIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const [user, setUser] = useState<UserInterface>();
  const [appointment, setAppointment] = useState<Appointment>();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams<{ appointment_id: string }>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
      fetchAppointments();
    } else {
      router.push("/sign-in");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <video controls={false} autoPlay loop className="w-32 sm:w-64">
          <source src="/assets/loading.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
  const timeline = [
    {
      title: "Appointment Created",
      description: "Initial appointment request submitted",
      time: "Feb 07, 10:07 AM",
    },
    {
      title: "Payment Processed",
      description: "Payment of $50 completed via Online payment",
      details: "Transaction ID: pay_PSmXy12MpKxg66",
      time: "Feb 07, 10:08 AM",
    },
    {
      title: "Appointment Confirmed",
      description: "Appointment slot confirmed with Dr. Richard James",
      time: "Feb 07, 10:08 AM",
    },
    {
      title: "Upcoming Appointment",
      description: "Scheduled consultation with Dr. Richard James",
      extra: "⏳ Time until appointment: 3 days",
      time: "Feb 10, 10:00 AM",
    },
  ];
  const statuses = [
    {
      title: "Appointment Booked",
      date: "Feb 07, 2025 at 10:07 AM",
      description: "Appointment successfully scheduled with Dr. Richard James",
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Payment Completed",
      date: "Feb 07, 2025 at 10:08 AM",
      description: "Payment of $50.00 processed successfully",
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Appointment Confirmed",
      date: "Feb 07, 2025 at 10:08 AM",
      description:
        "Your appointment has been confirmed for Feb 10, 2025 at 10:00 AM",
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Upcoming Appointment",
      date: "Feb 10, 2025 at 10:00 AM",
      description: "Scheduled consultation with Dr. Richard James",
      icon: <Clock className="text-blue-500 w-6 h-6" />,
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">MedCare</h2>
        <ul className="mt-5 space-y-4">
          <li className="flex items-center space-x-2 text-gray-600">
            <NotebookTabsIcon size={18} /> <span>Details</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-600">
            <User size={18} /> <span>Doctor</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-600">
            <CreditCardIcon size={18} /> <span>Payment</span>
          </li>
          <li className="flex items-center space-x-2 font-semibold text-black">
            <CheckCircle size={18} /> <span>Status</span>
          </li>
        </ul>
        <div className="absolute bottom-6">
          <p className="text-gray-700">doc1@ai.com</p>
          <a href="#" className="text-blue-500">
            View Profile
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5">
        {/* Appointment Details */}
        <div className="max-w-5xl mx-auto mt-10">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Appointment Details
          </h2>

          {/* Schedule & Payment Information */}
          <div className="grid grid-cols-2 gap-6">
            {/* Schedule */}
            <Card className="bg-white shadow-md p-6">
              <h4 className="font-semibold text-lg mb-3">Schedule</h4>
              <p className="text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Date:{" "}
                <span className="ml-2">February 10, 2025</span>
              </p>
              <p className="text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Time:{" "}
                <span className="ml-2">10:00 AM</span>
              </p>
            </Card>

            {/* Payment Information */}
            <Card className="bg-white shadow-md p-6">
              <h4 className="font-semibold text-lg mb-3">
                Payment Information
              </h4>
              <p className="text-green-600 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" /> Status:{" "}
                <span className="ml-2 font-medium">Completed</span>
              </p>
              <p className="text-gray-600 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" /> Amount:{" "}
                <span className="ml-2">$50.00</span>
              </p>
            </Card>
          </div>

          {/* Reference Information */}
          <Card className="bg-white shadow-md p-6 mt-6">
            <h4 className="font-semibold text-lg mb-3">
              Reference Information
            </h4>
            <div className="grid grid-cols-2">
              <p className="text-gray-600">
                <span className="font-medium">Order ID:</span>{" "}
                order_PsmXfs3XTjSGts
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Payment ID:</span>{" "}
                pay_PsmXy12MpkXg66
              </p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center space-x-4 mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <Download className="w-5 h-5 mr-2" /> Download Invoice
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" /> Need Help?
            </button>
          </div>
        </div>

        {/* Doctor Section */}
        <div className="max-w-5xl mx-auto mt-10">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Doctor Profile
          </h2>

          {/* Doctor Info Card */}
          <Card className="bg-white shadow-md p-6 flex items-center space-x-6">
            {/* Doctor Image */}
            <Image
              src="/assets/avatar.png"
              alt="Doctor"
              className="w-28 h-28 rounded-lg object-cover"
              width={112}
              height={112}
            />

            {/* Doctor Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                Dr. Richard James{" "}
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm">
                  MBBS
                </span>
              </h3>
              <p className="text-gray-600 flex items-center">
                General Physician
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <Mail className="w-4 h-4 mr-2" /> doc1@ai.com
              </p>
              <div className="flex items-center space-x-4 mt-3 text-gray-700">
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> 4 Years Experience
                </p>
                <p className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" /> Consultation Fee: $50
                </p>
              </div>
            </div>
          </Card>

          {/* About Section */}
          <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">About</h4>
            <p className="text-gray-600">
              Dr. Richard James is committed to delivering comprehensive medical
              care, focusing on preventive medicine, early diagnosis, and
              effective treatment strategies. He provides quality healthcare
              solutions to ensure optimal patient well-being.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <Card className="bg-white shadow-md p-4 flex flex-col items-center">
              <Users className="w-6 h-6 text-blue-500" />
              <p className="text-lg font-semibold mt-2">500+</p>
              <p className="text-gray-600 text-sm">Patients</p>
            </Card>
            <Card className="bg-white shadow-md p-4 flex flex-col items-center">
              <Star className="w-6 h-6 text-yellow-500" />
              <p className="text-lg font-semibold mt-2">4.8</p>
              <p className="text-gray-600 text-sm">Rating</p>
            </Card>
            <Card className="bg-white shadow-md p-4 flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <p className="text-lg font-semibold mt-2">4+</p>
              <p className="text-gray-600 text-sm">Years</p>
            </Card>
            <Card className="bg-white shadow-md p-4 flex flex-col items-center">
              <Headphones className="w-6 h-6 text-indigo-500" />
              <p className="text-lg font-semibold mt-2">24/7</p>
              <p className="text-gray-600 text-sm">Support</p>
            </Card>
          </div>
        </div>

        {/* Payment */}
        <div className="max-w-5xl mx-auto mt-10">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Payment Information
          </h2>

          {/* Payment Status */}
          <Card className="bg-white shadow-md p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <p className="text-lg font-semibold text-green-600">
                Payment Status
              </p>
            </div>
            <p className="text-lg font-semibold">$50.00</p>
          </Card>

          {/* Transaction & Breakdown */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Transaction Details */}
            <Card className="bg-white shadow-md p-6">
              <h4 className="font-semibold text-lg mb-3">
                Transaction Details
              </h4>
              <p className="text-gray-600">
                <span className="font-medium">Payment ID:</span>{" "}
                pay_PsmXy12MpkXg66
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Order ID:</span>{" "}
                order_PsmXfs3XTjSGts
              </p>
              <p className="text-gray-600 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> Online
              </p>
              <p className="text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Feb 07, 2025
              </p>
            </Card>

            {/* Payment Breakdown */}
            <Card className="bg-white shadow-md p-6">
              <h4 className="font-semibold text-lg mb-3">Payment Breakdown</h4>
              <p className="text-gray-600">
                <span className="font-medium">Consultation Fee:</span> $50.00
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Platform Fee:</span> $0.00
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Tax:</span> $0.00
              </p>
              <p className="text-lg font-semibold mt-3">Total Amount: $50.00</p>
            </Card>
          </div>

          {/* Digital Receipt */}
          <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">Digital Receipt</h4>
            <p className="text-gray-600 truncate">
              Transaction ID:
              6a98baf44c1c9a921a3c9d3b1094e12d4991700495bfa495595b62a28c48d36d
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <Download className="w-5 h-5 mr-2" /> Download Receipt
            </button>
          </div>
        </div>

        {/* Appt Status */}
        <div className="max-w-5xl mx-auto mt-10">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Appointment Status
          </h2>

          {/* Status Timeline */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            {statuses.map((status, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 relative pb-6 last:pb-0"
              >
                {/* Timeline Indicator */}
                <div className="absolute left-3 top-8 w-0.5 bg-gray-300 h-full last:hidden"></div>
                <div className="relative z-10">{status.icon}</div>

                {/* Status Content */}
                <div>
                  <h4 className="font-semibold text-lg">{status.title}</h4>
                  <p className="text-sm text-gray-500">{status.date}</p>
                  <p className="text-gray-600">{status.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <Calendar className="w-5 h-5 mr-2" /> Add to Calendar
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center">
              <RefreshCw className="w-5 h-5 mr-2" /> Reschedule
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Appointment Timeline
          </h2>
          <div className="relative border-l-4 border-indigo-500">
            {timeline.map((item, index) => (
              <div key={index} className="mb-6 ml-4 relative">
                <span className="absolute -left-[13px] bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {index === timeline.length - 1 ? (
                    <Clock size={16} />
                  ) : (
                    <CheckCircle size={16} />
                  )}
                </span>
                <Card className="bg-indigo-50 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.title}</h3>
                      <span className="text-gray-500 text-sm">{item.time}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                    {item.details && (
                      <p className="text-xs text-gray-500">{item.details}</p>
                    )}
                    {item.extra && (
                      <p className="text-sm text-indigo-600 font-medium">
                        {item.extra}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="max-w-5xl mx-auto mt-10">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Appointment Actions
          </h2>
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-2">
                  <Calendar className="w-4 h-4 mr-2" /> Add to Calendar
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Video className="w-4 h-4 mr-2" /> Join Video Call
                </Button>
              </CardContent>
            </Card>

            {/* Manage Appointment */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Manage Appointment</h3>
                <Button variant="outline" className="w-full mb-2">
                  <Pencil className="w-4 h-4 mr-2" /> Reschedule Appointment
                </Button>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <Trash className="w-4 h-4 mr-2" /> Cancel Appointment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Options */}
          <Card className="bg-white shadow-md mt-6">
            <CardContent className="p-4 flex space-x-4 justify-between">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" /> View Documents
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" /> Send Message
              </Button>
              <Button variant="outline">
                <LifeBuoy className="w-4 h-4 mr-2" /> Get Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
