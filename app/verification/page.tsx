"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { name, email } = useSelector((state: RootState) => state.user);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | number;

    if (!canResend && buttonClicked) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [buttonClicked, canResend]);

  const sendOTP = async () => {
    try {
      setLoading(true);
      setError(false);
      setCanResend(false);
      setTimer(30);
      setButtonClicked(true);
      const response = await axiosInstance.post("/auth/send-otp", {withCredentials: true});
      if (response.status === 201) {
        toast.success("OTP has been sent to your email!");
      }
    } catch {
      toast.error("Oops! Failed to send OTP.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axiosInstance.post("/auth/verify-otp", {
        otp: data.pin,
      });
      if (response.data) {
        toast.success("OTP verification successful!");
      }
    } catch {
      toast.error("Oops! Failed to verify OTP.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          {!buttonClicked ? (
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800 pb-2">
                Welcome {name.split(" ")[0]}!
              </p>
              <p className="text-gray-700 pb-1">
                We will send an OTP to your email
              </p>
              <p className="text-gray-600 pb-4 text-sm">{email}</p>
              <div className="flex flex-col gap-3">
                <Button onClick={sendOTP} disabled={loading} className="w-full">
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
                <Button
                  onClick={sendOTP}
                  disabled={!canResend}
                  variant="ghost"
                  className="w-full"
                >
                  {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Submit"}
                </Button>
              </form>
            </Form>
          )}
        </div>

        {/* Right Section - Video */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4">
          <video controls={false} autoPlay loop className="w-full h-auto">
            <source src="/assets/otp-verification.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
