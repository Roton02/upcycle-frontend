"use client";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "./style.css";

const DEFAULT_IMAGE =
  "https://img.freepik.com/premium-vector/error-image-icon_194117-662.jpg?w=826";

type Props = {
  images: string[];
  totalSliderImage: number;
};

// Utility to ensure a minimum length array
const fillToLength = (
  arr: string[],
  targetLength: number,
  fillValue: string
): string[] => {
  const newArr = [...arr];
  while (newArr.length < targetLength) {
    newArr.push(fillValue);
  }
  return newArr;
};

export default function ProductSlider({ images, totalSliderImage }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = DEFAULT_IMAGE;
  };

  const displayImages = fillToLength(images, totalSliderImage, DEFAULT_IMAGE);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 h-[400px] mb-3"
      >
        {displayImages.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <div className="w-2/3 h-full mx-auto rounded-xl overflow-hidden relative">
              <Image
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                fill
                className="object-contain"
                onError={handleImageError}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Swiper slide  */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={4}
        slidesPerView={totalSliderImage}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {displayImages.map((imgSrc, index) => (
          <SwiperSlide
            key={index}
            className="opacity-50 blur-[1px] transition-all duration-300 swiper-slide-thumb"
          >
            <div className="relative w-[80px] h-[80px] overflow-hidden rounded">
              <Image
                src={imgSrc}
                alt={`Thumbnail ${index + 1}`}
                fill
                onError={handleImageError}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
