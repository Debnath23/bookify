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
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const searchDoctorsDetails = async () => {
      setError(false);
      setLoading(true);
      try {
        const response = await axiosInstance.get("/doctor/all-doctors-details");

        if (response.status === 200) {
          setDoctors(response.data.doctors || []);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    searchDoctorsDetails();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-1/2 h-1/2 bg-white flex items-center justify-center">
          <video controls={false} autoPlay loop>
            <source src="/assets/404.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="text-xl font-semibold text-slate-700 mt-16 text-center pl-24">
          Oops! Unable to fetch doctors information.
        </p>
      </div>
    );
  }

  if (doctors.length === 0 && !loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-1/2 h-1/2 bg-white flex items-center justify-center">
          <video controls={false} autoPlay loop>
            <source src="/assets/404.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="text-xl font-semibold text-slate-700 mt-16 text-center pl-24">
          Oops! No doctors found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <nav className="bg-neutral-100 fixed w-full z-50 py-2">
        <div className=" px-2 sm:px-3 lg:px-14">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
              >
                Bookify
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {isLoggedIn && (
                  <Link href="/profile">
                    <Image
                      src="/assets/avatar.png"
                      width={44}
                      height={44}
                      alt="Profile"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gray-100 p-14 pt-20">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <Skeleton className="bg-slate-200" key={index}>
                <div className=" h-auto w-auto p-4">
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-[120px] w-[120px] rounded-full" />
                    <div className="space-y-2 mt-6">
                      <Skeleton className="h-[30px] w-[160px] rounded-xl" />
                      <Skeleton className="h-[20px] w-[120px] rounded-xl" />
                      <Skeleton className="h-[20px] w-[130px] rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-1 flex flex-col justify-start items-start ">
                    <Skeleton className="h-[20px] w-[180px] rounded-xl" />
                    <Skeleton className="h-[20px] w-[220px] rounded-xl" />
                    <Skeleton className="h-[20px] w-[200px] rounded-xl" />
                    <div className="flex justify-between items-center pt-4 w-full">
                      <Skeleton className="h-[40px] w-[100px] rounded-xl" />
                      <Skeleton className="h-[40px] w-[120px] rounded-xl" />
                    </div>
                  </div>
                </div>
              </Skeleton>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-[120px] h-[122px] bg-green-200 rounded-full">
                    <Image
                      src={doctor.profileImg}
                      width={120}
                      height={120}
                      alt={`Profile image of Dr. ${doctor.name}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-700">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.speciality}</p>
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
                  Location: 789 Kids Clinic, Boston
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg mt-2 text-slate-600">
                    ₹{doctor.fees}/visit
                  </p>
                  <button
                    className="bg-slate-800 text-white px-4 py-2 rounded mt-2 hover:bg-gray-700"
                    onClick={() => {
                      if (isLoggedIn) {
                        router.push(`/doctors/${doctor._id}`);
                      } else {
                        router.replace("/sign-in");
                      }
                    }}
                  >
                    {loading ? "Loading..." : "Book Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
