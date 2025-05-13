"use client";
import React from "react";
import Image from "next/image";

interface Listing {
  _id: string;
  title: string;
  category: string;
  price: number;
  condition: string;
  images: string[];
}

interface ListingTableProps {
  listings: Listing[];
  onEdit: (_id: string) => void;
  onDelete: (item: Listing) => void;
}

const ListingTable = ({ listings, onEdit, onDelete }: ListingTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full rounded-lg bg-white text-gray-800">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
            <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Category
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
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
              key={item._id}
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
                />
              </td>
              <td className="flex space-x-2 px-6 py-4">
                <button
                  onClick={() => onEdit(item._id)}
                  className="rounded-lg bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;
