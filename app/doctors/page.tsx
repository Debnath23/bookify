"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Doctor from "@/types/doctor.interface";

export default function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDoc, setFilterDoc] = useState<Doctor[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { speciality } = useParams<{ speciality: string }>();

  useEffect(() => {
    const searchDoctorsDetails = async () => {
      try {
        if (!searchDoctor) {
          const allDoctorsResponse = await axiosInstance.get(
            "/doctor/all-doctors-details"
          );
          if (allDoctorsResponse.status === 200) {
            setDoctors(allDoctorsResponse.data.doctors);
          }
        } else {
          const response = await axiosInstance.get(
            `/doctor/search?name=${searchDoctor}`
          );
          if (response.status === 200) {
            setDoctors(response.data.doctors);
          }
        }
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    searchDoctorsDetails();
  }, [searchDoctor]);

  useEffect(() => {
    let cancelTokenSource: any;

    const debounceSearch = setTimeout(() => {
      cancelTokenSource = axios.CancelToken.source();

      const searchDoctorsDetails = async () => {
        if (!searchDoctor) return;

        try {
          setLoading(true);
          const response = await axiosInstance.get(
            `/doctor/search?name=${searchDoctor}`,
            {
              cancelToken: cancelTokenSource.token,
            }
          );

          if (response.status === 200) {
            setDoctors(response.data.doctors);
            setError(false);
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            setError(true);
          }
        }
      };

      searchDoctorsDetails();
    }, 500);

    return () => {
      clearTimeout(debounceSearch);
      if (cancelTokenSource) {
        cancelTokenSource.cancel(
          "Canceling previous request due to new input."
        );
      }
    };
  }, [searchDoctor]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors?.filter(
          (doctor) =>
            doctor?.speciality?.trim().toLowerCase() ===
            speciality.trim().toLowerCase()
        ) || []
      );
    } else {
      setFilterDoc(doctors || []);
    }
  };

  useEffect(() => {
    if (doctors) {
      applyFilter();
    }
  }, [doctors, speciality]);

  useEffect(() => {
    if (doctors) {
      if (!speciality) {
        setFilterDoc(doctors);
      } else {
        applyFilter();
      }
    }
  }, [doctors, speciality]);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-1/2 h-1/2 bg-purple-100 flex items-center justify-center">
          <video controls={false} autoPlay loop>
            <source src="/assets/404.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="text-xl font-semibold text-slate-700 mt-16 text-center pl-24">
          Opps! Unable to fetch doctors information.
        </p>
      </div>
    );
  }

  return (
    <div className="p-14 bg-gray-100">
      <div className="flex flex-col items-center justify-between md:flex-row md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search doctors by name, specialty..."
          className="p-2 border-[0.5px] border-slate-300 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-300"
        />
        <div className="flex gap-1 mt-4 md:mt-0">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specialty</SelectLabel>
                <SelectItem value="cardiologist">Cardiologist</SelectItem>
                <SelectItem value="dermatologist">Dermatologist</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rating</SelectLabel>
                <SelectItem value="4+ stars">4+ Stars</SelectItem>
                <SelectItem value="4.5+ stars">4.5+ Stars</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Distance</SelectLabel>
                <SelectItem value="2.5 KMs">2.5 KMs</SelectItem>
                <SelectItem value="5 KMs">5 KMs</SelectItem>
                <SelectItem value="7.5 KMs">7.5 KMs</SelectItem>
                <SelectItem value="10 KMs">10 KMs</SelectItem>
                <SelectItem value="10+ KMs">10+ KMs</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {loading
          ? [1, 2, 3, 4, 5, 6].map(() => (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))
          : doctors.map((doctor) => (
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
                      alt="img"
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
                  Education: MD - Cardiology, MBBS
                </p>
                <p className="text-[16px] font-medium mb-1 text-slate-600">
                  Location: 789 Kids Clinic, Boston
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg mt-2 text-slate-600">
                    $150/visit
                  </p>
                  <button
                    className="bg-slate-800 text-white px-4 py-2 rounded mt-2 hover:bg-gray-700"
                    onClick={() => router.push(`/doctors/${doctor._id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
  );
}
