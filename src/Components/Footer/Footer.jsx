import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Website Name */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Habit Tracker
          </h2>
          <p className="text-sm text-gray-600">
            Helping you build better habits with the right tools and support.
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-green-600">
                Email Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Location & Map
              </a>
            </li>
          </ul>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-green-600">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Cookie Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-10 mb-5 flex flex-col md:flex-row items-center justify-center text-sm text-gray-500">
        <div className="flex gap-4 mb-4 md:mb-0">
          <a
            href="#"
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          >
            <FaXTwitter />
          </a>
          <a
            href="#"
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t-2 border-gray-300 pt-4">
        <p className="text-center text-sm text-gray-500">
          © habit.com 2025. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;