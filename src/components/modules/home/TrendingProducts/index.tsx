"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "../../product/ProductCard";


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

  return (
    <div className="w-full py-10 px-4 md:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 text-center dark:text-gray-100 mb-4 ml-1">
          New arrivals
        </h2>
        <div className="flex justify-end items-center mb-6">
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
