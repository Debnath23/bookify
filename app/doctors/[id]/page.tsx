"use client";

import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Doctor {
  name: string;
  profileImg: string;
  degree: string;
  speciality: string;
  fees: string;
  about: string;
}

export default function page() {
  const [docInfo, setDocInfo] = useState<Doctor>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const docId = useParams<{ doctors: string; id: string }>();

  const fetchDocInfo = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/doctor/${docId.id}`);
      if (response.status === 200) {
        setDocInfo(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (docId) {
      fetchDocInfo();
    }
  }, [docId]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:justify-between p-6">
          <div className="flex items-center">
            <img
              src={docInfo?.profileImg}
              alt="Doctor Avatar"
              className="w-24 h-24 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Dr. John Smith</h1>
              <p className="text-gray-600">Cardiologist</p>
              <p className="text-yellow-500 flex items-center">
                ⭐ 4.8 <span className="text-gray-500 ml-2">(120 reviews)</span>
              </p>
              <p className="text-gray-500">Consultation Fee: $150</p>
            </div>
          </div>
          <button
          onClick={() => router.replace('/appointment')}
           className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0">
            Book Appointment
          </button>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Available Appointments */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-bold mb-2">Available Appointments</h2>
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
                    index === 0 ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "9:00 AM",
                "10:00 AM",
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
          <div>
            <h2 className="text-lg font-bold mb-2">Education & Experience</h2>
            <ul className="text-gray-700">
              <li>
                <strong>Medical Education:</strong> MD - Cardiology, Harvard
                Medical School (2000-2004)
              </li>
              <li>
                <strong>Residency:</strong> Mayo Clinic (2004-2007)
              </li>
              <li>
                <strong>Fellowship:</strong> Johns Hopkins Hospital (2007-2009)
              </li>
            </ul>
          </div>
        </div>

        {/* Patient Reviews */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Patient Reviews</h2>
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
                <img
                  src={docInfo?.profileImg}
                  alt={`${review.name} Avatar`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{review.review}</p>
              <p className="text-gray-400 text-sm">{review.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
