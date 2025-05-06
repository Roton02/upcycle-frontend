
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  getPurchaseHistory,
  getSalesHistory,
  getSingleUserListing,
} from "@/services/Products";
import { useUser } from "@/context/UserContext";
import { IListing } from "@/types";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );
}

export default function Dashboard() {
  const [stats] = useState({
    revenue: { total: 0, growth: 0 },
    orders: { total: 0, growth: 0 },
    products: { total: 0 },
    customers: { total: 0 },
  });
  // const [recentOrders, setRecentOrders] = useState([]);
  // const [topProducts, setTopProducts] = useState([]);
  const [listings, setListings] = useState<IListing[] | undefined>(undefined);
  const [purchase, setPurchase] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  useEffect(() => {
    const allLesting = async () => {
      const { data: dbListing } = await getSingleUserListing(user?._id);
      const { data: purchase } = await getPurchaseHistory(user?._id);
      const { data: sales } = await getSalesHistory(user?._id);

      setListings(dbListing);
      setPurchase(purchase);
      setSales(sales);
      setLoading(false);

    };

    allLesting();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />
  }

  const statCards = [
    {
      title: "Total Listing",
      value: listings?.length,
      change: stats.orders.growth,
      icon: <ShoppingCart size={20} className="text-white" />,
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      title: "Total Purchase",
      value: purchase?.length,
      change: 0,
      icon: <Package size={20} className="text-white" />,
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
    },
    {
      title: "Total Sales",
      value: sales?.length,
      change: 0,
      icon: <Users size={20} className="text-white" />,
      color: "bg-gradient-to-r from-amber-400 to-amber-600",
    },
  ];
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-[12px] shadow overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-black">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-full p-3 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="font-bold text-lg text-black">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-teal-600 hover:text-teal-700 flex items-center"
            >
              View all
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="divide-y">
            {listings?.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No recent orders
              </div>
            ) : (
              listings?.map((listing) => (
                console.log(listing),
                <div key={listing?._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <Link
                        href={`/admin/orders/${listing?._id}`}
                        className="font-medium text-gray-900 hover:text-teal-600"
                      >
                        Order #{listing?._id}
                      </Link>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {new Date(listing?.createdAt).toLocaleDateString()}
                      </div>
                      {/* <div className="text-sm text-gray-600 mt-1">
                        {listing?.customerName}
                      </div> */}
                    </div>

                    <div className="text-right">
                      <div className="font-medium">
                        ${listing?.price?.toFixed(2)}
                      </div>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                            ${
                              listing.status === "reserved"
                                ? "bg-yellow-100 text-yellow-800"
                                : listing.status === "sold"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {listing.status.charAt(0).toUpperCase() +
                            listing.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
