"use client";
import React, { Suspense, useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { RazorpayInstance } from "razorpay";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface RazorpayOptions {
  key_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  callback_url: string;
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const PaymentPage = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const amountToPay = searchParams.get("amountToPay");

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return router.push("/sign-in");
    if (appointmentId === null || amountToPay === null) router.push("/profile");
  }, [isLoggedIn, appointmentId, amountToPay, router]);

  useEffect(() => {
    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    )
      return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkout = async () => {
    try {
      setLoading(true);

      if (!appointmentId) {
        toast.error("Appointment ID not found.");
        return;
      }

      const { data } = await axiosInstance.post(`/razorpay/checkout`, {
        amountToPay: amountToPay,
        appointmentId: appointmentId,
      });

      const { id: order_id, currency } = data.payment;
      const key = data.key;

      const options: RazorpayOptions = {
        key_id: key,
        amount: Number(amountToPay) * 100,
        currency,
        name: "Bookify",
        description: "Payment for Appointment",
        order_id,
        handler: async (response: RazorpayResponse) => {
          try {
            const payment = await axiosInstance.post(
              `/razorpay/verify?appointment_id=${appointmentId}`,
              response
            );

            if (payment.status === 201) {
              setIsPaymentVerified(true);
              toast.success("Hurry! Payment completed successfully.");
              setLoading(false);
              setTimeout(() => {
                router.push("/profile");
              }, 100);
            } else {
              toast.error("Oops! Payment verification failed.");
              setIsPaymentVerified(false);
              setLoading(false);
            }
          } catch {
            toast.error("Oops! Payment verification failed.");
            setIsPaymentVerified(false);
            setLoading(false);
          }
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/razorpay/verify?appointment_id=${appointmentId}`,
        theme: {
          color: "#3399cc",
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK failed to load.");
        return;
      }

      const rzp1: RazorpayInstance = new window.Razorpay(options);

      if (!rzp1) {
        return;
      }

      rzp1.open();

      rzp1.on("payment.failed", function () {
        toast.error("Oops! Payment Failed.");
      });
    } catch {
      toast.error("Oops! Payment Failed.");
    }
  };

  const VideoPlayer = ({ src }: { src: string }) => (
    <div className="w-3/4 mx-auto p-2">
      <video controls={false} autoPlay loop>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex gap-4">
      <button
        onClick={() => router.push("/profile")}
        className="bg-gray-200 text-black py-2 px-4 rounded text-center"
      >
        Cancel
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          checkout();
        }}
        className="bg-black text-white py-2 px-4 rounded text-center"
      >
        Pay Now
      </button>
    </div>
  );

  return (
    <div className="mx-auto p-8 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-1 text-center">
          Payment Method
        </h2>
        <p className="text-gray-500 text-sm mb-2 text-center">
          Add a new payment method to your account.
        </p>
        <div className="flex flex-col items-center">
          <VideoPlayer
            src={
              isPaymentVerified
                ? "/assets/payment-verified.mp4"
                : loading
                ? "/assets/loading.mp4"
                : "/assets/card-payment.mp4"
            }
          />
          {!loading && renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center">
          <div className="w-3/4 mx-auto p-2">
            <video controls={false} autoPlay loop>
              <source src="/assets/loading.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      }
    >
      <PaymentPage />
    </Suspense>
  );
}
