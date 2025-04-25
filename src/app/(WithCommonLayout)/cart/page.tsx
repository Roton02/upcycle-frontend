"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  price: number;
  images?: string | string[];
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Load cart items from localStorage on first render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  // Remove item from cart
  const handleRemove = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1f2937] dark:to-[#111827] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white text-center flex items-center justify-center gap-2">
          <ShoppingCart className="w-7 h-7" /> Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Your cart is currently empty.
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-5 rounded-2xl shadow-lg bg-white/30 backdrop-blur-md dark:bg-white/10 border border-gray-200 dark:border-gray-700 transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        item?.images?.[0] || "https://via.placeholder.com/80"
                      }
                      alt={item?.title || "Product image"}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-xl border"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* Summary section */}
            <div className="mt-12 flex flex-col items-end">
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                <div className="flex justify-between text-lg font-semibold mb-4 text-gray-700 dark:text-white">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <Link href="/shop">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/checkout">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
