"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppointmentId,
  setPatientDetails,
} from "@/redux/slices/appointmentSlice";
import axiosInstance from "@/lib/axiosInstance";
import { RootState } from "@/redux/store";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const bloodGroups = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

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
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  const dispatch = useDispatch();
  const appointmentDetails = useSelector(
    (state: RootState) => state.appointment.appointment
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(patientInfo).some((field) => !field.trim())) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (selectedBloodGroup === "") {
      toast.error("Please fill out Blood Group fields.");
      return;
    }

    setLoading(true);

    dispatch(
      setPatientDetails({
        name: patientInfo.fullName,
        email: patientInfo.email,
        phoneNumber: patientInfo.phone,
        age: patientInfo.age,
        bloodGroup: selectedBloodGroup,
      })
    );

    const modifiedAppointmentDetails = {
      ...appointmentDetails,
      name: patientInfo.fullName,
      email: patientInfo.email,
      phoneNumber: patientInfo.phone,
      age: patientInfo.age,
      bloodGroup: selectedBloodGroup,
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
        toast.success("Appointment booked successfully!");
        nextStep();
      } else {
        toast.error("Oops! Appointment booking failed.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-4 max-w-lg w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 mt-2 text-center">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPatientInfo((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        {/* Age & Blood Group (Responsive Row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Age */}
          <div className="flex flex-col gap-1">
            <label htmlFor="age" className="text-sm text-gray-700 font-medium">
              Age: *
            </label>
            <Input
              id="age"
              type="string"
              value={patientInfo.age}
              className="w-full bg-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient age"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {selectedBloodGroup || "Select blood group..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search blood group..."
                    className="h-9 focus:outline-none focus:ring-2 focus:ring-transparent"
                  />
                  <CommandList>
                    <CommandEmpty>No Blood Group found.</CommandEmpty>
                    <CommandGroup>
                      {bloodGroups.map((group) => (
                        <CommandItem
                          key={group.value}
                          value={group.value}
                          onSelect={(currentValue) => {
                            setSelectedBloodGroup(currentValue);
                            setOpen(false);
                          }}
                        >
                          {group.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedBloodGroup === group.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="w-full sm:w-auto bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientDetails;
