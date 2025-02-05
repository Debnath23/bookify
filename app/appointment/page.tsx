"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import BookingDetails from "@/components/BookingDetails";
import PatientDetails from "@/components/PatientDetails";
import PaymentForm from "@/components/PaymentForm";

export default function Page() {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 md:p-8">
        <ProgressBar step={step} />

        <div className="mt-6">
          {step === 1 && <BookingDetails nextStep={nextStep} />}
          {step === 2 && (
            <PatientDetails nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 3 && <PaymentForm />}
        </div>
      </div>
    </div>
  );
}
