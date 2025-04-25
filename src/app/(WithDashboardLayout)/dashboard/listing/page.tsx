"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/modals/DeleteModal";
import ListingTable from "@/components/table/listingTable";
import { deleteProduct } from "@/services/Products";
import { toast } from "sonner";

interface Listing {
  _id: string;
  title: string;
  category: string;
  price: number;
  condition: string;
  images: string[];
}

const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const router = useRouter();

  const fetchListings = useCallback(async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const params = new URLSearchParams();
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "desc");
      params.set("page", page.toString());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/listings?${params.toString()}`
      );
      const response = await res.json();
      setListings(response.data.data);
    } catch (err) {
      console.error("Failed to fetch listings", err);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  }, [page]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleEdit = useCallback(
    (_id: string) => {
      router.push(`/dashboard/edit-listing/${_id}`);
    },
    [router]
  );

  const handleDeleteClick = useCallback((item: Listing) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (selectedItem) {
      try {
        // Call the deleteProduct function
        const result = await deleteProduct(selectedItem._id);

        if (result.success) {
          setListings((prev) =>
            prev.filter((item) => item._id !== selectedItem._id)
          );
          toast.success("Product deleted successfully!");
        } else {
          toast.error(result.message || "Failed to delete product");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("An error occurred while deleting the product");
      } finally {
        setIsModalOpen(false);
        setSelectedItem(null);
      }
    }
  }, [selectedItem]);
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-amber-500 sm:text-4xl">
        Listings
      </h1>

      {/* Loading Animation */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <ListingTable
            listings={listings}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 disabled:opacity-50"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="flex items-center text-sm">Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        itemTitle={selectedItem?.title || ""}
      />
    </div>
  );
};

export default ListingsPage;
