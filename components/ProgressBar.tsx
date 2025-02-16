"use client";
import React from "react";

const ProgressBar = ({ step }: { step: number }) => {
  const steps = ["Select Time", "Patient Details", "Payment"];

  return (
    <div className="flex justify-between items-center w-full md:max-w-3xl mx-auto ml-6 sm:px-6 mb-4 md:ml-16">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center flex-1">
          {/* Step Circle */}
          <div
            className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-sm font-bold transition-all duration-300 
              ${
                step > index
                  ? "bg-green-500 text-white"
                  : step === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
          >
            {index + 1}
          </div>

          {/* Step Label (Hidden on Small Screens) */}
          <span
            className={`ml-1 md:ml-2 text-[8px] md:text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
              step > index ? "text-black font-medium" : "text-gray-500"
            }`}
          >
            {label}
          </span>

          {/* Step Connector (Hidden on Last Step) */}
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 md:h-1 flex-1 mx-1 sm:mx-3 rounded-full transition-all duration-300 
                ${step > index + 1 ? "bg-green-500" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
