/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { createOrder } from "@/services/Products";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  images: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userID: any;
}

interface FormData {
  address: string;
}

interface UserData {
  name: string;
  email: string;
}

export default function CheckoutPage() {
  const { user, setIsLoading } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [formData, setFormData] = useState<FormData>({ address: "" });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  console.log(cartItems);

  // Load cart and user data from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedUser = localStorage.getItem("userData");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Invalid cart data:", e);
      }
    }

    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user data:", e);
      }
    }
  }, []);

  const calculateTotal = () => {
    return (
      cartItems.length > 0 &&
      cartItems.reduce((total, item) => total + item.price * 1, 0).toFixed(2)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: "cod" | "card") => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      buyerID: user?._id,
      sellerID: cartItems[0]?.userID?._id,
      address: formData.address,
      items: cartItems?.map((item) => ({
        itemId: item._id,
      })),
      totalPrice: Number(calculateTotal()),
      ...(paymentMethod === "card" && { status: "completed" }),
    };
    console.log(orderData);
    try {
      const res = await createOrder(orderData);

      if (res.success) {
        toast.success("Order placed successfully!");
        localStorage.removeItem("cart"); // Clear cart from localStorage
        window.location.href = "/dashboard/purchase-history"; // Redirect to dashboard
      } else {
        toast.error(res.message || "Failed to place order.");
      }
    } catch (err) {
      toast.error("Something went wrong while placing the order.");
    }
  };
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Your cart is empty.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-16 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold  mb-12 text-center tracking-wide">
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Section - Order Summary & Shipping */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <div className=" shadow-2xl rounded-2xl p-8 transition-all duration-500 hover:shadow-3xl">
              <h2 className="text-3xl font-semibold  mb-8">Order Summary</h2>

              {cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b border-blue-600 py-6 hover:bg-blue-700/50 transition duration-300 rounded-lg px-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={item?.images[0]}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="rounded-xl mr-6 object-cover border border-blue-600"
                    />
                    <div>
                      <h3 className="text-xl font-medium ">{item?.title}</h3>
                      <p className="text-sm ">Quantity: 1</p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-gold-300">
                    ${(item.price * 1).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between mt-8 text-2xl font-bold ">
                <span>Total</span>
                <span className="text-gold-300">${calculateTotal()}</span>
              </div>
            </div>

            {/* Shipping Information */}
            <div className=" shadow-2xl rounded-2xl p-8">
              <h2 className="text-3xl font-semibold  mb-8">
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium ">
                    Full Name
                  </label>
                  <p className="mt-2 text-lg  font-medium">{user?.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium ">Email</label>
                  <p className="mt-2 text-lg  font-medium">{user?.email}</p>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium "
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full rounded-xl bg-gray-300 p-2 shadow-sm focus:border-gold-300 focus:ring-gold-300 transition duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-blue-900 py-4 rounded-xl hover:from-gold-500 hover:to-gold-600 transition duration-300 shadow-lg transform hover:scale-105"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Payment Information */}
          <div className=" shadow-2xl rounded-2xl p-8">
            <h2 className="text-3xl font-semibold  mb-8">
              Payment Information
            </h2>
            <div className="space-y-8">
              {/* Payment Method Selection */}
              <div>
                <h3 className="text-sm font-medium  mb-4">Payment Method</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => handlePaymentMethodChange("cod")}
                      className="h-5 w-5 focus:ring-gold-300 border-blue-600"
                    />
                    <label
                      htmlFor="cod"
                      className="ml-4 block text-sm font-medium "
                    >
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => handlePaymentMethodChange("card")}
                      className="h-5 w-5 focus:ring-gold-300 border-blue-600 p-2"
                    />
                    <label
                      htmlFor="card"
                      className="ml-4 block text-sm font-medium "
                    >
                      Card Payment
                    </label>
                  </div>
                </div>
              </div>

              {/* Card Payment Fields */}
              {paymentMethod === "card" && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium "
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="**** **** **** ****"
                      className="mt-2 block w-full rounded-xl p-2  border-blue-600 shadow-sm focus:border-gold-300 focus:ring-gold-300 transition duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium "
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className="mt-2 block w-full rounded-xl p-2  border-blue-600 shadow-sm focus:border-gold-300 focus:ring-gold-300 transition duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium "
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder="***"
                        className="mt-2 block w-full rounded-xl p-2  border-blue-600 shadow-sm focus:border-gold-300 focus:ring-gold-300 transition duration-300"
                      />
                    </div>
                  </div>
                </div>
              )}
              <p className="text-sm  italic">
                {paymentMethod === "cod"
                  ? "Pay upon receiving your order."
                  : "Secure payment processing"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
