"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
// import tr1 from "../../../../../public/t1.png";
// import tr2 from "../../../../../public/tr2.png";
// import tr3 from "../../../../../public/tr3.png";
// import tr4 from "../../../../../public/tr4.png";
// import tr5 from "../../../../../public/tr5.png";
// import tr6 from "../../../../../public/tr6.png";
// import tr7 from "../../../../../public/tr7.png";
// import tr8 from "../../../../../public/tr8.png";
import ProductCard from "../../product/ProductCard";
// Demo data in JSON format
// const trendingProducts = [
//   {
//     id: 1,
//     name: "VRB01 Virtual Reality Glasses",
//     price: 340.99,
//     originalPrice: 430.0,
//     rating: 5,
//     reviews: 14,
//     image: tr1,
//     discount: "-21%",
//     isNew: false,
//     category: "vr",
//   },
//   {
//     id: 2,
//     name: "Apple iPhone 14 128GB White",
//     price: 899.0,
//     originalPrice: null,
//     rating: 4,
//     reviews: 142,
//     image: tr2,
//     discount: null,
//     isNew: false,
//     category: "phone",
//   },
//   {
//     id: 3,
//     name: "Smart Watch Series 7, White",
//     price: 429.0,
//     originalPrice: null,
//     rating: 5,
//     reviews: 64,
//     image: tr3,
//     discount: null,
//     isNew: false,
//     category: "watch",
//   },
//   {
//     id: 4,
//     name: "Laptop Apple MacBook Pro 13 M2",
//     price: 1200.0,
//     originalPrice: null,
//     rating: 3,
//     reviews: 51,
//     image: tr4,
//     discount: null,
//     isNew: true,
//     category: "laptop",
//   },
//   {
//     id: 5,
//     name: "Tablet Apple iPad Air M1",
//     price: 540.0,
//     originalPrice: null,
//     rating: 5,
//     reviews: 12,
//     image: tr5,
//     discount: null,
//     isNew: false,
//     category: "tablet",
//   },
//   {
//     id: 6,
//     name: "Headphones Apple AirPods 2 Pro",
//     price: 224.0,
//     originalPrice: null,
//     rating: 4,
//     reviews: 78,
//     image: tr6,
//     discount: null,
//     isNew: false,
//     category: "headphones",
//   },
//   {
//     id: 7,
//     name: "Tablet Apple iPad Pro M1",
//     price: 640.0,
//     originalPrice: null,
//     rating: 5,
//     reviews: 48,
//     image: tr7,
//     discount: null,
//     isNew: false,
//     category: "tablet",
//   },
//   {
//     id: 8,
//     name: "Wireless Bluetooth Headphones Sony",
//     price: 299.0,
//     originalPrice: null,
//     rating: 4,
//     reviews: 135,
//     image: tr8,
//     discount: null,
//     isNew: false,
//     category: "headphones",
//   },
// ];

export default function TrendingProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/listings?sortBy=createdAt&sortOrder=desc&limit=8`
        );
        const response = await result.json();

        if (response.success && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Failed to fetch products:", response.message);
          setProducts([]);
          setError(response.message || "Failed to load products");
        }
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="w-full py-8 px-4 md:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 text-center dark:text-gray-100 mb-4 ml-1">
          New arrivals
        </h2>
        <div className="flex  justify-end items-center mb-6">
          <Link
            href="/products"
            className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="w-full md:mt-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#333D4C]"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
