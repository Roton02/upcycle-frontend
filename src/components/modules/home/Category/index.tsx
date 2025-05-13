import { ChevronRight } from "lucide-react";
import Link from "next/link";

import routers from "../../../../../public/category/image 11.png";
import Electronics from "../../../../../public/category/image 12.png";
import mobile from "../../../../../public/category/image 13.png";
import accessories from "../../../../../public/category/image 14.png";
import computer from "../../../../../public/category/image 15.png";
import cloth from "../../../../../public/category/image 16.png";
import Image from "next/image";

const categories = [
  {
    name: "Routers",
    icon: routers,
  },
  {
    name: "Electronics",
    icon: Electronics,
  },
  {
    name: "Mobile",
    icon: mobile,
  },
  {
    name: "Accessories",
    icon: accessories,
  },
  {
    name: "Computer",
    icon: computer,
  },
  {
    name: "Lifestyle",
    icon: cloth,
  },
];

export default function Category() {
  return (
    <div className="bg-[#F5F7FA] dark:bg-[#222934] py-10 px-4 md:px-8 my-10">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 place-items-center">
          {categories.map((category, index) => (
            <div key={index} className="flex gap-4">
              <div className="bg-white/60 px-8 text-center rounded-[12px] shadow-md dark:bg-[#2B3445] dark:shadow-[#2B3445]">
                <div>
                  <Image
                    src={category.icon}
                    alt={category.name}
                    className="w-[100px] h-[100px] object-contain mb-4"
                  />
                </div>
                <div>
                  <h2 className="text-xl text-[#181D25] font-semibold mb-3 dark:text-white/100">
                    {category.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
