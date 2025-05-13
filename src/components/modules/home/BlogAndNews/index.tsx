import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import blog1 from "../../../../../public/blog1.jpg";
import blog2 from "../../../../../public/blog2.jpg";
import blog3 from "../../../../../public/blog3.jpg";

export default function BlogAndNews() {
  return (
    <div className="w-full py-10 px-4 md:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Blog and news
          </h2>
          <div className="">
            <Link
              href="/products"
              className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="md:flex gap-4">
          <div>
            <Image
              src={blog1}
              alt="Blog and news"
              width={600}
              height={300}
              className="rounded h-[400px] w-full md:w-[600px] object-cover"
            />
            <div>
              <p className="text-[#4E5562] font-medium mt-6 mb-3 dark:text-[#CAD0D9]">
                Interior Design
              </p>
              <h2 className="text-xl text-[#181D25] font-semibold mb-3 dark:text-white/100">
                Decorate your home for the festive season in 3 easy steps
              </h2>
              <div className="flex items-center gap-2 text-[#6C727F] text-xs">
                <p>By Ava Johnson</p>
                <div className="w-0.5 h-4 bg-[#E0E5EB]"></div>
                <p>September 11, 2024</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <div className="md:w-[300px]">
              <Image
                src={blog2}
                alt="Blog and news"
                width={300}
                height={300}
                className="rounded md:w-[300px] h-[230px] object-cover"
              />
              <div className="md:w-[300px]">
                <p className="text-[#4E5562] font-medium mt-6 mb-3 dark:text-[#CAD0D9]">
                  Interior Design
                </p>
                <h2 className="text-xl text-[#181D25] font-semibold mb-3 dark:text-white/100">
                  Decorate your home for the festive season in 3 easy steps
                </h2>
                <div className="flex items-center gap-2 text-[#6C727F] text-xs">
                  <p>By Ava Johnson</p>
                  <div className="w-0.5 h-4 bg-[#E0E5EB]"></div>
                  <p>September 11, 2024</p>
                </div>
              </div>
            </div>
            <div className="md:w-[300px]">
              <Image
                src={blog3}
                alt="Blog and news"
                width={300}
                height={300}
                className="rounded w-full md:w-[300px] h-[230px] object-cover"
              />
              <div className="md:w-[300px]">
                <p className="text-[#4E5562] font-medium mt-6 mb-3 dark:text-[#CAD0D9]">
                  Interior Design
                </p>
                <h2 className="text-xl text-[#181D25] font-semibold mb-3 dark:text-white/100">
                  Decorate your home for the festive season in 3 easy steps
                </h2>
                <div className="flex items-center gap-2 text-[#6C727F] text-xs">
                  <p>By Ava Johnson</p>
                  <div className="w-0.5 h-4 bg-[#E0E5EB]"></div>
                  <p>September 11, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
