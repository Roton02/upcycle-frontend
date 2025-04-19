"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MoreVertical, ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import tr1 from "../../../../../public/t1.png";
import tr2 from "../../../../../public/tr2.png";
import tr3 from "../../../../../public/tr3.png";
import tr4 from "../../../../../public/tr4.png";
import tr5 from "../../../../../public/tr5.png";
import tr6 from "../../../../../public/tr6.png";
import tr7 from "../../../../../public/tr7.png";
import tr8 from "../../../../../public/tr8.png";
// We'll use placeholder images since the actual image imports (tr1, tr2, etc.) aren't available
const specialOfferProducts = [
  {
    id: 1,
    name: "Xiaomi Wireless Buds Pro",
    price: 129.99,
    originalPrice: 185.0,
    rating: 5,
    reviews: 14,
    image: tr1,
    discount: "-21%",
    isNew: false,
    category: "headphones",
    available: 112,
  },
  {
    id: 2,
    name: "Apple iPhone 14 128GB Blue",
    price: 899.0,
    originalPrice: 999.0,
    rating: 4,
    reviews: 58,
    image: tr2,
    discount: null,
    isNew: false,
    category: "phone",
    available: 7,
  },
  {
    id: 3,
    name: "Smart Watch Series 7, White",
    price: 429.0,
    originalPrice: 499.0,
    rating: 5,
    reviews: 140,
    image: tr8,
    discount: null,
    isNew: false,
    category: "watch",
    available: 45,
  },
  {
    id: 4,
    name: "VRB01 Camera Nikon Max",
    price: 652.0,
    originalPrice: 780.0,
    rating: 4,
    reviews: 64,
    image: tr7,
    discount: null,
    isNew: true,
    category: "camera",
    available: 13,
  },
  {
    id: 5,
    name: "Tablet Apple iPad Air M1",
    price: 540.0,
    originalPrice: null,
    rating: 5,
    reviews: 12,
    image: tr6,
    discount: null,
    isNew: false,
    category: "tablet",
    available: 23,
  },
  {
    id: 6,
    name: "Headphones Apple AirPods 2 Pro",
    price: 224.0,
    originalPrice: null,
    rating: 4,
    reviews: 78,
    image: tr5,
    discount: null,
    isNew: false,
    category: "headphones",
    available: 18,
  },
  {
    id: 7,
    name: "Tablet Apple iPad Pro M1",
    price: 640.0,
    originalPrice: null,
    rating: 5,
    reviews: 48,
    image: tr4,
    discount: null,
    isNew: false,
    category: "tablet",
    available: 9,
  },
  {
    id: 8,
    name: "Wireless Bluetooth Headphones Sony",
    price: 299.0,
    originalPrice: null,
    rating: 4,
    reviews: 135,
    image: tr3,
    discount: null,
    isNew: false,
    category: "headphones",
    available: 31,
  },
];

export default function SpecialOffers() {
  const [countdown, setCountdown] = useState({
    days: 12,
    hours: 10,
    minutes: 12,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-8 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Special offers for you
            </h2>
            <div className="flex space-x-2">
              <div className="bg-red-400 text-white text-sm font-medium px-2 py-1 rounded">
                {countdown.days}d
              </div>
              <span className="text-gray-500 dark:text-gray-400">:</span>
              <div className="bg-red-400 text-white text-sm font-medium px-2 py-1 rounded">
                {countdown.hours}h
              </div>
              <span className="text-gray-500 dark:text-gray-400">:</span>
              <div className="bg-red-400 text-white text-sm font-medium px-2 py-1 rounded">
                {countdown.minutes}m
              </div>
            </div>
          </div>
          <Link
            href="/offers"
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
          >
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="special-offers-swiper"
          >
            {specialOfferProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col h-full">
                  <div className="relative mb-4">
                    <button className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  </div>

                  <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-3">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-2 mt-auto">
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                    <div className="w-full ml-4">
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-400 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (product.available / 150) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Available:{" "}
                    <span className="font-medium">{product.available}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>

          {/* Custom pagination */}
          <div className="swiper-pagination flex justify-center mt-6 space-x-2"></div>
        </div>
      </div>
    </div>
  );
}
