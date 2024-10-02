"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginForm  from "./LoginForm";

// TypeScript Props for Modal Component
interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

// Separate Modal Component for Reusability
const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition duration-200"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-center mb-1">{title}</h2>
      {children}
    </div>
  </div>
);

export const Header: React.FC = () => {
  // State to manage header visibility
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // State to manage modal visibility and form type
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false); // To toggle between login and sign-up

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scroll Down - Hide header
        setIsVisible(false);
      } else {
        // Scroll Up - Show header
        setIsVisible(true);
      }
      // Update last scroll position
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Add scroll event listener
      window.addEventListener("scroll", controlHeader);

      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, []); // Empty dependency array ensures effect runs only once

  // Functions to open modal
  const openSignupModal = () => {
    setIsLoginMode(false); // Set to sign-up mode
    setIsModalOpen(true);
  };

  const openLoginModal = () => {
    setIsLoginMode(true); // Set to login mode
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } backdrop-blur-md bg-black/50`}
      >
        {/* Main Navigation Section */}
        <div className="py-5">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              {/* Navigation Links */}
              <nav className="hidden sm:flex gap-6 font-medium text-black items-center ml-auto">
                <Link href="/about">
                  <span className="hover:text-blue-800 transition duration-200">
                    About
                  </span>
                </Link>
                <a href="#" className="hover:text-blue-800 transition duration-200">
                  Help
                </a>
                <a href="#" className="hover:text-blue-800 transition duration-200">
                  Things
                </a>
                <button
                  onClick={openLoginModal}
                  className="bg-purple-950 text-white px-5 py-2 rounded-3xl font-semibold inline-flex justify-center tracking-tight hover:bg-purple-800 transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={openSignupModal}
                  className="bg-purple-950 text-white px-5 py-2 rounded-3xl font-semibold inline-flex justify-center tracking-tight hover:bg-purple-800 transition duration-200"
                >
                  Sign Up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Modal for Login or Sign-up */}
      {isModalOpen && (
        <Modal title={isLoginMode ? "Login" : "Athena's Olympus"} onClose={closeModal}>
          {isLoginMode ? (
            <>
              <LoginForm />
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <button
                  onClick={openSignupModal}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h3 className="text-md text-center">Get started for free</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email*</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Password*</label>
                  <input
                    type="password"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="user">Student</option>
                    <option value="admin">Teacher</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full font-bold bg-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={openLoginModal}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                >
                  Login
                </button>
              </p>
            </>
          )}
        </Modal>
      )}
    </>
  );
};



