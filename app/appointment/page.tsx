"use client";

import React, { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import BookingDetails from "@/components/BookingDetails";
import PatientDetails from "@/components/PatientDetails";
import PaymentForm from "@/components/PaymentForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function Page() {
  const [step, setStep] = useState<number>(1);

  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return router.push("/sign-in");
  }, [isLoggedIn, router]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 md:p-8">
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
