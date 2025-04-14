"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingCart } from "lucide-react";
import tr1 from "../../../../../public/t1.png";
import tr2 from "../../../../../public/tr2.png";
import tr3 from "../../../../../public/tr3.png";
import tr4 from "../../../../../public/tr4.png";
import tr5 from "../../../../../public/tr5.png";
import tr6 from "../../../../../public/tr6.png";
import tr7 from "../../../../../public/tr7.png";
import tr8 from "../../../../../public/tr8.png";
// Demo data in JSON format
const trendingProducts = [
  {
    id: 1,
    name: "VRB01 Virtual Reality Glasses",
    price: 340.99,
    originalPrice: 430.0,
    rating: 5,
    reviews: 14,
    image: tr1,
    discount: "-21%",
    isNew: false,
    category: "vr",
  },
  {
    id: 2,
    name: "Apple iPhone 14 128GB White",
    price: 899.0,
    originalPrice: null,
    rating: 4,
    reviews: 142,
    image: tr2,
    discount: null,
    isNew: false,
    category: "phone",
  },
  {
    id: 3,
    name: "Smart Watch Series 7, White",
    price: 429.0,
    originalPrice: null,
    rating: 5,
    reviews: 64,
    image: tr3,
    discount: null,
    isNew: false,
    category: "watch",
  },
  {
    id: 4,
    name: "Laptop Apple MacBook Pro 13 M2",
    price: 1200.0,
    originalPrice: null,
    rating: 3,
    reviews: 51,
    image: tr4,
    discount: null,
    isNew: true,
    category: "laptop",
  },
  {
    id: 5,
    name: "Tablet Apple iPad Air M1",
    price: 540.0,
    originalPrice: null,
    rating: 5,
    reviews: 12,
    image: tr5,
    discount: null,
    isNew: false,
    category: "tablet",
  },
  {
    id: 6,
    name: "Headphones Apple AirPods 2 Pro",
    price: 224.0,
    originalPrice: null,
    rating: 4,
    reviews: 78,
    image: tr6,
    discount: null,
    isNew: false,
    category: "headphones",
  },
  {
    id: 7,
    name: "Tablet Apple iPad Pro M1",
    price: 640.0,
    originalPrice: null,
    rating: 5,
    reviews: 48,
    image: tr7,
    discount: null,
    isNew: false,
    category: "tablet",
  },
  {
    id: 8,
    name: "Wireless Bluetooth Headphones Sony",
    price: 299.0,
    originalPrice: null,
    rating: 4,
    reviews: 135,
    image: tr8,
    discount: null,
    isNew: false,
    category: "headphones",
  },
];

export default function TrendingProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="w-full py-8 px-4 md:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Trending products
          </h2>
          <Link
            href="/products"
            className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg  mb-3">
                {product.discount && (
                  <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                    {product.discount}
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                    New
                  </div>
                )}
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
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

              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                {product.name}
              </h3>

              <div className="flex items-center mb-2">
                <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors ml-auto"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
