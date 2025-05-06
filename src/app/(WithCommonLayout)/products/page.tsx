"use client";

import ProductsClient from "@/components/modules/product/ProductsClient";
import { Suspense } from "react";

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import ProductCard from "@/components/modules/product/ProductCard";
// import type React from "react";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import type { IListing } from "@/types";
// import {
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Search,
//   X,
// } from "lucide-react";

export default function AllProduct() {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // // Get query parameters with defaults
  // const page = Number(searchParams.get("page") || "1");
  // const searchQuery = searchParams.get("search") || "";
  // const brand = searchParams.get("brand") || "";
  // const category = searchParams.get("category") || "";
  // const condition = searchParams.get("condition") || "";
  // const minPrice = Number(searchParams.get("price[gte]") || "0");
  // const maxPrice = Number(searchParams.get("price[lte]") || "10000");
  // const sortBy = searchParams.get("sortBy") || "createdAt";
  // const sortOrder = searchParams.get("sortOrder") || "desc";

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [products, setProducts] = useState<IListing[]>([]);
  // const [totalProducts, setTotalProducts] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [priceRange, setPriceRange] = useState<[number, number]>([
  //   minPrice,
  //   maxPrice,
  // ]);
  // const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  // const [totalPages, setTotalPages] = useState(1);
  // const PRODUCTS_PER_PAGE = 12;
  // // Status options
  // // const statusOptions = ["Sale", "In Stock", "Same Day Delivery"];

  // // Category options with counts
  // const categoryOptions = [
  //   "Clothing",
  //   "Electronics",
  //   "Accessories",
  //   "Furniture",
  //   "Home Appliances",
  //   "Vehicles",
  //   "Books & Stationery",
  //   "Toys & Games",
  //   "Sports & Fitness",
  //   "Musical Instruments",
  //   "Beauty & Personal Care",
  //   "Pet Supplies",
  //   "Tools & Hardware",
  //   "Others",
  // ].map((name) => ({ name, count: 0 }));

  // // Condition options
  // // const conditionOptions = ["New", "Used", "Refurbished", "Open Box"];

  // // Update URL with filters
  // const updateFilters = (
  //   newFilters: Record<string, string | number | null>
  // ) => {
  //   const params = new URLSearchParams();

  //   // Add current params
  //   if (page > 1) params.set("page", page.toString());
  //   params.set("limit", PRODUCTS_PER_PAGE.toString());
  //   if (searchQuery) params.set("search", searchQuery);
  //   if (brand) params.set("brand", brand);
  //   if (category) params.set("category", category);
  //   if (condition) params.set("condition", condition);
  //   if (minPrice > 0) params.set("price[gte]", minPrice.toString());
  //   if (maxPrice < 10000) params.set("price[lte]", maxPrice.toString());
  //   if (sortBy) params.set("sortBy", sortBy);
  //   if (sortOrder) params.set("sortOrder", sortOrder);

  //   // Update with new filters
  //   Object.entries(newFilters).forEach(([key, value]) => {
  //     if (value === null || value === "") {
  //       params.delete(key);
  //     } else {
  //       params.set(key, value.toString());
  //     }
  //   });

  //   // Reset to page 1 when filters change
  //   if (Object.keys(newFilters).some((key) => key !== "page")) {
  //     params.set("page", "1");
  //   }

  //   router.push(`?${params.toString()}`);
  // };

  // // Fetch products based on filters
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       // Build query string with all filters
  //       const params = new URLSearchParams();
  //       params.set("page", page.toString());
  //       params.set("limit", PRODUCTS_PER_PAGE.toString());

  //       if (searchQuery) params.set("search", searchQuery);
  //       if (brand) params.set("brand", brand);
  //       if (category) params.set("category", category);
  //       if (condition) params.set("condition", condition);
  //       if (minPrice > 0) params.set("price[gte]", minPrice.toString());
  //       if (maxPrice < 10000) params.set("price[lte]", maxPrice.toString());
  //       if (sortBy) params.set("sortBy", sortBy);
  //       params.set("sortOrder", sortOrder);

  //       const result = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_API}/listings?${params.toString()}`
  //       );
  //       const response = await result.json();

  //       if (response.success && Array.isArray(response.data.data)) {
  //         setProducts(response.data.data);
  //         const total = response.data.meta.total || 0;
  //         setTotalProducts(total);
  //         setTotalPages(Math.ceil(total / PRODUCTS_PER_PAGE));
  //       } else {
  //         console.error("Failed to fetch products:", response.message);
  //         setProducts([]);
  //         setError(response.message || "Failed to load products");
  //       }
  //     } catch (error: any) {
  //       console.error("Error fetching products:", error);
  //       setProducts([]);
  //       setError(error.message || "Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [
  //   page,
  //   searchQuery,
  //   brand,
  //   category,
  //   condition,
  //   minPrice,
  //   maxPrice,
  //   sortBy,
  //   sortOrder,
  // ]);

  // // Update price range state when URL params change
  // useEffect(() => {
  //   setPriceRange([minPrice, maxPrice]);
  //   setSearchInputValue(searchQuery);
  // }, [minPrice, maxPrice, searchQuery]);

  // // Handle search form submission
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   updateFilters({ search: searchInputValue });
  // };

  // // Handle price range change
  // const handlePriceChange = (value: number[]) => {
  //   setPriceRange([value[0], value[1]]);
  // };

  // // Apply price range filter
  // const applyPriceRange = () => {
  //   updateFilters({
  //     "price[gte]": priceRange[0],
  //     "price[lte]": priceRange[1],
  //   });
  // };

  // // Calculate total pages

  // // Get all active filters for display
  // const getActiveFilters = () => {
  //   const filters = [];

  //   if (searchQuery) {
  //     filters.push({ type: "search", value: searchQuery });
  //   }

  //   if (brand) {
  //     filters.push({ type: "brand", value: brand });
  //   }

  //   if (category) {
  //     filters.push({ type: "category", value: category });
  //   }

  //   if (condition) {
  //     filters.push({ type: "condition", value: condition });
  //   }

  //   if (minPrice > 0 || maxPrice < 10000) {
  //     filters.push({ type: "price", value: `$${minPrice} - $${maxPrice}` });
  //   }

  //   return filters;
  // };

  // // Clear all filters
  // const clearAllFilters = () => {
  //   router.push("?");
  // };

  // // Remove specific filter
  // const removeFilter = (type: string) => {
  //   const filtersToUpdate: Record<string, null> = {};

  //   switch (type) {
  //     case "search":
  //       filtersToUpdate.search = null;
  //       break;
  //     case "brand":
  //       filtersToUpdate.brand = null;
  //       break;
  //     case "category":
  //       filtersToUpdate.category = null;
  //       break;
  //     case "condition":
  //       filtersToUpdate.condition = null;
  //       break;
  //     case "price":
  //       filtersToUpdate["price[gte]"] = null;
  //       filtersToUpdate["price[lte]"] = null;
  //       break;
  //   }

  //   updateFilters(filtersToUpdate);
  // };

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsClient />
    </Suspense>
    // <div className="w-[90%] mx-auto mt-28 pt-1 pb-10">
    //   <h2 className="text-2xl font-bold mb-6">All Products</h2>

    //   {/* Search Bar */}
    //   <form onSubmit={handleSearch} className="mb-6">
    //     <div className="relative">
    //       <Input
    //         type="text"
    //         placeholder="Search products..."
    //         value={searchInputValue}
    //         onChange={(e) => setSearchInputValue(e.target.value)}
    //         className="pl-10 pr-4 py-2 w-full md:w-1/2 lg:w-1/3"
    //       />
    //       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    //       <Button
    //         type="submit"
    //         className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-3"
    //       >
    //         Search
    //       </Button>
    //     </div>
    //   </form>

    //   <div>
    //     <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
    //       <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
    //         <h3 className="text-sm text-[#181D25] dark:text-gray-100">
    //           Found <span className="font-semibold">{totalProducts}</span> items
    //         </h3>

    //         {getActiveFilters().length > 0 && (
    //           <div className="flex flex-wrap items-center gap-2">
    //             {getActiveFilters().map((filter, index) => (
    //               <Button
    //                 key={index}
    //                 className="text-xs text-[#333D4C] bg-[#EEF1F6] px-4 rounded-[6px] flex items-center gap-1"
    //                 onClick={() => removeFilter(filter.type)}
    //               >
    //                 <X className="h-3 w-3" /> {filter.value}
    //               </Button>
    //             ))}
    //             {getActiveFilters().length > 0 && (
    //               <Button
    //                 className="text-xs text-[#333D4C] underline dark:text-gray-200"
    //                 onClick={clearAllFilters}
    //               >
    //                 clear all
    //               </Button>
    //             )}
    //           </div>
    //         )}
    //       </div>

    //       <div className="flex flex-wrap justify-center items-center gap-2 mt-4 md:mt-0">
    //         <h3>Sort by:</h3>
    //         <div className="ml-auto">
    //           <Select
    //             value={sortOrder}
    //             onValueChange={(value) => updateFilters({ sortOrder: value })}
    //           >
    //             <SelectTrigger className="w-[180px]">
    //               <SelectValue placeholder="Newest" />
    //             </SelectTrigger>
    //             <SelectContent className=" bg-white dark:bg-zinc-900 text-black dark:text-white">
    //               <SelectItem value="desc">Newest</SelectItem>
    //               <SelectItem value="asc">Oldest</SelectItem>
    //             </SelectContent>
    //           </Select>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex flex-col md:flex-row gap-6 mx-auto w-full">
    //     <button
    //       className="flex items-center justify-between w-full p-4 md:hidden border border-[#E0E5EB] rounded-[8px] mt-4"
    //       onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    //     >
    //       <span className="text-[#181D25] font-semibold dark:text-gray-100">
    //         Filters
    //       </span>
    //       <ChevronDown
    //         className={`transform transition-transform ${
    //           isSidebarOpen ? "rotate-180" : ""
    //         }`}
    //       />
    //     </button>

    //     {/* Sidebar */}
    //     <div
    //       className={`${
    //         isSidebarOpen ? "block" : "hidden"
    //       } md:block w-full md:w-[25%] h-auto space-y-6 mt-4 md:mt-10 md:mb-0`}
    //     >
    //       {/* Price Range */}
    //       <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
    //         <h2 className="text-[#181D25] font-semibold dark:text-gray-100 mb-4">
    //           Price Range
    //         </h2>
    //         <div className="space-y-6">
    //           <div className="flex justify-between items-center mb-2">
    //             <div className="flex items-center border rounded p-2 w-[45%]">
    //               <span className="text-gray-500 mr-1">$</span>
    //               <Input
    //                 type="number"
    //                 value={priceRange[0]}
    //                 onChange={(e) =>
    //                   setPriceRange([
    //                     Math.max(0, Number.parseInt(e.target.value) || 0),
    //                     priceRange[1],
    //                   ])
    //                 }
    //                 className="border-0 p-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
    //               />
    //             </div>
    //             <span className="text-gray-400">-</span>
    //             <div className="flex items-center border rounded p-2 w-[45%]">
    //               <span className="text-gray-500 mr-1">$</span>
    //               <Input
    //                 type="number"
    //                 value={priceRange[1]}
    //                 onChange={(e) =>
    //                   setPriceRange([
    //                     priceRange[0],
    //                     Math.min(10000, Number.parseInt(e.target.value) || 0),
    //                   ])
    //                 }
    //                 className="border-0 p-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
    //               />
    //             </div>
    //           </div>
    //           <Slider
    //             value={priceRange}
    //             min={0}
    //             max={10000}
    //             step={100}
    //             onValueChange={handlePriceChange}
    //             className="mt-6"
    //           />
    //           <Button onClick={applyPriceRange} className="w-full">
    //             Apply
    //           </Button>
    //         </div>
    //       </div>

    //       {/* Categories */}
    //       <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
    //         <h2 className="text-[#181D25] font-semibold dark:text-gray-100 mb-4">
    //           Categories
    //         </h2>
    //         <div className="space-y-3">
    //           {categoryOptions.map((categoryItem) => (
    //             <div
    //               key={categoryItem.name}
    //               className={`flex justify-between items-center text-sm ${
    //                 category === categoryItem.name
    //                   ? "text-[#181D25] font-medium"
    //                   : "text-[#333D4C]"
    //               } rounded-[6px] dark:text-gray-300 p-2 hover:bg-[#F8F9FB] cursor-pointer`}
    //               onClick={() =>
    //                 updateFilters({
    //                   category:
    //                     category === categoryItem.name
    //                       ? null
    //                       : categoryItem.name,
    //                 })
    //               }
    //             >
    //               <p>{categoryItem.name}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Condition filters */}
    //       {/* <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
    //         <h2 className="text-[#181D25] font-semibold dark:text-gray-100 mb-4">
    //           Condition
    //         </h2>
    //         <div className="space-y-3">
    //           {conditionOptions.map((conditionName) => (
    //             <div
    //               key={conditionName}
    //               className={`flex justify-between items-center text-sm ${
    //                 condition === conditionName
    //                   ? "text-[#181D25] font-medium"
    //                   : "text-[#333D4C]"
    //               } rounded-[6px] dark:text-gray-300 p-2 hover:bg-[#F8F9FB] cursor-pointer`}
    //               onClick={() =>
    //                 updateFilters({
    //                   condition:
    //                     condition === conditionName ? null : conditionName,
    //                 })
    //               }
    //             >
    //               <p>{conditionName}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </div> */}
    //     </div>

    //     {/* Product grid, Loading Spinner, or Error Message */}
    //     <div className="w-full md:w-[75%] md:mt-10">
    //       {loading ? (
    //         <div className="flex justify-center items-center h-64">
    //           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#333D4C]"></div>
    //         </div>
    //       ) : error ? (
    //         <div className="flex justify-center items-center h-64">
    //           <p className="text-red-500 text-lg">{error}</p>
    //         </div>
    //       ) : (
    //         <>
    //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //             {products.map((product, index) => (
    //               <ProductCard key={index} product={product} />
    //             ))}
    //           </div>

    //           {/* Pagination */}
    //           {totalPages > 1 && (
    //             <div className="flex justify-center items-center mt-10 gap-2">
    //               <Button
    //                 variant="outline"
    //                 size="icon"
    //                 onClick={() =>
    //                   updateFilters({ page: Math.max(1, page - 1) })
    //                 }
    //                 disabled={page === 1}
    //                 className="h-8 w-8"
    //               >
    //                 <ChevronLeft className="h-4 w-4" />
    //               </Button>

    //               {Array.from({ length: totalPages }).map((_, index) => {
    //                 const pageNumber = index + 1;
    //                 const shouldShow =
    //                   pageNumber === 1 ||
    //                   pageNumber === totalPages ||
    //                   (pageNumber >= page - 1 && pageNumber <= page + 1);

    //                 if (!shouldShow) {
    //                   if (pageNumber === 2 || pageNumber === totalPages - 1) {
    //                     return (
    //                       <span key={pageNumber} className="mx-1">
    //                         ...
    //                       </span>
    //                     );
    //                   }
    //                   return null;
    //                 }

    //                 return (
    //                   <Button
    //                     key={pageNumber}
    //                     variant={page === pageNumber ? "default" : "outline"}
    //                     className={`h-8 w-8 ${
    //                       page === pageNumber ? "bg-[#333D4C]" : ""
    //                     }`}
    //                     onClick={() => updateFilters({ page: pageNumber })}
    //                   >
    //                     {pageNumber}
    //                   </Button>
    //                 );
    //               })}

    //               <Button
    //                 variant="outline"
    //                 size="icon"
    //                 onClick={() =>
    //                   updateFilters({ page: Math.min(totalPages, page + 1) })
    //                 }
    //                 disabled={page === totalPages}
    //                 className="h-8 w-8"
    //               >
    //                 <ChevronRight className="h-4 w-4" />
    //               </Button>
    //             </div>
    //           )}
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
