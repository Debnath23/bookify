"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppointmentId,
  setPatientDetails,
} from "@/redux/slices/appointmentSlice";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";

const PatientDetails = ({
  nextStep,
  prevStep,
}: {
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}) => {
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    bloodGroup: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const appointmentDetails = useSelector(
    (state: RootState) => state.appointment.appointment
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(patientInfo).some((field) => !field.trim())) {
      toast({
        title: "Error!",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    dispatch(
      setPatientDetails({
        name: patientInfo.fullName,
        email: patientInfo.email,
        phoneNumber: patientInfo.phone,
        age: patientInfo.age,
        bloodGroup: patientInfo.bloodGroup,
      })
    );

    const modifiedAppointmentDetails = {
      ...appointmentDetails,
      name: patientInfo.fullName,
      email: patientInfo.email,
      phoneNumber: patientInfo.phone,
      age: patientInfo.age,
      bloodGroup: patientInfo.bloodGroup,
    };

    try {
      const response = await axiosInstance.post(
        "/user/book-appointment",
        modifiedAppointmentDetails
      );

      if (response.status === 201 && response?.data?.appointment?._id) {
        dispatch(
          setAppointmentId({ appointmentId: response?.data?.appointment?._id })
        );
        toast({
          title: "Success!",
          description: "Appointment booked successfully.",
        });
        nextStep();
      } else {
        toast({
          title: "Oops!",
          description: "Appointment booking failed.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-2 mt-2 text-center">
        Patient Details
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="fullName"
            className="text-sm text-gray-700 font-medium"
          >
            Full Name: *
          </label>
          <Input
            id="fullName"
            type="text"
            value={patientInfo.fullName}
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient name"
            required
            onChange={(e) =>
              setPatientInfo((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-700 font-medium">
            Email: *
          </label>
          <Input
            id="email"
            type="email"
            value={patientInfo.email}
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            required
            onChange={(e) =>
              setPatientInfo((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm text-gray-700 font-medium">
            Phone: *
          </label>
          <Input
            id="phone"
            type="text"
            value={patientInfo.phone}
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient phone number"
            required
            onChange={(e) =>
              setPatientInfo((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="text-sm text-gray-700 font-medium">
            Age: *
          </label>
          <Input
            id="age"
            type="number"
            value={patientInfo.age}
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient age"
            required
            onChange={(e) =>
              setPatientInfo((prev) => ({ ...prev, age: e.target.value }))
            }
          />
        </div>

        {/* Blood Group */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="bloodGroup"
            className="text-sm text-gray-700 font-medium"
          >
            Blood Group: *
          </label>
          <Input
            id="bloodGroup"
            type="text"
            value={patientInfo.bloodGroup}
            className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient blood group"
            required
            onChange={(e) =>
              setPatientInfo((prev) => ({
                ...prev,
                bloodGroup: e.target.value,
              }))
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientDetails;
