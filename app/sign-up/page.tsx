"use client";

import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { login } from "@/redux/slices/authSlice";
import { setUserInfo } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { storeTokens } from "@/lib/token";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  userId: string;
}

export default function Page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const requestBody: RequestBody = { name, email, password };

    try {
      const response = await axiosInstance.post("/auth/register", requestBody);

      if (response.status === 201) {
        const token = response.data.accessToken;
        const userData: User = response.data.user;

        if (token) {
          toast({
            title: "Hurry!",
            description: "Registration Successfull!",
          });
          storeTokens(token);
          dispatch(login());
          dispatch(setUserInfo(userData));
          router.push("/");
          window.scrollTo(0, 0);
          setLoading(false);
        }
      } else {
        toast({
          title: "Oops!",
          description: "Something went wrong",
        });
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response) {
        toast({
          title: "Oops!",
          description:
            error.response.data.message ||
            "An error occurred during authentication",
        });
      } else if (error.request) {
        toast({
          title: "Oops!",
          description: "No response from the server. Please try again later.",
        });
      } else {
        toast({
          title: "Oops!",
          description: "An unexpected error occurred. Please try again.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to{" "}
            <Link href={"/"}>
              <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                Bookify!
              </span>
            </Link>
          </h1>
          <p className="mt-2 text-gray-600">Please enter your details</p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white mt-6 py-2 rounded-lg hover:bg-purple-700"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center mt-6">
            <span className="border-b flex-grow"></span>
            <span className="px-4 text-gray-600">OR</span>
            <span className="border-b flex-grow"></span>
          </div>
          {/* <button className="w-full mt-6 flex items-center justify-center border px-4 py-2 rounded-lg hover:bg-gray-100">
            <Image
              src="https://img.icons8.com/color/16/google-logo.png"
              alt="Google"
              className="mr-2"
              width={16}
              height={16}
            />
            Sign in with Google
          </button> */}
          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link href="/sign-in" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-full bg-purple-100 flex items-center justify-center mt-16">
          <div className="h-full w-full">
            <video controls={false} autoPlay loop>
              <source src="/assets/sign-up.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
