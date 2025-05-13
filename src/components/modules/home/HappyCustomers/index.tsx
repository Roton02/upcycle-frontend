import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Star } from "lucide-react";

// import { FaRegHandshake, FaShieldAlt, FaTags, FaShippingFast, FaStar } from 'react-icons/fa';

const marketplaceReviews = [
  {
    icon: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Trusted Sellers",
    description:
      "All sellers are verified to ensure a safe and honest transaction.",
  },
  {
    icon: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Buyer Protection",
    description:
      "Your purchases are secured until you receive the product as described.",
  },
  {
    icon: "https://images.unsplash.com/photo-1698510047345-ff32de8a3b74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Affordable Deals",
    description: "Great value for second-hand items at unbeatable prices.",
  },
  {
    icon: "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Fast Delivery",
    description: "Quick and reliable shipping options across the country.",
  },
  {
    icon: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Customer Ratings",
    description: "Read real reviews and ratings from previous buyers.",
  },
];

export default function HappyCustomers() {
  return (
    <div className="max-w-7xl mx-auto bg-[#F5F7FA] dark:bg-[#222934] py-8 px-4 md:px-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Happy customers
      </h2>

      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Navigation]}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="special-offers-swiper"
        >
          {marketplaceReviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col justify-between min-h-[200px] h-full mb-10 bg-white p-6 rounded-[12px] shadow-lg dark:bg-[#181D25] dark:shadow-[#2A3748]"
            >
              <div className="flex items-center gap-5 mb-4">
                <Image
                  src={review.icon}
                  alt={review.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover shadow-lg dark:shadow-[#2A3748]"
                />
                <div>
                  <div className="flex items-center gap-1 text-4xl text-[#FF6F61] mb-2">
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#181D25] dark:text-white">
                    {review.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-[#CAD0D9]">
                {review.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
