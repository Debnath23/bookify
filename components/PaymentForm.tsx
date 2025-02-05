"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Razorpay from "razorpay";
import toast from "react-hot-toast";

interface RazorpayOptions {
  key_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  callback_url: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface PaymentResponse {
  status: number;
}

const PaymentForm = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("Pay Now");
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const appointmentType = useSelector(
    (state: RootState) => state?.appointment?.appointment?.appointmentType
  );
  const amountToPay = useSelector(
    (state: RootState) => state?.appointment?.appointment?.amountToPay
  );
  const appointmentId = useSelector(
    (state: RootState) => state?.appointment?.appointment?.appointmentId
  );
  const name = useSelector((state: RootState) => state?.user?.name);
  const email = useSelector((state: RootState) => state?.user?.email);

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
        amount: Number(amountToPay) * 10000,
        currency,
        name: "Bookify",
        description: "Payment for Appointment",
        order_id,
        handler: async (response: RazorpayResponse) => {
          try {
            const payment: PaymentResponse = await axiosInstance.post(
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
              toast.error("Opps! Payment verification failed.");
              setIsPaymentVerified(false);
              setLoading(false);
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              toast.error("Opps! Payment verification failed.");
            } else {
              toast.error("Opps! Payment verification failed.");
            }
          } finally {
            setLoading(false);
          }
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/razorpay/verify?appointment_id=${appointmentId}`,
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (!(window as Window & { Razorpay: typeof Razorpay }).Razorpay) {
        toast.error("Razorpay SDK failed to load.");
        return;
      }

      const rzp1 = new (
        window as Window & { Razorpay: typeof Razorpay }
      ).Razorpay(options);

      if (!rzp1) {
        return;
      }

      rzp1.open();

      rzp1.on(
        "payment.failed",
        function (response: { error: { description: string } }) {
          toast.error("Oops! Payment Failed.");
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Opps! Payment verification failed.");
      } else {
        toast.error("Opps! Payment verification failed.");
      }
    }
  };

  const VideoPlayer = ({ src }: { src: string }) => (
    <div className="w-full sm:w-3/4 mx-auto p-2">
      <video className="w-full rounded-lg" controls={false} autoPlay loop>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );

  const renderPaymentMethodButtons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {["Pay Now", "Pay By Cash"].map((method) => (
        <button
          key={method}
          onClick={() => setSelectedMethod(method)}
          className={`w-full flex items-center justify-center py-3 border rounded-lg transition-all ${
            selectedMethod === method
              ? "border-black text-black font-semibold bg-gray-100"
              : "border-gray-300 text-gray-500 bg-white"
          }`}
        >
          {method === "Pay Now" ? "💳" : "💵"}
          <span className="ml-2">{method}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="mx-auto p-6 max-w-md w-full">
      <h2 className="text-lg font-semibold mb-1 text-center">Payment Method</h2>
      <p className="text-gray-500 text-sm mb-4 text-center">
        Add a new payment method to your account.
      </p>

      <div className="flex flex-col items-center w-full">
        {!loading && !isPaymentVerified && renderPaymentMethodButtons()}

        <VideoPlayer
          src={
            isPaymentVerified
              ? "/assets/payment-verified.mp4"
              : loading
              ? "/assets/loading.mp4"
              : appointmentType === "Video Call" || selectedMethod === "Pay Now"
              ? "/assets/card-payment.mp4"
              : selectedMethod === "Pay By Cash"
              ? "/assets/cash-payment.mp4"
              : ""
          }
        />

        {!isPaymentVerified && (
          <div className="w-full mt-3">
            {selectedMethod === "Pay Now" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  checkout();
                }}
                className="w-full bg-black text-white py-2 px-4 rounded"
              >
                Pay Now
              </button>
            ) : (
              <button className="w-full bg-black text-white py-2 px-4 rounded">
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
