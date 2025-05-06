"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import image from "../../../../../public/image.png";
import Link from "next/link";
// Sample banner data - in a real app, this would come from a CMS or API
const banners = [
  {
    id: 1,
    title: "Used. Tested. Trusted.",
    subtitle: "Inspected for quality, ready for a new home.",
    image: image,
    alt: "Model wearing fall collection outfit",
    cta: "Shop now",
  },
  {
    id: 2,
    title: "Smart Deals Start Here",
    subtitle: "A high-quality second-hand product you can trust.",
    image: image,
    alt: "Model wearing winter collection outfit",
    cta: "Discover more",
  },
  {
    id: 3,
    title: "One's Past, Your Future",
    subtitle: "Own it today. Save big. Live sustainably.",
    image: image,
    alt: "Model wearing holiday collection outfit",
    cta: "View collection",
  },
];

export default function Banner() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Initialize Embla Carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  // Update selected index when slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Get scroll snap positions for dots navigation
  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  // Scroll to slide when dot is clicked
  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Set up event listeners
  useEffect(() => {
    if (!emblaApi) return;

    onInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="relative mt-28 w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => (
            <div key={banner.id} className="flex-[0_0_100%] min-w-0">
              <div className="container mx-auto px-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:h-[400px] lg:h-[400px]">
                  {/* Text Content */}
                  <div className="z-10 md:w-1/2 space-y-6 py-8 md:py-0">
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base tracking-[0.1em] font-semibold uppercase">
                      {banner.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-[0.09em]">
                      {banner.title}
                    </h1>
                    <Button
                      variant="outline"
                      className="group border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors rounded-md px-6"
                    >
                      <Link href={"/products"} className="flex items-center">
                        {banner.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="md:absolute md:right-0 md:top-0 md:bottom-0 md:w-3/5 h-[400px] md:h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={banner.image || "/placeholder.svg"}
                        alt={banner.alt}
                        fill
                        priority={index === 0}
                        className="object-contain object-right-bottom"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              selectedIndex === index
                ? "bg-gray-900 dark:bg-white w-3"
                : "bg-gray-400 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-300"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
