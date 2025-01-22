"use client";
import React from "react";

const PatientDetails = ({
  nextStep,
  prevStep,
}: {
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border-gray-300 rounded p-2"
            placeholder="Enter patient name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border-gray-300 rounded p-2"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            className="w-full border-gray-300 rounded p-2"
            placeholder="Enter phone number"
          />
        </div>
      </form>
      <div className="flex items-center mt-6 space-x-2">
        <button
          onClick={prevStep}
          className="bg-gray-200 text-black py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
