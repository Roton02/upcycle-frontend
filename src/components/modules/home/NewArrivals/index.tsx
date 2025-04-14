import Image from "next/image";
import newArrivalImage from "../../../../../public/newArrivals.png";
import watchImage from "../../../../../public/watch.png";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

export default function NewArrivals() {
  return (
    <div className=" sm:container sm:mx-auto mt-28 px-4">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 ml-1">
        New arrivals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-1">
          <Image src={newArrivalImage} alt="New Arrival" />
        </div>

        <div className="col-span-2 grid md:grid-cols-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}

const ProductCard = () => (
  <div className="flex items-center gap-3">
    <div>
      <Image src={watchImage} alt="New Arrival" />
    </div>

    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Rating style={{ maxWidth: 75 }} value={3} readOnly />
        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
          23
        </span>
      </div>
      <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
        Smart Watch Series 7, White
      </p>
      <p className="text-xl text-gray-900 dark:text-white font-semibold">
        $<span>449.00</span>
      </p>
    </div>
  </div>
);
