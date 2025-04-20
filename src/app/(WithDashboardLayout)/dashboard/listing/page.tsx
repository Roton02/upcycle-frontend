"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/modals/DeleteModal";

interface Listing {
  id: number;
  title: string;
  category: string;
  price: number;
  condition: string;
  images: string[];
}

// Demo data (in a real app, this would likely come from an API)
const demoData: Listing[] = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    category: "Clothing",
    price: 120.0,
    condition: "Used - Like New",
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3"],
  },
  {
    id: 2,
    title: "Gaming Laptop",
    category: "Electronics",
    price: 850.0,
    condition: "Used - Good",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
  },
  {
    id: 3,
    title: "Mountain Bike",
    category: "Sports",
    price: 300.0,
    condition: "New",
    images: ["https://images.unsplash.com/photo-1532298229144-0ec0c57515c7"],
  },
];

// Main Listing Table Component
function ListingTable() {
  const [listings, setListings] = useState<Listing[]>(demoData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Listing | null>(null);
  const router = useRouter();

  const handleEdit = useCallback(
    (id: number) => {
      // Navigate to an edit page (assumes a route like /listings/edit/[id])
      router.push(`/listings/edit/${id}`);
    },
    [router]
  );

  const handleDeleteClick = useCallback((item: Listing) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedItem) {
      setListings((prev) => prev.filter((item) => item.id !== selectedItem.id));
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  }, [selectedItem]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-amber-500 sm:text-4xl">
        Listings
      </h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full rounded-lg bg-white text-gray-800">
          <thead>
            <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Condition
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Images
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 transition hover:bg-blue-50"
              >
                <td className="px-6 py-4 text-sm">{item.title}</td>
                <td className="px-6 py-4 text-sm">{item.category}</td>
                <td className="px-6 py-4 text-sm">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">{item.condition}</td>
                <td className="px-6 py-4">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg object-cover"
                    loading="lazy"
                  />
                </td>
                <td className="flex space-x-2 px-6 py-4">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="rounded-lg bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        itemTitle={selectedItem?.title || ""}
      />
    </div>
  );
}

export default ListingTable;
