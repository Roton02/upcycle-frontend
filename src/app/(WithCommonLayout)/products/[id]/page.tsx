import ProductDetailsSection from "@/components/modules/product/DetailsSection";
import ProductsCardOnDetailsPage from "@/components/modules/product/ProductCardOnDetailsPage";
import ProductSlider from "@/components/modules/product/productSlider";
import ReviewSection from "@/components/modules/product/RivewSection";
import { Button } from "@/components/ui/button";
import { getSingleProduct } from "@/services/Products";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import {
  CircleCheckBig,
  Heart,
  MapPin,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await getSingleProduct(id);

  console.log(data);
  // remove this 👇 images later
  const images = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
  ];

  return (
    <div className="w-[90%] mx-auto">
      <h2 className="text-[28px] text-[#181D25] font-semibold my-6">
        Apple iPhone 14 Plus 128GB Blue
      </h2>

      <div className="flex justify-between border-b-2 pb-2 mb-6">
        <div className="flex gap-8 ">
          <p className="text-sm text-[#181D25] font-medium">General info</p>
          <p className="text-sm text-[#181D25] font-medium">Product details</p>
          <p className="text-sm text-[#181D25] font-medium">Reviews</p>
        </div>

        <div className="flex items-center gap-2">
          <Rating style={{ maxWidth: 80 }} value={3} readOnly />
          <p className="text-sm text-[#9CA3AF]">68 reviews</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-24">
        <div>
          {/* Replace 👇 images with the images array from data */}
          {/* totalSliderImage means how many images to show on the control slider */}
          {/* @Mahmud Vai, tune the totalSliderImage value for responsiveness */}
          <ProductSlider images={images} totalSliderImage={7} />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-[#181D25] font-semibold">Model</h3>
            <p className="text-xs text-[#6C727F] font-normal">V00273124</p>
          </div>
          <div className="flex items-center gap-8 my-3">
            <h3 className="text-sm text-[#181D25] font-semibold">Storage:</h3>
            <p className="text-xs text-[#181D25] border border-[#181D25] rounded-[8px] py-2 px-4 font-normal">
              128 GB
            </p>
          </div>
          <div className="flex items-center gap-8">
            <h3 className="text-sm text-[#181D25] font-semibold">Color:</h3>
            <p className="text-sm text-[#6C727F] font-normal">Blue</p>
          </div>
          <div className="flex justify-between items-center gap-3 mt-6 mb-4">
            <h3 className="text-2xl text-[#181D25] font-semibold">$940.00</h3>
            <p className="text-xs text-[#33B36B] font-normal flex gap-2 items-center">
              <CircleCheckBig className="w-[14px]" /> Available to order{" "}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 mb-6">
            <Button className="w-full text-sm text-white font-medium bg-[#F55266] hover:bg-[#cd4454] rounded-[8px]">
              <ShoppingCart />
              Add to cart
            </Button>
            <Button className="text-sm text--[#333D4C] font-medium bg-[#EEF1F6] hover:bg-[#c9ccd0] rounded-[8px]">
              <Heart />
            </Button>
            <Button className="text-sm text--[#333D4C] font-medium bg-[#EEF1F6] hover:bg-[#c9ccd0] rounded-[8px]">
              <RefreshCw />
            </Button>
          </div>

          <div className="mt-14">
            <div className="flex justify-between items-center gap-3 mt-6 mb-4">
              <h3 className="text-2xl text-[#181D25] font-semibold">
                Location:
              </h3>
              <p className="flex gap-2 py-3 px-4 items-center bg-[#EEF1F6] rounded-[8px] text-[#333D4C] text-sm font-medium">
                <MapPin /> Location
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* details & reviews */}
      <div className="grid md:grid-cols-2 mt-24">
        <div>
          <ProductDetailsSection />
          <ReviewSection />
        </div>

        <div className="w-3/4 mx-auto">
          <ProductsCardOnDetailsPage />
        </div>
      </div>
    </div>
  );
}
