"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import BookingDetails from "@/components/BookingDetails";
import PatientDetails from "@/components/PatientDetails";
import PaymentForm from "@/components/PaymentForm";

export default function page() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <ProgressBar step={step} />
        {step === 1 && <BookingDetails nextStep={nextStep} />}
        {step === 2 && (
          <PatientDetails nextStep={nextStep} prevStep={prevStep} />
        )}
        {step === 3 && <PaymentForm prevStep={prevStep} nextStep={nextStep} />}
      </div>
    </div>
  );
}
