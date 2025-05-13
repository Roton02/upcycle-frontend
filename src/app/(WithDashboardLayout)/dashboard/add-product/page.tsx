"use client";
import { addProduct } from "@/services/Products";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export interface ProductFormData {
  title: string;
  description: string;
  category: string;
  brand: string;
  status: string;
  price: number;
  condition: string;
  images: File[] | string[];
}

// extends Partial<ProductFormData>
interface Errors {
  title?: string;
  description?: string;
  category?: string;
  brand?: string;
  status?: string;
  condition?: string;
  images?: string;
  price?: string;
}

export default function Page() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    category: "",
    brand: "",
    status: "",
    price: 0,
    condition: "",
    images: [],
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Electronics", "Clothing", "Books", "Home", "Other"];
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
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

  const cloudinaryCloudName = "djn7zs75x";
  const cloudinaryUploadPreset = "upcycle";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors: Errors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload images to Cloudinary
      const imageUrls = await Promise.all(
        (formData.images as File[]).map((file) => uploadImageToCloudinary(file))
      );
      console.log(imageUrls);

      // Prepare submission data
      const submissionData = {
        ...formData,
        images: imageUrls, // Replace File[] with Cloudinary URLs
      };

      const res = await addProduct(submissionData);

      console.log("submitData =>", submissionData, "res data =>", res);

      console.log("Add product response:", res);
      if (!res.success) {
        toast.error(res.message);
        throw new Error(`Failed to submit product`);
      }

      if (res.success) toast.success(res.message);
      setFormData({
        title: "",
        description: "",
        category: "",
        brand: "",
        status: "",
        price: 0,
        condition: "",
        images: [],
      });
    } catch (error) {
      console.error("Submission error:", error);
      // alert("Failed to submit product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-8 transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Add Product
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            List your product with elegance
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-indigo-300 shadow-sm sm:text-sm"
                placeholder="Enter product title"
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
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-indigo-300 shadow-sm sm:text-sm"
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
                name="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-indigo-300 shadow-sm sm:text-sm"
              >
                <option value="">Select brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
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
                name="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-indigo-300 shadow-sm sm:text-sm"
              >
                <option value="">Select status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
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
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price:
                      e.target.value === "" ? 0 : parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-indigo-300 shadow-sm sm:text-sm"
                placeholder="Enter price"
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
                name="condition"
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-indigo-300 shadow-sm sm:text-sm"
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

            {/* Description - Spans full width */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-indigo-300 shadow-sm sm:text-sm"
                placeholder="Describe your product"
                rows={4}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Images - Spans full width, Mandatory */}
            <div className="md:col-span-2">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Product Images <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-rose-500 transition-all duration-300 bg-white/50 shadow-sm">
                <div className="space-y-2 text-center">
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
                      htmlFor="images"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload images</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, up to 10MB</p>
                </div>
              </div>
              {errors.images && (
                <p className="mt-1 text-xs text-red-500">{errors.images}</p>
              )}
              {formData.images.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {formData.images.length} image(s) selected
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center">  
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Submitting...
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
