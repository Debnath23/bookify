"use client";
import React from "react";
import { Input } from "./ui/input";

const PatientDetails = ({
  nextStep,
  prevStep,
}: {
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}) => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-2 mt-2 text-center">
        Patient Details
      </h2>
      <form className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="fullName"
            className="text-sm text-gray-700 font-medium"
          >
            Full Name: *
          </label>
          <Input
            id="fullName"
            type="text"
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient name"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-700 font-medium">
            Email: *
          </label>
          <Input
            id="email"
            type="email"
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm text-gray-700 font-medium">
            Phone: *
          </label>
          <Input
            id="phone"
            type="text"
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient phone number"
            required
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="text-sm text-gray-700 font-medium">
            Age: *
          </label>
          <Input
            id="age"
            type="number"
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient age"
            required
          />
        </div>

        {/* Blood Group */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="bloodGroup"
            className="text-sm text-gray-700 font-medium"
          >
            Blood Group: *
          </label>
          <Input
            id="bloodGroup"
            type="text"
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient blood group"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="submit"
            onClick={nextStep}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientDetails;
