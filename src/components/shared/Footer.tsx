"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <footer className="text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">UpCycle</h2>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              Got questions? Contact us 24/7
            </p>

            <div className="relative">
              <button
                onClick={() => setHelpOpen(!helpOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm border border-slate-700 rounded-md dark:border-slate-700 light:border-slate-300"
              >
                <span>Help and consultation</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {helpOpen && (
                <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-md shadow-lg dark:bg-slate-800 light:bg-white light:border-slate-300">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-100"
                      >
                        Live chat
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-100"
                      >
                        Email support
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-100"
                      >
                        Phone support
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Company section */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-900 dark:text-gray-100">
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  About company
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Our team
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Account section */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-900 dark:text-gray-100">
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Your account
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Shipping rates & policies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Refunds & replacements
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Delivery info
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Order tracking
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Taxes & fees
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service section */}
          <div>
            <h3 className="font-semibold mb-4">Customer service</h3>
            <ul className="space-y-2 text-sm text-gray-900 dark:text-gray-100">
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Payment methods
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Money back guarantee
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Product returns
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Support center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
                >
                  Term and conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Categories section */}
        <div className="mt-12">
          <ul className="flex flex-wrap gap-4 text-sm text-gray-900 dark:text-gray-100">
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Computers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Smartphones
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                TV, Video
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Speakers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Cameras
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Printers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Video Games
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Headphones
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Wearable
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                HDD/SSD
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Smart Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Apple Devices
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Tablets
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Monitors
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Scanners
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Servers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Heating and Cooling
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                E-readers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Data Storage
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Networking
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Power Strips
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Plugs and Outlets
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Detectors and Sensors
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white dark:hover:text-white light:hover:text-slate-900"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mb-4 md:mb-0">
            © All rights reserved. Made by Creative Studio
          </p>

          <div className="flex space-x-4">
            {/* Payment icons */}
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-900">VISA</span>
            </div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
              <div className="flex">
                <div className="w-4 h-4 bg-red-500 rounded-full opacity-80 -mr-2"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80"></div>
              </div>
            </div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-700">
                PayPal
              </span>
            </div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-slate-800">
                G Pay
              </span>
            </div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-slate-800">
                A Pay
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
