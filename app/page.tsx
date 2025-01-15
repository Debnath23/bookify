"use client";

import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="bg-neutral-900 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" className="text-white font-bold text-xl">
                DocBook
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a
                  href="#hero"
                  className="text-gray-300 hover:text-white px-3 py-2 transition-colors duration-200"
                >
                  Home
                </a>
                <a
                  href="#categories"
                  className="text-gray-300 hover:text-white px-3 py-2 transition-colors duration-200"
                >
                  Categories
                </a>
                <a
                  href="#featured-doctors"
                  className="text-gray-300 hover:text-white px-3 py-2 transition-colors duration-200"
                >
                  Doctors
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-300 hover:text-white px-3 py-2 transition-colors duration-200"
                >
                  How it Works
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-300 hover:text-white px-3 py-2 transition-colors duration-200"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
                >
                  Book Now
                </a>
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-neutral-900 px-2 pt-2 pb-3 space-y-1">
            <a
              href="#hero"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#categories"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Categories
            </a>
            <a
              href="#featured-doctors"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Doctors
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white block px-3 py-2 text-base font-medium rounded-md"
            >
              Book Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen pt-16 bg-neutral-900 flex items-center justify-center "
      >
        <div className="grid grid-cols-2 gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Your Health, Our Priority
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Book appointments with top healthcare professionals instantly. Get
              expert medical care from the comfort of your home.
            </p>
            <div className="mt-6">
              <a
                href="#featured-doctors"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:opacity-90"
              >
                Find a Doctor
              </a>
              <a
                href="#how-it-works"
                className="ml-4 px-6 py-3 border border-gray-400 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                Learn More
              </a>
            </div>
            <div>
              <div>
                <h2>1000+</h2>
                <p>Doctors</p>
              </div>
              <div>
                <h2>50K+</h2>
                <p>Patients</p>
              </div>
              <div>
                <h2>4.5</h2>
                <p>Rating</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              Medical Specialties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the right specialist for your needs from our wide range of
              medical categories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Cardiology",
              "Neurology",
              "Pediatrics",
              "Orthopedics",
              "Psychiatry",
              "Dermatology",
            ].map((category) => (
              <div
                key={category}
                className="group relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-500"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-heartbeat text-white"></i>
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900">
                  {category}
                </h3>
                <p className="text-gray-600 mb-4">
                  {`${category} specialists providing comprehensive care`}
                </p>
                <span className="text-blue-500 font-medium group-hover:text-blue-600">
                  15 Specialists Available →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section id="featured-doctors" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured Doctors
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet our highly qualified and experienced medical professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Cardiologist",
                availability: "Tomorrow, 10:00 AM",
                rating: "4.9",
                reviews: "128 reviews",
              },
              {
                name: "Dr. Michael Chen",
                specialty: "Neurologist",
                availability: "Today, 3:30 PM",
                rating: "4.8",
                reviews: "96 reviews",
              },
              {
                name: "Dr. Emily Martinez",
                specialty: "Pediatrician",
                availability: "Tomorrow, 2:00 PM",
                rating: "4.9",
                reviews: "156 reviews",
              },
            ].map((doctor) => (
              <div
                key={doctor.name}
                className="bg-neutral-800 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-md text-white text-6xl"></i>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 rounded-full px-3 py-1">
                    <span className="text-sm text-white">Available</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {doctor.name}
                </h3>
                <p className="text-gray-400 mb-4">{doctor.specialty}</p>
                <div className="flex items-center mb-4 text-yellow-400">
                  <i className="fas fa-star"></i>
                  <span className="ml-2 text-white">{doctor.rating}</span>
                  <span className="ml-1 text-gray-400">({doctor.reviews})</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-700 pt-4">
                  <div className="text-gray-400">
                    <p>Next Available</p>
                    <p className="text-white font-semibold">
                      {doctor.availability}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:opacity-90"
                  >
                    Book Now
                  </a>
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
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-500 transition-all duration-300"
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
      <section id="testimonials" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Patient Reviews
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
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
                className="bg-neutral-800 p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-blue-400 font-medium">
                      {testimonial.specialty}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Appointment Process Section */}
      <section id="appointment-process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Simple Appointment Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Easily book your appointment in just a few steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Choose Specialty", "Select Doctor", "Confirm Appointment"].map(
              (step, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-white text-2xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">
                    {step}
                  </h3>
                  <p className="text-gray-600 text-center">{`Step ${
                    index + 1
                  }: ${step} with ease.`}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section id="faq" className="py-20 bg-neutral-900 text-white">
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
      </section>

      {/* Get in Touch Section */}
      <section id="contact" className="py-20 bg-gray-50">
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
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-gray-400 text-center py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} DocBook. All Rights Reserved.</p>
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
