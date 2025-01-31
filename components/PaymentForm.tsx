"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useToast } from "@/hooks/use-toast";

const PaymentForm = ({ prevStep }: { prevStep: VoidFunction }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("Pay Now");
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
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
        toast({
          title: "Error",
          description: "Appointment ID not found.",
        });
        return;
      }

      const { data } = await axiosInstance.post(`/razorpay/checkout`, {
        amountToPay: amountToPay,
        appointmentId: appointmentId,
      });

      const { id: order_id, currency } = data.payment;
      const key = data.key;

      const options: any = {
        key_id: key,
        amount: Number(amountToPay) * 10000,
        currency,
        name: "Bookify",
        description: "Payment for Appointment",
        order_id,
        handler: async (response: any) => {
          try {
            const payment = await axiosInstance.post(
              `/razorpay/verify?appointment_id=${appointmentId}`,
              response
            );

            if (payment.status === 201) {
              setIsPaymentVerified(true);
              setLoading(false);
              setTimeout(() => {
                router.push("/profile");
              }, 1000);
            } else {
              toast({
                title: "Opps!",
                description: "Payment verification failed.",
              });
              setIsPaymentVerified(false);
              setLoading(false);
            }
          } catch (error: any) {
            toast({
              title: "Opps! Payment verification failed.",
              description: error.message,
            });
            setIsPaymentVerified(false);
            setLoading(false);
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

      if (!(window as any).Razorpay) {
        toast({ title: "Error", description: "Razorpay SDK failed to load." });
        return;
      }

      const rzp1 = new (window as any).Razorpay(options);

      if (!rzp1) {
        return;
      }

      rzp1.open();

      rzp1.on("payment.failed", function (response: any) {
        toast({
          title: "Oops! Payment Failed.",
          description: response.error.description,
        });
      });
    } catch (error: any) {
      toast({
        title: "Oops! Payment Failed.",
        description: error.message,
      });
    }
  };

  const VideoPlayer = ({ src }: { src: string }) => (
    <div className="w-3/4 mx-auto p-2">
      <video controls={false} autoPlay loop>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );

  const renderPaymentMethodButtons = () => (
    <div className="flex gap-4">
      {["Pay Now", "Pay By Cash"].map((method) => (
        <button
          key={method}
          onClick={() => setSelectedMethod(method)}
          className={`w-full flex items-center justify-center flex-1 py-2 border rounded-lg transition-all ${
            selectedMethod === method
              ? "border-black text-black font-semibold"
              : "border-gray-300 text-gray-500"
          }`}
        >
          {method === "Pay Now" ? "💳" : "💵"}{" "}
          <span className="ml-2">{method}</span>
        </button>
      ))}
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex gap-4">
      <button
        onClick={prevStep}
        className="bg-gray-200 text-black py-2 px-4 rounded text-center"
      >
        Back
      </button>
      {selectedMethod === "Pay Now" ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            checkout();
          }}
          className="bg-black text-white py-2 px-4 rounded text-center"
        >
          Pay Now
        </button>
      ) : (
        <button className="bg-black text-white py-2 px-4 rounded text-center">
          Continue
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto p-8 max-w-lg">
      <h2 className="text-lg font-semibold mb-1 text-center">Payment Method</h2>
      <p className="text-gray-500 text-sm mb-4 text-center">
        Add a new payment method to your account.
      </p>
      <div className="flex flex-col items-center">
        {/* Video Display Logic */}
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

        {/* Payment Options */}
        {!loading && !isPaymentVerified && (
          <>
            {appointmentType === "Video Call" ? (
              <div className="flex justify-center mt-4">
                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-black py-2 px-4 rounded text-center"
                  >
                    Back
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
              </div>
            ) : (
              <>
                {renderPaymentMethodButtons()}
                {renderActionButtons()}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
