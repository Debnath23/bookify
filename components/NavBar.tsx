"use client";

import Link from 'next/link'
import React, { useState } from 'react'

function NavBar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    return (
        <nav className="bg-neutral-100 fixed w-full z-50 py-2">
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
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <a
                                href="#hero"
                                className="text-gray-700 hover:text-white px-3 py-2 transition-colors duration-200 font-medium"
                            >
                                Home
                            </a>
                            <a
                                href="#categories"
                                className="text-gray-700 hover:text-white px-3 py-2 transition-colors duration-200"
                            >
                                Categories
                            </a>
                            <a
                                href="#featured-doctors"
                                className="text-gray-700 hover:text-white px-3 py-2 transition-colors duration-200"
                            >
                                Doctors
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-gray-700 hover:text-white px-3 py-2 transition-colors duration-200"
                            >
                                How it Works
                            </a>
                            <a
                                href="#testimonials"
                                className="text-gray-700 hover:text-white px-3 py-2 transition-colors duration-200"
                            >
                                Reviews
                            </a>
                            {/* <Link
                                href="/sign-in"
                                className="bg-gradient-to-r from-blue-500 to-teal-400 text-slate-100 px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
                            >
                                Sign In
                            </Link> */}
                            <Link
                                href="/doctors"
                                className="bg-gradient-to-r from-blue-500 to-teal-400 text-slate-100 px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                    <Link
                        href="/doctors"
                        className="bg-gradient-to-r from-blue-500 to-teal-400 text-white block px-3 py-2 text-base font-medium rounded-md"
                    >
                        Book Now
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default NavBar