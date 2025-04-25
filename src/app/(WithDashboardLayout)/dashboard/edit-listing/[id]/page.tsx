"use client";
import { useState, useEffect, type FormEvent } from "react";
import type React from "react";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import DeleteModal from "@/components/modals/DeleteModal";
import { updateProduct } from "@/services/Products";
import { toast } from "sonner";

interface Listing {
  title: string;
  description: string;
  category: string;
  price: number | string;
  brand?: string;
  status?: string;
  condition: string;
  images: string | string[];
}

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<Listing>({
    title: "",
    description: "",
    category: "",
    brand: "",
    status: "",
    price: 0,
    condition: "",
    images: [],
  });
  const [errors, setErrors] = useState<Partial<Listing>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);

  const brands = [
    "Apple",
    "Samsung",
    "Nike",
    "Adidas",
    "Penguin",
    "HarperCollins",
    "IKEA",
    "Dyson",
    "Generic",
    "Local Brand",
  ];
  const statuses = ["available", "sold", "reserved"];

  const categories = ["Electronics", "Clothing", "Books", "Home", "Other"];
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
  const cloudinaryCloudName = "djn7zs75x";
  const cloudinaryUploadPreset = "upcycle";
  // Fetch listing data on mount
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_BASE_API) {
      console.error("NEXT_PUBLIC_BASE_API is undefined");
      toast.error("Configuration error: API base URL is missing");
      setIsLoading(false);
      return;
    }

    async function fetchListing() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch listing: ${res.statusText}`);
        }
        const data = await res.json();

        setFormData({
          title: data?.data?.title || "",
          description: data?.data?.description || "",
          category: data?.data?.category || "",
          brand: data?.data?.brand || "",
          status: data?.data?.status || "",
          price: data?.data?.price || 0,
          condition: data?.data?.condition || "",
          images: data?.data?.images || [],
        });
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load listing data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Listing> = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    // if (!formData.brand) newErrors.brand = "Brand is required";
    // if (!formData.status) newErrors.status = "Status is required";
    if (Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (formData.images.length === 0 && newImages.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!process.env.NEXT_PUBLIC_BASE_API) {
      toast.error("Cannot submit: API base URL is missing");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload new images to Cloudinary if they exist
      let allImageUrls = [...formData.images];

      if (newImages.length > 0) {
        const newImageUrls = await Promise.all(
          newImages.map((image) => uploadImageToCloudinary(image))
        );
        allImageUrls = [...allImageUrls, ...newImageUrls];
      }

      const submissionData = {
        ...formData,
        images: allImageUrls,
      };

      const result = await updateProduct(id, submissionData);
      if (result.success) {
        console.log(result);

        toast.success("Listing updated successfully!");
      } else if (!result.success) {
        throw new Error(result.message || "Failed to update listing");
      }

      // router.push("/listings");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to update listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!process.env.NEXT_PUBLIC_BASE_API) {
      toast.error("Cannot delete: API base URL is missing");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete listing: ${res.statusText}`);
      }

      toast.success("Listing deleted successfully!");
      router.push("/listings");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete listing");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-amber-500 sm:text-4xl">
        Edit Listing
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Product title"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand <span className="text-red-500">*</span>
              </label>
              <select
                id="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="mt-1 text-xs text-red-500">{errors.brand}</p>
              )}
            </div>
            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a status</option>
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">{errors.status}</p>
              )}
            </div>
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number.parseFloat(e.target.value) || 0,
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Condition */}
            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700"
              >
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select condition</option>
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
              {errors.condition && (
                <p className="mt-1 text-xs text-red-500">{errors.condition}</p>
              )}
            </div>

            {/* Description - Full width */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Describe your product"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Images - Full width */}
            <div className="md:col-span-2">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images <span className="text-red-500">*</span>
              </label>

              {/* Display existing images */}
              {formData.images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array.isArray(formData.images) &&
                    formData.images.map((url, index) => (
                      <div key={index} className="relative h-20 w-20">
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="rounded-md object-cover"
                          sizes="80px"
                        />
                      </div>
                    ))}
                </div>
              )}

              {/* Upload new images */}
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload new images</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {newImages.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {newImages.length} new image(s) selected
                </p>
              )}

              {errors.images && (
                <p className="mt-1 text-xs text-red-500">{errors.images}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Listing
            </button>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Listing"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemTitle={formData.title}
      />
    </div>
  );
}
