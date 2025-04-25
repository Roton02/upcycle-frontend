
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
  const [stats, setStats] = useState({
    revenue: { total: 0, growth: 0 },
    orders: { total: 0, growth: 0 },
    products: { total: 0 },
    customers: { total: 0 },
  });
  // const [recentOrders, setRecentOrders] = useState([]);
  // const [topProducts, setTopProducts] = useState([]);
  const [listings, setListings] = useState<IListing | undefined>(undefined);
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

      console.log(user, dbListing, purchase?.length, sales?.length);
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

              {/* <div className="flex items-center mt-4">
                {stat.change > 0 ? (
                  <>
                    <ArrowUpRight size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 text-sm font-medium">
                      {stat.change.toFixed(1)}%
                    </span>
                  </>
                ) : stat.change < 0 ? (
                  <>
                    <ArrowDownRight size={16} className="text-red-500 mr-1" />
                    <span className="text-red-500 text-sm font-medium">
                      {Math.abs(stat.change).toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 text-sm">No change</span>
                )}
                <span className="text-gray-500 text-sm ml-1">
                  vs last month
                </span>
              </div> */}
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
                <div key={listing?._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <Link
                        href={`/admin/orders/${listing?.id}`}
                        className="font-medium text-gray-900 hover:text-teal-600"
                      >
                        Order #{listing?._id}
                      </Link>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {new Date(listing?.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {listing?.customerName}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-medium">
                        ${listing?.price?.toFixed(2)}
                      </div>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                            ${
                              listing.status === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : listing.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
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

        {/* Quick Stats */}
        {/* <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-lg">Quick Stats</h2>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              //Popular Products
              <div>
                <h3 className='font-medium text-gray-600 mb-3'>
                  Popular Products
                </h3>
                <ul className='space-y-2'>
                  {topProducts.map((product) => (
                    <li
                      key={product.id}
                      className='flex items-center justify-between'
                    >
                      <Link
                        href={`/admin/products/${product.id}`}
                        className='text-sm text-gray-900 hover:text-teal-600 truncate flex-1'
                      >
                        {product.name}
                      </Link>
                      <span className='text-sm font-medium ml-2'>
                        {product.totalSold} sold
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              //Quick Actions
              <div>
                <h3 className="font-medium text-gray-600 mb-3">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/admin/products/add"
                    className="flex justify-center items-center py-2 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors text-sm font-medium"
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/admin/orders"
                    className="flex justify-center items-center py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    View Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
