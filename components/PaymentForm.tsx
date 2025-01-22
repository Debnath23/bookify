"use client";
import React, { useState } from "react";

const PaymentForm = ({
  nextStep,
  prevStep,
}: {
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}) => {
  const [selectedMethod, setSelectedMethod] = useState("Card");

  return (
    <div className="max-w-md mx-auto border rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-1">Payment Method</h2>
      <p className="text-gray-500 text-sm mb-4">
        Add a new payment method to your account.
      </p>
      <div className="flex space-x-4 mb-6">
        {["Card", "Paypal", "Apple"].map((method) => (
          <button
            key={method}
            onClick={() => setSelectedMethod(method)}
            className={`flex items-center justify-center flex-1 py-2 border rounded-lg ${
              selectedMethod === method
                ? "border-black text-black"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {method === "Card" && <span>💳</span>}
            {method === "Paypal" && <span>💵</span>}
            {method === "Apple" && <span>🍎</span>}
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
      </form>
    </div>
  );
};

export default PaymentForm;
