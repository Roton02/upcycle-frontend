"use client";

import type React from "react";
import p1 from "../../../../../public/p1.png";
import p2 from "../../../../../public/p2.png";
import p3 from "../../../../../public/p3.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Send, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
    // You would typically send this to your API
  };

  return (
    <section className="py-12 my-12 bg-slate-100 dark:bg-gray-800  text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Column - Newsletter Signup */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Sign up to our newsletter
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Receive our latest updates about our products & promotions
            </p>

            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="#"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Send className="w-5 h-5" />
                <span className="sr-only">Telegram</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Featured Articles */}
          <div className="w-full md:w-1/2 lg:w-3/5">
            <div className="space-y-4">
              {/* Article 1 */}
              <article className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={p1}
                    alt="Gadget"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    8:10
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    <Link
                      href="#"
                      className="hover:text-rose-500 dark:hover:text-rose-400"
                    >
                      5 New Cool Gadgets You Must See on UpCycle - Cheap Budget
                    </Link>
                  </h3>
                </div>
              </article>

              {/* Article 2 */}
              <article className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={p2}
                    alt="Gadget"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    10:20
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    <Link
                      href="#"
                      className="hover:text-rose-500 dark:hover:text-rose-400"
                    >
                      5 Super Useful Gadgets on UpCycle You Must Have in 2023
                    </Link>
                  </h3>
                </div>
              </article>

              {/* Article 3 */}
              <article className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={p3}
                    alt="Gadget"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    8:40
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    <Link
                      href="#"
                      className="hover:text-rose-500 dark:hover:text-rose-400"
                    >
                      Top 5 New Amazing Gadgets on UpCycle You Must See
                    </Link>
                  </h3>
                </div>
              </article>

              {/* View All Link */}
              <div className="pt-2">
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
                >
                  View all
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
