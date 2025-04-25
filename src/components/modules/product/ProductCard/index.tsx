import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { IListing } from "@/types";

export default function ProductCard({ product }: { product: IListing }) {
  // Format the date to show how long ago the product was listed
  const timeAgo = formatDistanceToNow(new Date(product.createdAt), {
    addSuffix: true,
  });

  // Get the first image or use a placeholder
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.svg?height=300&width=300";

  return (
    <Card className="group overflow-hidden  border-none shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col">
      <div className="relative pt-[80%] overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={productImage || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50 dark:to-transparent transition-opacity duration-300 group-hover:opacity-90" /> */}
        </Link>

        {/* Status badge */}
        {product.status === "available" && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-white font-medium shadow-sm">
            Available
          </Badge>
        )}

        {product.status === "sold" && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600 text-white font-medium shadow-sm">
            Sold
          </Badge>
        )}

        {product.status === "reserved" && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-yellow-600 text-white font-medium shadow-sm">
            Reserved
          </Badge>
        )}

        {/* Condition badge */}
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 text-white font-medium shadow-sm">
          {product.condition}
        </Badge>

        {/* Quick action buttons */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2.5 rounded-full bg-white/95 dark:bg-gray-950/95 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 shadow-md transition-all duration-200 hover:scale-110">
            <Heart className="h-4 w-4" />
          </button>
          <Link
            href={`/products/${product._id}`}
            className="p-2.5 rounded-full bg-white/95 dark:bg-gray-950/95 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 shadow-md transition-all duration-200 hover:scale-110"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button className="p-2.5 rounded-full bg-white/95 dark:bg-gray-950/95 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 shadow-md transition-all duration-200 hover:scale-110">
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>

      <CardContent className="flex-grow p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1.5">
            <Link href={`/products/${product._id}`}>
              <h3 className="font-semibold text-xl tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
              {product.brand} · {product.category}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex justify-between items-center mt-auto bg-gradient-to-t from-gray-100/50 to-transparent dark:from-gray-800/50 dark:to-transparent">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
          {timeAgo}
        </span>
      </CardFooter>
    </Card>
  );
}
