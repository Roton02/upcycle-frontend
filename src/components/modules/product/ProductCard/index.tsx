import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IListing } from "@/types";
import Image from "next/image";
import productImage from "../../../../../public/iphone-14-plus.png";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: IListing }) {
  console.log(product.images[0]);
  return (
    <div>
      <Card className="rounded-[8px]">
        <div className="px-3 relative">
          <Image
            src={product.images[0]}
            width={300}
            height={300}
            alt="product image"
            className="w-[400px] h-[300px] object-contain mx-auto"
          />

          {
            //    if offer price funcationality apply replace price with offer offerprice
            product?.price && (
              <p className="bg-[#F03D3D] rounded text-xs font-medium absolute top-4 left-4 px-3 py-1 text-white">
                -20%
              </p>
            )
          }
        </div>

        <div className="px-4">
          <CardTitle className="text-sm text-[#181D25] font-medium mt-2 mb-3 dark:text-gray-100">
            {product?.title}
            <div className="flex items-center justify-between">
              {/* if offer price apply there need some modification */}
              {!product.price ? (
                <p className="text-xl text-[#181D25] font-semibold dark:text-gray-100">
                  ${product.price}
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-xl text-[#181D25] font-semibold dark:text-gray-100">
                    ${product.price}
                  </p>
                  <p className="text-sm text-[#9CA3AF] line-through">
                    ${product.price}
                  </p>
                </div>
              )}

              <ShoppingCart className="w-8 h-8 text-[#333D4C] bg-[#EEF1F6] p-2 rounded" />
            </div>
          </CardTitle>
        </div>
      </Card>
    </div>
  );
}
