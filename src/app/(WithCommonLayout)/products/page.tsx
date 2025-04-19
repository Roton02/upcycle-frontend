"use client";
import ProductCard from "@/components/modules/product/ProductCard";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { IListing } from "@/types";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AllProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<{
    status: string[];
    priceRange: string | null;
    categories: string[];
  }>({
    status: [],
    priceRange: "$340 - $1,250",
    categories: [],
  });

  const productsPerPage = 6;

  // Mock data
  const mockData: IListing[] = Array(18).fill({
    brand: "Giant",
    category: "Bicycles",
    condition: "Used - Like New",
    createdAt: "2025-04-12T07:46:35.751Z",
    deliveryOptions: [],
    description: "A well-maintained Shimano 105 groupset road bike.",
    images: [
      "https://img.freepik.com/premium-psd/laptop-mock-up-isolated_1310-1458.jpg?w=1380",
      "https://img.freepik.com/free-photo/laptop-wooden-table_53876-20635.jpg?t=st=1744916989~exp=1744920589~hmac=8bb760f13feea4c8462e70fa7f91a607db66239d7d8fb43e9dc1a78683b9f0a6&w=1380",
      "https://img.freepik.com/free-photo/vr-glasses-gaming_23-2151138417.jpg?t=st=1744733427~exp=1744737027~hmac=e23c1f95e936d8befdd5d7782db561d26c96ec391ddd56342904afb0fccd2e8c&w=1380",
    ],
    price: 45000,
    status: "available",
    tags: [],
    title: "Road Bike",
    updatedAt: "2025-04-12T07:46:35.751Z",
    userID: {
      _id: "67fa197300b5b03726eb0348",
      email: "a@a.com",
      phone: "123123",
    },
    _id: "67fa1a5bdbca562f77ca239b",
  });

  // Status options
  const statusOptions = ["Sale", "In Stock", "Same Day Delivery"];

  // Category options with counts
  const categoryOptions = [
    { name: "Smartphones", count: 332 },
    { name: "Wearable Electronics", count: 231 },
    { name: "Computers & Laptops", count: 332 },
    { name: "Accessories", count: 332 },
    { name: "Headphones", count: 123 },
    { name: "Cameras, Photo & Video", count: 23 },
  ];

  // Handle filter selection
  const toggleFilter = (type: "status" | "categories", value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }

      console.log("Applied filters:", newFilters);
      return newFilters;
    });

    // Reset to first page when filters change
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      status: [],
      priceRange: null,
      categories: [],
    });
    setSearchQuery("");
    console.log("All filters cleared");
  };

  // Remove specific filter
  const removeFilter = (
    type: "status" | "priceRange" | "categories",
    value?: string
  ) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (type === "priceRange") {
        newFilters.priceRange = null;
      } else if (value) {
        newFilters[type] = newFilters[type].filter((item) => item !== value);
      }

      return newFilters;
    });
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = mockData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(mockData.length / productsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get all active filters for display
  const getActiveFilters = () => {
    const filters = [];

    selectedFilters.status.forEach((status) => {
      filters.push({ type: "status", value: status });
    });

    selectedFilters.categories.forEach((category) => {
      filters.push({ type: "categories", value: category });
    });

    if (selectedFilters.priceRange) {
      filters.push({ type: "priceRange", value: selectedFilters.priceRange });
    }

    return filters;
  };

  return (
    <div className="w-[90%] mx-auto mt-28 pt-1 pb-10">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-1/2 lg:w-1/3"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-3"
          >
            Search
          </Button>
        </div>
      </form>

      <div>
        <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <h3 className="text-sm text-[#181D25] dark:text-gray-100">
              Found <span className="font-semibold">{mockData.length}</span>{" "}
              items
            </h3>

            {getActiveFilters().length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {getActiveFilters().map((filter, index) => (
                  <Button
                    key={index}
                    className="text-xs text-[#333D4C] bg-[#EEF1F6] px-4 rounded-[6px] flex items-center gap-1"
                    onClick={() =>
                      removeFilter(
                        filter.type as any,
                        filter.type !== "priceRange" ? filter.value : undefined
                      )
                    }
                  >
                    <X className="h-3 w-3" /> {filter.value}
                  </Button>
                ))}
                {getActiveFilters().length > 0 && (
                  <Button
                    className="text-xs text-[#333D4C] underline dark:text-gray-200"
                    onClick={clearAllFilters}
                  >
                    clear all
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 mt-4 md:mt-0">
            <h3>Sort by:</h3>
            <div className="ml-auto">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Most popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mx-auto w-full">
        <button
          className="flex items-center justify-between w-full p-4 md:hidden border border-[#E0E5EB] rounded-[8px] mt-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="text-[#181D25] font-semibold dark:text-gray-100">
            Filters
          </span>
          <ChevronDown
            className={`transform transition-transform ${
              isSidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-[25%] h-auto space-y-6 mt-4 md:mt-10 md:mb-0`}
        >
          {/* Status filters */}
          <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
            <h2 className="text-[#181D25] font-semibold dark:text-gray-100 mb-4">
              Status
            </h2>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  className={`text-[#333D4C] border ${
                    selectedFilters.status.includes(status)
                      ? "bg-[#EEF1F6] border-[#333D4C]"
                      : "border-[#E0E5EB] hover:border-[#333D4C]"
                  } rounded-[6px] dark:text-gray-200 cursor-pointer`}
                  onClick={() => toggleFilter("status", status)}
                >
                  {status === "Sale" && "% "}
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
            <h2 className="text-[#181D25] font-semibold dark:text-gray-100 mb-4">
              Categories
            </h2>
            <div className="space-y-3">
              {categoryOptions.map((category) => (
                <div
                  key={category.name}
                  className={`flex justify-between items-center text-sm ${
                    selectedFilters.categories.includes(category.name)
                      ? "text-[#181D25] font-medium"
                      : "text-[#333D4C]"
                  } rounded-[6px] dark:text-gray-300 p-2 hover:bg-[#F8F9FB] cursor-pointer`}
                  onClick={() => toggleFilter("categories", category.name)}
                >
                  <p>{category.name}</p>
                  <p>{category.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="w-full md:w-[75%] md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                // Show current page, first page, last page, and one page before and after current
                const shouldShow =
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1);

                // Show ellipsis for gaps
                if (!shouldShow) {
                  // Show ellipsis only once between gaps
                  if (pageNumber === 2 || pageNumber === totalPages - 1) {
                    return (
                      <span key={pageNumber} className="mx-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    className={`h-8 w-8 ${
                      currentPage === pageNumber ? "bg-[#333D4C]" : ""
                    }`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
