/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser } from "@/services/AuthService";
import { getSalesHistory } from "@/services/Products";
import Image from "next/image";

export interface PurchaseItem {
  _id: string;
  title: string;
  brand: string;
  category: string;
  condition: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  price: number;
  status: string;
  userID: string;
  images: string[];
  deliveryOptions: string[];
  tags: string[];
}

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SalesData {
  _id: string;
  buyerID: UserInfo;
  sellerID: UserInfo;
  items: PurchaseItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Demo data (in a real app, this would likely come from an API)
// const demoData: Listing[] = [
//   {
//     id: 1,
//     title: "Vintage Leather Jacket",
//     category: "Clothing",
//     price: 120.0,
//     "Buyer Name": "abcd",
//     condition: "Used - Like New",
//     Status: "in-progress",
//     images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3"],
//   },
//   {
//     id: 2,
//     title: "Gaming Laptop",
//     category: "Electronics",
//     price: 850.0,
//     "Buyer Name": "abcd",
//     condition: "Used - Good",
//     Status: "Delivered",
//     images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
//   },
//   {
//     id: 3,
//     title: "Mountain Bike",
//     category: "Sports",
//     price: 300.0,
//     "Buyer Name": "abcd",
//     condition: "New",
//     Status: "in-progress",
//     images: ["https://images.unsplash.com/photo-1532298229144-0ec0c57515c7"],
//   },
// ];

export default async function Page() {
  const user = await getCurrentUser();
  const { data }: { data: SalesData[] } = await getSalesHistory(user?._id);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-amber-500 sm:text-4xl">
        Sales History
      </h1>

      {data?.length ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full rounded-lg bg-white text-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Images
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Buyer Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((sales) =>
                sales.items.map(
                  (item: any) => (
                    console.log("item => ", item?.itemId?.images?.[0]),
                    (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 transition hover:bg-blue-50"
                      >
                        <td className="px-6 py-4">
                          <Image
                            src={
                              item?.itemId?.images?.[0] || "/fallback-image.jpg"
                            }
                            alt={item?.itemId?.title || "No Title"}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-lg object-cover"
                            loading="lazy"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {item?.itemId?.title}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {sales.sellerID?.username}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          ${data?.[0]?.totalPrice}
                        </td>
                        <td className="px-6 py-4 text-sm capitalize">
                          {sales.status}
                        </td>
                      </tr>
                    )
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p className="">You have not made any sales yet.</p>
        </div>
      )}
    </div>
  );
}
