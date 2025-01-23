"use client";
import { StarIcon, VideoIcon, PersonStandingIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BookingDetails = ({ nextStep }: { nextStep: VoidFunction }) => {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("9:00 AM");
  const [appointmentType, setAppointmentType] = useState("Video Call");

  const router = useRouter();

  const dates = [
    { label: "Today", date: "Jul 19" },
    { label: "Tomorrow", date: "Jul 20" },
    { label: "Wed", date: "Jul 21" },
    { label: "Thu", date: "Jul 22" },
  ];

  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white w-full p-4">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/assets/doc1.png"
            width={100}
            height={100}
            className="bg-slate-200 rounded-full"
            alt="img"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dr. John Smith</h1>
            <p className="text-gray-600 text-lg font-medium">Cardiologist</p>
            <div className="text-blue-600 flex items-center">
              <div className="flex gap-1 items-center justify-center">
                <StarIcon className="w-5 h-5" />
                <p className="mt-0.5">4.8</p>
              </div>
              <div className="text-gray-500 ml-2"> • $150 / visit</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Select Date</h3>
          <div className="flex gap-3">
            {dates.map((date) => (
              <button
                key={date.label}
                className={`px-4 py-2 rounded-lg border ${
                  selectedDate === date.label
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                onClick={() => setSelectedDate(date.label)}
              >
                <div className="text-sm">{date.label}</div>
                <div className="text-xs">{date.date}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Select Time</h3>
          <div className="grid grid-cols-3 gap-3">
            {times.map((time) => (
              <button
                key={time}
                className={`px-4 py-2 rounded-lg border ${
                  selectedTime === time
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Appointment Type</h3>
          <div className="flex gap-3">
            <button
              className={`px-4 py-2 rounded-lg border flex-1 ${
                appointmentType === "Video Call"
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onClick={() => setAppointmentType("Video Call")}
            >
              <div className="flex gap-2 justify-center">
                <VideoIcon
                  className={`w-6 h-6 ${
                    appointmentType === "Video Call"
                      ? "text-slate-100"
                      : "text-gray-800"
                  }`}
                />
                <p>Video Call</p>
              </div>
            </button>
            <button
              className={`px-4 py-2 rounded-lg border flex-1 gap-1 ${
                appointmentType === "In-Person"
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onClick={() => setAppointmentType("In-Person")}
            >
              <div className="flex gap-2 justify-center">
                <PersonStandingIcon
                  className={`w-6 h-6 ${
                    appointmentType === "In-Person"
                      ? "text-slate-100"
                      : "text-gray-800"
                  }`}
                />
                <p>In-Person</p>
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.push("/doctors")}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
