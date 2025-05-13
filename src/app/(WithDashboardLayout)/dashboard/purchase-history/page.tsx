/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser } from "@/services/AuthService";
import { getPurchaseHistory } from "@/services/Products";
import Image from "next/image";

export interface PurchaseItem {
  itemId: any;
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

export interface PurchaseData {
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

export default async function Page() {
  const user = await getCurrentUser();
  const { data }: { data: PurchaseData[] } = await getPurchaseHistory(
    user?._id
  );

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-amber-500 sm:text-4xl">
        Purshase History
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
                  Seller Name
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
              {data.map((purchase) =>
                purchase.items.map((item: PurchaseItem) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 transition hover:bg-blue-50"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={item?.itemId?.images?.[0] || "/fallback-image.jpg"}
                        alt={item?.itemId?.title || "No Title"}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-lg object-cover"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm">{item?.itemId?.title}</td>
                    <td className="px-6 py-4 text-sm">
                      {purchase.sellerID?.username}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      ${data?.[0]?.totalPrice}
                    </td>
                    <td className="px-6 py-4 text-sm capitalize">
                      {purchase.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="">You have not made any purchase yet.</p>
      )}
    </div>
  );
}
