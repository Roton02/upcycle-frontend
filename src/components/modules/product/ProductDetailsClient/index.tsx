"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import ProductDetailsSection from "@/components/modules/product/DetailsSection";
import ProductSlider from "@/components/modules/product/productSlider";
import ReviewSection from "@/components/modules/product/RivewSection";
import TabNav from "@/components/modules/product/TabNav";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {
  CircleCheckBig,
  MapPin,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export default function ProductDetailsClient({ data }: { data: any }) {
  const router = useRouter();
  const { setIsLoading } = useUser();

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...existingCart, data]));
    setIsLoading(true);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    localStorage.setItem("cart", JSON.stringify([data]));
    router.push("/checkout");
  };

  const productImages =
    data?.images && data.images.length > 0
      ? data.images
      : ["https://swiperjs.com/demos/images/nature-1.jpg"];

  return (
    <div className="w-[90%] mx-auto mt-28 pt-1">
      <h2 className="text-lg sm:text-xl md:text-2xl text-[#181D25] font-semibold my-6 dark:text-white">
        {data ? data.title : "Product Title"}
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between border-b-2 pb-2 mb-6 gap-4">
        <TabNav />

        <div className="flex items-center gap-2">
          <Rating style={{ maxWidth: 80 }} value={3} readOnly />
          <p className="text-sm text-[#9CA3AF]">68 reviews</p>
        </div>
      </div>

      <div
        id="general-info"
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24"
      >
        <div>
          <ProductSlider images={productImages} totalSliderImage={7} />
        </div>

        <div className="w-full sm:w-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-[#181D25] font-semibold dark:text-gray-100">
              Model
            </h3>
            <p className="text-xs text-[#6C727F] font-normal dark:text-gray-400">
              {data ? data._id : "N/A"}
            </p>
          </div>

          {data?.category && (
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 my-3">
              <h3 className="text-sm text-[#181D25] font-semibold dark:text-gray-100">
                Category:
              </h3>
              <p className="text-xs text-[#181D25] border border-[#181D25] rounded-[8px] py-2 px-4 font-normal dark:text-gray-400">
                {data.category}
              </p>
            </div>
          )}

          {data?.brand && (
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 my-3">
              <h3 className="text-sm text-[#181D25] font-semibold dark:text-gray-100">
                Brand:
              </h3>
              <p className="text-sm text-[#6C727F] font-normal dark:text-gray-400">
                {data.brand}
              </p>
            </div>
          )}

          {data?.condition && (
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 my-3">
              <h3 className="text-sm text-[#181D25] font-semibold dark:text-gray-100">
                Condition:
              </h3>
              <p className="text-sm text-[#6C727F] font-normal dark:text-gray-400">
                {data.condition}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center gap-3 mt-6 mb-4">
            <h3 className="text-2xl text-[#181D25] font-semibold dark:text-gray-100">
              ${data?.price.toFixed(2)}
            </h3>
            <p className="text-xs text-[#33B36B] font-normal flex gap-2 items-center">
              <CircleCheckBig className="w-[14px]" />
              {data?.status === "available"
                ? "Available to order"
                : "Out of stock"}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={handleAddToCart}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-sm py-2 rounded-lg transition-all flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold text-sm py-2 rounded-lg transition-all flex items-center justify-center"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>

          {data?.userID && (
            <div className="mt-14">
              <div className="flex flex-col gap-3 mt-6 mb-4">
                <h3 className="text-2xl text-[#181D25] font-semibold dark:text-gray-100">
                  Seller Information:
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-[#6C727F] dark:text-gray-400">
                    Email: {data?.userID.email}
                  </p>
                  <p className="text-sm text-[#6C727F] dark:text-gray-400">
                    Phone: {data?.userID.phone}
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="flex gap-2 py-3 px-4 items-center bg-[#EEF1F6] rounded-[8px] text-[#333D4C] text-sm font-medium">
                    <MapPin /> Location
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* details & reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-24 gap-10">
        <div>
          <section id="product-details" className="mt-16 scroll-mt-20">
            <ProductDetailsSection description={data?.description} />
          </section>
          <section id="review" className="mt-16 scroll-mt-20">
            <ReviewSection />
          </section>
        </div>

        {/* <div className="w-full md:w-3/4 mx-auto">
        <ProductsCardOnDetailsPage product={data} />
      </div> */}
      </div>
    </div>
  );
}
