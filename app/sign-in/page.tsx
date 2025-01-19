"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back to Bookify!
          </h1>
          <p className="mt-2 text-gray-600">Please enter your details</p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2 text-gray-700">Remember for 30 days</span>
              </label>
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white mt-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Sign in
            </button>
          </form>
          <div className="flex items-center mt-6">
            <span className="border-b flex-grow"></span>
            <span className="px-4 text-gray-600">OR</span>
            <span className="border-b flex-grow"></span>
          </div>
          <button className="w-full mt-6 flex items-center justify-center border px-4 py-2 rounded-lg hover:bg-gray-100">
            <img
              src="https://img.icons8.com/color/16/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign in with Google
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-purple-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-full bg-purple-100 flex items-center justify-center mt-16">
          <div className="h-full w-full">
            <video controls={false} autoPlay loop>
              <source src="/assets/sign-in.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
