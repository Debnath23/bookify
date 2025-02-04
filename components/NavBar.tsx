"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-neutral-100 fixed w-full z-50 py-1.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
            >
              Bookify
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <div className="flex space-x-8 items-center">
              <a href="#hero" className="hover:text-blue-500">
                Home
              </a>
              <a href="#categories" className="hover:text-blue-500">
                Categories
              </a>
              <a href="#featured-doctors" className="hover:text-blue-500">
                Doctors
              </a>
              <a href="#how-it-works" className="hover:text-blue-500">
                How it Works
              </a>
              <a href="#testimonials" className="hover:text-blue-500">
                Reviews
              </a>
            </div>

            <Link
              href="/doctors"
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="md:hidden fixed top-0 right-0 h-screen w-3/4 sm:w-1/2 bg-neutral-100 shadow-lg p-6 z-40"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-6 text-gray-700"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col space-y-4 mt-10">
              <a href="#hero" className="hover:text-blue-500">
                Home
              </a>
              <a href="#categories" className="hover:text-blue-500">
                Categories
              </a>
              <a href="#featured-doctors" className=" hover:text-blue-500">
                Doctors
              </a>
              <a href="#how-it-works" className="hover:text-blue-500">
                How it Works
              </a>
              <a href="#testimonials" className="hover:text-blue-500">
                Reviews
              </a>
              <Link
                href="/doctors"
                className="bg-gradient-to-r from-blue-500 to-teal-400 text-white block px-4 py-3 rounded-md text-center"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
