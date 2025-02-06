"use client";

import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { specialityData } from "@/public/assets/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import Doctor from "@/types/doctor.interface";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  const searchDoctorsDetails = async () => {
    try {
      const allDoctorsResponse = await axiosInstance.get(
        "/doctor/all-doctors-details"
      );
      if (allDoctorsResponse.status === 200) {
        setDoctors(allDoctorsResponse.data.doctors);
      }
    } catch (error: unknown) {
      console.error("Error fetching doctors details: ", error);
    }
  };

  useEffect(() => {
    searchDoctorsDetails();
  }, []);

  return (
    <div className="antialiased text-gray-800 min-h-screen flex flex-col">
      <Head>
        <title>DocBook</title>
        <meta
          name="description"
          content="Book appointments with top healthcare professionals instantly."
        />
        <link rel="preload" href="https://cdn.tailwindcss.com" as="script" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen pt-16 bg-neutral-100 flex items-center justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Your Health, Our Priority
            </h1>
            <p className="mt-4 text-lg sm:text-xl font-medium text-gray-600">
              Book appointments with top healthcare professionals instantly. Get
              expert medical care from the comfort of your home.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/doctors"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-slate-100 rounded-lg hover:opacity-90"
              >
                Find a Doctor
              </Link>
              <a
                href="#how-it-works"
                className="px-6 py-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-emerald-200"
              >
                Learn More
              </a>
            </div>
            <div className="pt-12 flex flex-wrap gap-8 justify-center md:justify-start">
              <div>
                <h2 className="text-3xl sm:text-4xl text-gray-700 font-semibold">
                  1000+
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 font-semibold">
                  Doctors
                </p>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl text-gray-700 font-semibold">
                  50K+
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 font-semibold">
                  Patients
                </p>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl text-gray-700 font-semibold">
                  4.5
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 font-semibold">
                  Rating
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-neutral-200 p-6 sm:p-10 rounded-lg">
              {[
                {
                  icon: "/assets/clock.png",
                  title: "Quick Booking",
                  description: "Book appointments in less than 2 minutes",
                },
                {
                  icon: "/assets/document.png",
                  title: "Verified Doctors",
                  description: "All doctors are verified professionals",
                },
                {
                  icon: "/assets/money.png",
                  title: "Affordable Rates",
                  description: "Transparent pricing, no hidden fees",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 justify-start items-center bg-slate-300 py-4 rounded-xl mb-4 pl-6 sm:pl-12"
                >
                  <div className="flex justify-center items-center p-3 bg-gradient-to-r from-blue-300 to-teal-300 rounded-full hover:opacity-90">
                    <Image src={item.icon} alt="img" width={28} height={28} />
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">{item.title}</p>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {/* <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-neutral-800">
              Find By Speciality
            </h1>
            <p className="text-gray-600 mx-auto text-lg font-medium text-center">
              Simply browse through our extensive list of doctors, schedule your
              appointment hassle-free.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-10 w-full">
              {specialityData.map((item, index) => (
                <Link
                  key={index}
                  href={`/speciality/${item.speciality}`}
                  className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
                >
                  <Image
                    className="w-16 sm:w-36 mb-2"
                    src={item.image}
                    alt="img"
                    width={64}
                    height={64}
                  />
                  <p className="text-gray-600 mx-auto text-lg font-medium">
                    {item.speciality}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Doctors Section */}
      <section id="featured-doctors" className="py-10 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-700">
              Featured Doctors
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Meet our highly qualified and experienced medical professionals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 6).map((doctor) => (
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
                  Education: {doctor.degree}
                </p>
                <p className="text-[16px] font-medium mb-1 text-slate-600">
                  Location: 789 Kids Clinic, Boston
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg mt-2 text-slate-600">
                    ${doctor.fees}/visit
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
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book your appointment in 3 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Select Specialty", "Choose Doctor", "Book Appointment"].map(
              (step, index) => (
                <div
                  key={index}
                  className="bg-slate-100 p-8 rounded-2xl shadow-lg border border-gray-400 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-white text-2xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">
                    {step}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step === "Select Specialty" &&
                      "Choose from a wide range of medical specialties based on your needs"}
                    {step === "Choose Doctor" &&
                      "Select from our verified doctors based on reviews and availability"}
                    {step === "Book Appointment" &&
                      "Schedule your visit at your preferred time and get instant confirmation"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
              Patient Reviews
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              See what our patients say about their experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Anderson",
                review:
                  "Excellent service! The booking process was seamless, and the doctor was very professional. Highly recommend this platform.",
                specialty: "Cardiology Patient",
              },
              {
                name: "Michael Roberts",
                review:
                  "The doctors are very knowledgeable and take time to understand your concerns. Great experience overall!",
                specialty: "Pediatrics Patient",
              },
              {
                name: "Emma Thompson",
                review:
                  "Efficient and friendly service. The appointment reminders are a great touch!",
                specialty: "Dermatology Patient",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-neutral-200 p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-neutral-300 font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-neutral-800 font-bold">
                      {testimonial.name}
                    </h4>
                    <p className="text-blue-600 font-medium">
                      {testimonial.specialty}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      {/* <section id="faq" className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our services.
            </p>
          </div>
          <div className="space-y-6">
            {[
              "How can I book an appointment?",
              "What are the payment options?",
              "Can I cancel or reschedule?",
            ].map((question, index) => (
              <div key={index} className="p-6 bg-neutral-800 rounded-lg">
                <h3 className="text-lg font-bold mb-2">{question}</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  facilisi.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Get in Touch Section */}
      {/* <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Get in Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? Contact us for more information.
            </p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="col-span-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="col-span-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 px-6 rounded-lg hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-white text-gray-700 text-center py-4 font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Bookify. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
