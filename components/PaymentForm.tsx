"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

const PaymentForm = ({
  nextStep,
  prevStep,
}: {
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}) => {
  const [selectedMethod, setSelectedMethod] = useState("Pay Now");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    console.log("Razorpay script loaded");

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkout = async ({ amount }: { amount: number }) => {
    try {
      const { data } = await axiosInstance.post(
        "/razorpay/checkout?appointment_id=671397b32fa967658be0e962",
        {
          amountToPay: amount,
        }
      );

      const { id: order_id, currency } = data.payment;
      const key = data.key;

      const options: any = {
        key_id: key,
        amount: amount * 100,
        currency,
        name: "Bookify",
        description: "Payment for Appointment",
        order_id,
        handler: function (response: any) {
          console.log("Payment Successful", response);
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/razorpay/verify?appointment_id=671397b32fa967658be0e962`,
        prefill: {
          name: "Debnath Mahapatra",
          email: "debnathmahapatra740.com",
          contact: "7319358180",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      if (!rzp1) {
        console.error("Razorpay instance could not be created.");
        return;
      }
      rzp1.open();

      rzp1.on("payment.failed", function (response: any) {
        console.error("Payment Failed", response.error.code);
      });

      console.log("Payment successful!");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="mx-auto p-8">
      <h2 className="text-lg font-semibold mb-1 text-center">Payment Method</h2>
      <p className="text-gray-500 text-sm mb-4 text-center">
        Add a new payment method to your account.
      </p>
      <div className="flex space-x-4 mb-6 pt-2">
        {["Pay Now", "Pay By Cash"].map((method) => (
          <button
            key={method}
            onClick={() => setSelectedMethod(method)}
            className={`flex items-center justify-center flex-1 py-2 border rounded-lg ${
              selectedMethod === method
                ? "border-black text-black"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {method === "Pay Now" && <span>💳</span>}
            {method === "Pay By Cash" && <span>💵</span>}
            <span className="ml-2">{method}</span>
          </button>
        ))}
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="First Last"
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            placeholder="City"
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Card number</label>
          <input
            type="text"
            placeholder="Card number"
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expires</label>
            <select className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black">
              <option>Month</option>
              {/* Add more months */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black">
              <option>Year</option>
              {/* Add more years */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVC</label>
            <input
              type="text"
              placeholder="CVC"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 space-x-2">
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
      </form>

      <button
        onClick={(e) => {
          e.preventDefault();
          checkout({ amount: 500 });
        }}
        className="bg-black text-white py-2 px-4 rounded text-center"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;
