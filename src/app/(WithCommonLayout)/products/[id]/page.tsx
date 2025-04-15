import ProductDetailsSection from "@/components/modules/product/DetailsSection";
import ProductsCardOnDetailsPage from "@/components/modules/product/ProductCardOnDetailsPage";
import ProductSlider from "@/components/modules/product/productSlider";
import ReviewSection from "@/components/modules/product/RivewSection";
import TabNav from "@/components/modules/product/TabNav";
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
    <div className="w-[90%] mx-auto mt-28 pt-1">
      <h2 className="text-lg sm:text-xl md:text-2xl text-[#181D25] font-semibold my-6 dark:text-white">
        Apple iPhone 14 Plus 128GB Blue
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between border-b-2 pb-2 mb-6 gap-4">
        {/* <div className="flex gap-4 md:gap-8">
          <p className="text-sm text-[#181D25] font-medium">General info</p>
          <p className="text-sm text-[#181D25] font-medium">Product details</p>
          <p className="text-sm text-[#181D25] font-medium">Reviews</p>
        </div> */}
        <TabNav />

        <div className="flex items-center gap-2">
          <Rating style={{ maxWidth: 80 }} value={3} readOnly />
          <p className="text-sm text-[#9CA3AF]">68 reviews</p>
        </div>
      </div>
      
      <div id="general-info" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
        <div>
          {/* Replace 👇 images with the images array from data */}
          {/* totalSliderImage means how many images to show on the control slider */}
          {/* @Mahmud Vai, tune the totalSliderImage value for responsiveness */}
          <ProductSlider images={images} totalSliderImage={7} />
        </div>

        <div className="w-full sm:w-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-[#181D25] font-semibold dark:text-gray-100">Model</h3>
            <p className="text-xs text-[#6C727F] font-normal dark:text-gray-400">V00273124</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 my-3">
            <h3 className="text-sm text-[#181D25] font-semibold dark:text-gray-100">Storage:</h3>
            <p className="text-xs text-[#181D25] border border-[#181D25] rounded-[8px] py-2 px-4 font-normal dark:text-gray-400">
              128 GB
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 my-3">
            <h3 className="text-sm text-[#181D25] font-semibold dark:text-gray-100">Color:</h3>
            <p className="text-sm text-[#6C727F] font-normal dark:text-gray-400">Blue</p>
          </div>
          <div className="flex justify-between items-center gap-3 mt-6 mb-4">
            <h3 className="text-2xl text-[#181D25] font-semibold dark:text-gray-100">$940.00</h3>
            <p className="text-xs text-[#33B36B] font-normal flex gap-2 items-center">
              <CircleCheckBig className="w-[14px]" /> Available to order{" "}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 mb-6">
            <Button className="md:w-full text-sm text-white font-medium bg-[#F55266] hover:bg-[#cd4454] rounded-[8px]">
              <ShoppingCart />
              Add to cart
            </Button>
            <Button className="text-sm text-[#333D4C] font-medium bg-[#EEF1F6] hover:bg-[#c9ccd0] rounded-[8px]">
              <Heart />
            </Button>
            <Button className="text-sm text-[#333D4C] font-medium bg-[#EEF1F6] hover:bg-[#c9ccd0] rounded-[8px]">
              <RefreshCw />
            </Button>
          </div>

          <div className="mt-14">
            <div className="flex justify-between items-center gap-3 mt-6 mb-4">
              <h3 className="text-2xl text-[#181D25] font-semibold dark:text-gray-100">
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
      <div className="grid grid-cols-1 md:grid-cols-2 mt-24 gap-10">
        <div>
          <section id="product-details" className="mt-16 scroll-mt-20">
            <ProductDetailsSection />
          </section>
          <section id="review" className="mt-16 scroll-mt-20">
            <ReviewSection />
          </section>
        </div>

        <div className="w-full md:w-3/4 mx-auto">
          <ProductsCardOnDetailsPage />
        </div>
      </div>
    </div>
  );
}
