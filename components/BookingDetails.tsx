"use client";
import axiosInstance from "@/lib/axiosInstance";
import { setAppointmentDetails } from "@/redux/slices/appointmentSlice";
import { RootState } from "@/redux/store";
import Doctor from "@/types/doctor.interface";
import { StarIcon, VideoIcon, PersonStandingIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import toast from "react-hot-toast";

interface TimeSlot {
  datetime: Date;
  time: string;
}

interface Appointment {
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  amountToPay: string;
}

const BookingDetails = ({ nextStep }: { nextStep: VoidFunction }) => {
  const [doctor, setDoctor] = useState<Doctor>();
  const [loading, setLoading] = useState<boolean>(true);
  const [docSlots, setDocSlots] = useState<
    { datetime: Date; time: string }[][]
  >([]);
  const [appointmentType, setAppointmentType] = useState<string>("Video Call");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [slotTime, setSlotTime] = useState<string>("");
  const [appointmentInfo, setAppointmentInfo] = useState<Appointment>({
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "Video Call",
    amountToPay: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const doctorId = useSelector(
    (state: RootState) => state?.appointment?.appointment?.doctorId
  );

  // const getAvailableSlots = useCallback(
  //   debounce(async () => {
  //     setDocSlots([]);
  //     const today = new Date();
  //     for (let i = 0; i < 7; i++) {
  //       const currentDate = new Date(today);
  //       currentDate.setDate(today.getDate() + i);

  //       const endTime = new Date();
  //       endTime.setDate(today.getDate() + i);
  //       endTime.setHours(21, 0, 0, 0);

  //       if (i === 0 && today.getHours() >= 21) continue;

  //       if (today.getDate() === currentDate.getDate()) {
  //         currentDate.setHours(
  //           currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
  //         );
  //         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
  //       } else {
  //         currentDate.setHours(10);
  //         currentDate.setMinutes(0);
  //       }

  //       const timeSlots: TimeSlot[] = [];
  //       while (currentDate < endTime) {
  //         const formattedTime = currentDate.toLocaleTimeString([], {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         });
  //         timeSlots.push({
  //           datetime: new Date(currentDate),
  //           time: formattedTime,
  //         });
  //         currentDate.setMinutes(currentDate.getMinutes() + 30);
  //       }
  //       setDocSlots((prev) => [...prev, timeSlots]);
  //     }
  //   }, 300),
  //   [doctorId]
  // );

  const getAvailableSlots = useMemo(
    () =>
      debounce(async () => {
        setDocSlots([]);
        const today = new Date();
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(today);
          currentDate.setDate(today.getDate() + i);
  
          const endTime = new Date();
          endTime.setDate(today.getDate() + i);
          endTime.setHours(21, 0, 0, 0);
  
          if (i === 0 && today.getHours() >= 21) continue;
  
          if (today.getDate() === currentDate.getDate()) {
            currentDate.setHours(
              currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
            );
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
          } else {
            currentDate.setHours(10);
            currentDate.setMinutes(0);
          }
  
          const timeSlots: TimeSlot[] = [];
          while (currentDate < endTime) {
            const formattedTime = currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime,
            });
            currentDate.setMinutes(currentDate.getMinutes() + 30);
          }
          setDocSlots((prev) => [...prev, timeSlots]);
        }
      }, 300),
    [doctorId]
  );
  
  const handleSlotDateSelect = (index: number) => {
    setSlotIndex(index);
    const selectedDate = docSlots[index][0]?.datetime;
    if (selectedDate) {
      setAppointmentInfo((prev) => ({
        ...prev,
        appointmentDate: selectedDate.toISOString().split("T")[0],
      }));
    }
  };

  const handleSlotTimeSelect = (time: string) => {
    setSlotTime(time);
    setAppointmentInfo((prev) => ({
      ...prev,
      appointmentTime: time,
    }));
  };

  const handleAppointmentDetailsSubmission = () => {
    if (!appointmentInfo.appointmentDate || !appointmentInfo.appointmentTime) {
      toast.error("Oops! Please select date & time.");
      return;
    }

    if (!appointmentType) {
      toast.error("Please select an appointment type.");
      return;
    }

    if (!doctor?.fees) {
      toast.error("Doctor's fee information is missing.");
      return;
    }

    dispatch(
      setAppointmentDetails({
        appointmentDate: appointmentInfo.appointmentDate,
        appointmentTime: appointmentInfo.appointmentTime,
        appointmentType: appointmentType,
        amountToPay: doctor.fees,
      })
    );

    nextStep();
  };

  const fetchDocInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/doctor/${doctorId}`);
      if (response.status === 200) {
        setDoctor(response.data.user);
      }
    } catch {
      toast.error("Unable to fetch doctor's info!");
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    if (doctorId) {
      fetchDocInfo();
      getAvailableSlots();
    }
  }, [doctorId, fetchDocInfo, getAvailableSlots]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white w-full max-w-lg">
        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          {loading ? (
            <Image
              src="/assets/avatar.png"
              alt="Doctor's profile img"
              className="bg-slate-200 rounded-full"
              width={80}
              height={80}
            />
          ) : (
            doctor?.profileImg && (
              <Image
                src={doctor.profileImg}
                alt="Doctor's profile img"
                className="bg-slate-200 rounded-full"
                width={80}
                height={80}
              />
            )
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-800">{doctor?.name}</h1>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              {doctor?.speciality}
            </p>
            <div className="text-blue-600 flex justify-center sm:justify-start items-center mt-1">
              <div className="flex gap-1 items-center">
                <StarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <p>4.8</p>
              </div>
              <div className="text-gray-500 ml-2">
                • ₹{doctor?.fees} / visit
              </div>
            </div>
          </div>
        </div>

        {/* Select Date */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Select Date</h3>
          <div className="flex flex-wrap gap-2">
            {docSlots.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSlotDateSelect(index)}
                className={`px-3 py-2 rounded-lg border text-sm sm:text-base ${
                  slotIndex === index
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                <div className="text-xs sm:text-sm">
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </div>
                <div className="text-xs">
                  {item[0] && item[0].datetime.getDate()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Select Time */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Select Time</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {docSlots[slotIndex]?.map((item, index) => (
              <button
                onClick={() => handleSlotTimeSelect(item.time)}
                key={index}
                className={`px-3 py-2 rounded-lg border text-sm sm:text-base ${
                  item.time === slotTime
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Type */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Appointment Type</h3>
          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
            <button
              className={`px-4 py-2 rounded-lg border flex-1 ${
                appointmentType === "Video Call"
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onClick={() => setAppointmentType("Video Call")}
            >
              <div className="flex gap-2 justify-center items-center">
                <VideoIcon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    appointmentType === "Video Call"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                />
                <p className="text-sm sm:text-base">Video Call</p>
              </div>
            </button>
            <button
              className={`px-4 py-2 rounded-lg border flex-1 ${
                appointmentType === "In-Person"
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onClick={() => setAppointmentType("In-Person")}
            >
              <div className="flex gap-2 justify-center items-center">
                <PersonStandingIcon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    appointmentType === "In-Person"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                />
                <p className="text-sm sm:text-base">In-Person</p>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap justify-end gap-2 sm:gap-3">
          <button
            onClick={() => router.push("/doctors")}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleAppointmentDetailsSubmission}
            className="px-4 py-2 rounded-lg bg-black text-white w-full sm:w-auto"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
