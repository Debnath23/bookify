"use client";
import React, { useState } from "react";

const BookingDetails = ({ nextStep }: { nextStep: VoidFunction }) => {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("9:00 AM");
  const [appointmentType, setAppointmentType] = useState("Video Call");

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
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Dr. John Smith
          </h2>
          <p className="text-sm text-gray-600">Cardiologist</p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="text-yellow-500">★ 4.8</span> • $150/visit
          </p>
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
            {["Video Call", "In-Person"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg border flex-1 ${
                  appointmentType === type
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                onClick={() => setAppointmentType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">
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
