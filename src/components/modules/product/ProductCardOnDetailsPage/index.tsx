import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";

type ProductType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  condition: string;
  images: string[];
  status: string;
  userID: {
    _id: string;
    email: string;
    phone: string;
  };
  deliveryOptions: any[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

type Props = {
  product: ProductType;
};

export default function ProductsCardOnDetailsPage({ product }: Props) {
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.svg?height=200&width=200";

  return (
    <div className="relative w-full p-6 bg-white border border-[#E0E5EB] dark:bg-gray-900 dark:border-gray-700 rounded-xl shadow-md transition-all hover:shadow-lg">
      {/* Heart Icon Top Right */}
      <Button
        size="icon"
        className="absolute top-4 right-4 bg-[#EEF1F6] hover:bg-[#d6dae1] text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-sm transition"
      >
        <Heart className="w-5 h-5" />
      </Button>

      {/* Product Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
          <Image
            src={productImage}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center sm:text-left space-y-2">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Rating style={{ maxWidth: 80 }} value={3} readOnly />
            <span>68 reviews</span>
          </div>
          <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
            {product.title}
          </h2>
          <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-sm py-2 rounded-lg transition-all flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to cart
        </Button>
        <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold text-sm py-2 rounded-lg transition-all flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </div>
  );
}
