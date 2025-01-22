"use client";
import React from "react";

const ProgressBar = ({ step }: { step: number }) => {
  const steps = ["Select Time", "Patient Details", "Payment"];
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step > index
                ? "bg-green-500 text-white"
                : step === index + 1
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`
            ml-2 text-sm ${
              step > index ? "text-black font-medium" : "text-gray-500"
            }`}
          >
            {label}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-10 ${
                step > index + 1 ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
