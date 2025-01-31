"use client";

import axiosInstance from "@/lib/axiosInstance";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import Doctor from "@/types/doctor.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setDoctorId } from "@/redux/slices/appointmentSlice";

export default function Page() {
  const [doctor, setDoctor] = useState<Doctor>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const docId = useParams<{ doctors: string; id: string }>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const fetchDocInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/doctor/${docId.id}`);
      if (response.status === 200) {
        setDoctor(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (docId) {
      fetchDocInfo();
    }
  }, [docId, fetchDocInfo]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center p-6 gap-10 bg-white mt-8 mb-4 shadow-xl rounded-lg">
          <div className="flex items-center bg-gray-100 rounded-full justify-center">
            {loading ? (
              <Image
                src="/assets/avatar.png"
                alt="Doctor's profile"
                className="w-[192px] h-[192px] rounded-full"
                width={192}
                height={192}
              />
            ) : (
              doctor?.profileImg && (
                <Image
                  src={doctor.profileImg}
                  alt="Doctor's profile"
                  className="w-[192px] h-[192px] rounded-full"
                  width={192}
                  height={192}
                />
              )
            )}
          </div>
          <div className="w-[75%]">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {doctor?.name}
                </h1>
                <p className="text-gray-600 text-lg font-medium">
                  {doctor?.speciality}
                </p>
                <div className="text-blue-600 flex items-center">
                  <div className="flex gap-1 items-center justify-center">
                    <Star className="w-5 h-5" />
                    <p className="mt-0.5">4.8</p>
                  </div>
                  <div className="text-gray-500 ml-2">(120 reviews)</div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (isLoggedIn && doctor) {
                      dispatch(
                        setDoctorId({ doctorId: doctor?._id })
                      );
                      router.push("/appointment");
                    } else {
                      router.replace("/sign-in");
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0"
                >
                  {loading ? "Loading..." : "Book Appointment"}
                </button>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <div>
                <p className="text-gray-600 text-lg font-medium">
                  Specialization: Cardiology, Heart Surgery
                </p>
                <p className="text-gray-600 text-lg font-medium">
                  Experience: {doctor?.experience}
                </p>
                <p className="text-gray-600 text-lg font-medium">
                  Consultation Fee: ₹{doctor?.fees}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-lg font-medium">
                  Phone: +91 123 456 7890
                </p>
                <p className="text-gray-600 text-lg font-medium">
                  Email: dr.smith@hospital.com
                </p>
                <p className="text-gray-600 text-lg font-medium">
                  Location: 123 Medical Center, New York
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Available Appointments */}
          <div className="md:col-span-2 bg-white my-4 shadow-xl rounded-lg p-6">
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              Available Appointments
            </h2>
            <div className="flex space-x-2 mb-4">
              {[
                "Today",
                "Tomorrow",
                "Wed, 20 Jul",
                "Thu, 21 Jul",
                "Fri, 22 Jul",
              ].map((day, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md ${
                    index === 0 ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "9:00 AM",
                "9:30 AM",
                "10:00 AM",
                "10:30 AM",
                "11:00 AM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
              ].map((time, index) => (
                <button
                  key={index}
                  className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Education & Experience */}
          <div className="bg-white my-4 shadow-xl rounded-lg p-6">
            <h2 className="text-lg font-bold mb-2 text-gray-800">
              Education & Experience
            </h2>
            <div>
              <div className="mb-2">
                <p className="text-gray-800 font-semibold">
                  Medical Education:
                </p>
                <p className="text-gray-700">
                  MD - Cardiology, Harvard Medical School (2000-2004)
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-800 font-semibold">Residency:</p>
                <p className="text-gray-700">Mayo Clinic (2004-2007)</p>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">Fellowship:</p>
                <p className="text-gray-700">
                  Johns Hopkins Hospital (2007-2009)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Reviews */}
        <div className="p-6 bg-white my-4 shadow-xl rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Patient Reviews
          </h2>
          {[
            {
              name: "Sarah Wilson",
              rating: 5,
              review:
                "Excellent doctor! Very thorough and patient in explaining everything. Highly recommended.",
              time: "2 days ago",
            },
            {
              name: "Michael Brown",
              rating: 4.5,
              review:
                "Great experience with Dr. Smith. Very knowledgeable and professional.",
              time: "1 week ago",
            },
          ].map((review, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/assets/avatar.png"
                  alt={`${review.name} Avatar`}
                  className="w-15 h-15 rounded-full bg-slate-200"
                  width={60}
                  height={60}
                />

                <div>
                  <div className="flex gap-2">
                    <h3 className="font-bold text-gray-800">{review.name}</h3>
                    <span>•</span>
                    <div className="text-yellow-500 flex gap-1 items-center">
                      <Star className="w-4 h-4" />{" "}
                      <p className="mt-0">{review.rating}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-1">{review.review}</p>
                  <p className="text-gray-400 text-sm">{review.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
