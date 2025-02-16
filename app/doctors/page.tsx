"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Doctor from "@/types/doctor.interface";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingButtonId, setLoadingButtonId] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const doctorsDetails = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axiosInstance.get("/doctor/all-doctors-details");

      if (response.status === 200) {
        setDoctors(response.data.doctors || []);
      }
    } catch (error: unknown) {
      console.error("Error fetching doctors details: ", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doctorsDetails();
  }, []);

  if ((doctors.length === 0 && !loading) || error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-44 sm:w-72 h-44 sm:h-72 flex items-center justify-center">
          <video
            controls={false}
            autoPlay
            loop
            className="w-full h-auto rounded-full shadow-lg"
          >
            <source src="/assets/404.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="text-lg sm:text-xl font-semibold text-slate-700 mt-8 text-center">
          Oops! No doctors found.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-neutral-100 fixed w-full z-50 py-2">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
              >
                Bookify
              </Link>
            </div>
            <div>
              <div className="ml-10 flex items-center space-x-8">
                {isLoggedIn ? (
                  <Link href="/profile">
                    <Image
                      src="/assets/avatar.png"
                      width={44}
                      height={44}
                      alt="Profile"
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 sm:pt-14 md:pt-12">
        {/* Doctors Grid */}
        <div className="bg-gray-100 p-4 sm:p-6 lg:p-8">
          {" "}
          {/* Increased gap to pt-32 */}
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <Skeleton className="bg-slate-200" key={index}>
                  <div className="h-auto w-auto p-4">
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] rounded-full" />
                      <div className="space-y-2 mt-6">
                        <Skeleton className="h-[24px] w-[120px] sm:h-[30px] sm:w-[160px] rounded-xl" />
                        <Skeleton className="h-[16px] w-[80px] sm:h-[20px] sm:w-[120px] rounded-xl" />
                        <Skeleton className="h-[16px] w-[100px] sm:h-[20px] sm:w-[130px] rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-1 flex flex-col justify-start items-start">
                      <Skeleton className="h-[16px] w-[140px] sm:h-[20px] sm:w-[180px] rounded-xl" />
                      <Skeleton className="h-[16px] w-[160px] sm:h-[20px] sm:w-[220px] rounded-xl" />
                      <Skeleton className="h-[16px] w-[150px] sm:h-[20px] sm:w-[200px] rounded-xl" />
                      <div className="flex justify-between items-center pt-4 w-full">
                        <Skeleton className="h-[32px] w-[80px] sm:h-[40px] sm:w-[100px] rounded-xl" />
                        <Skeleton className="h-[32px] w-[100px] sm:h-[40px] sm:w-[120px] rounded-xl" />
                      </div>
                    </div>
                  </div>
                </Skeleton>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] bg-green-200 rounded-full">
                      <Image
                        src={doctor.profileImg}
                        width={120}
                        height={120}
                        alt={`Img ${doctor.name}`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-slate-700">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doctor.speciality}
                      </p>
                      <p className="text-sm text-gray-500">{doctor.email}</p>
                      <p className="text-sm text-yellow-500">
                        ⭐ 4.5 (20 reviews)
                      </p>
                    </div>
                  </div>
                  <p className="text-[16px] font-medium mb-1 text-slate-600">
                    Specialties: {doctor.speciality}
                  </p>
                  <p className="text-[16px] font-medium mb-1 text-slate-600">
                    Education: {doctor.degree}
                  </p>
                  <p className="text-[16px] font-medium mb-1 text-slate-600">
                    Location: 12th Avenue, Salt Lake, Kolkata, West Bengal.
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg mt-2 text-slate-600">
                      ₹{doctor.fees}/visit
                    </p>
                    <button
                      className="bg-slate-800 text-white px-4 py-2 rounded mt-2 hover:bg-gray-700"
                      onClick={() => {
                        if (isLoggedIn) {
                          setLoadingButtonId(doctor._id);
                          router.push(`/doctors/${doctor._id}`);
                        } else {
                          router.replace("/sign-in");
                        }
                      }}
                    >
                      {loadingButtonId === doctor._id
                        ? "Loading..."
                        : "Book Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
}
