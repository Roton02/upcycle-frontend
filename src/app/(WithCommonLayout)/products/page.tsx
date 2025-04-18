import ProductCard from "@/components/modules/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IListing } from "@/types";
import { SelectPortal } from "@radix-ui/react-select";
import { X } from "lucide-react";

export default function AllProduct() {
  const data: IListing[] = [
    {
      brand: "Giant",
      category: "Bicycles",
      condition: "Used - Like New",
      createdAt: "2025-04-12T07:46:35.751Z",
      deliveryOptions: [],
      description: "A well-maintained Shimano 105 groupset road bike.",
      images: [
        "https://img.freepik.com/premium-psd/laptop-mock-up-isolated_1310-1458.jpg?w=1380",
        "https://img.freepik.com/free-photo/laptop-wooden-table_53876-20635.jpg?t=st=1744916989~exp=1744920589~hmac=8bb760f13feea4c8462e70fa7f91a607db66239d7d8fb43e9dc1a78683b9f0a6&w=1380",
        "https://img.freepik.com/free-photo/vr-glasses-gaming_23-2151138417.jpg?t=st=1744733427~exp=1744737027~hmac=e23c1f95e936d8befdd5d7782db561d26c96ec391ddd56342904afb0fccd2e8c&w=1380",
      ],
      price: 45000,
      status: "available",
      tags: [],
      title: "Road Bike",
      updatedAt: "2025-04-12T07:46:35.751Z",
      userID: {
        _id: "67fa197300b5b03726eb0348",
        email: "a@a.com",
        phone: "123123",
      },
      _id: "67fa1a5bdbca562f77ca239b",
    },
  ];

  return (
    <div className="w-[90%] mx-auto mt-28 pt-1 pb-10">
      <h2>All product page</h2>

      <div>
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="flex flex-wrap items-center gap-6">
            <h3 className="text-sm text-[#181D25] dark:text-gray-100">
              Found <span className="font-semibold">732</span> items
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <Button className="text-xs text-[#333D4C] bg-[#EEF1F6] px-4 rounded-[6px]">
                <X /> Sale
              </Button>
              <Button className="text-xs text-[#333D4C] bg-[#EEF1F6] px-4 rounded-[6px]">
                <X /> Sale
              </Button>
              <Button className="text-xs text-[#333D4C] bg-[#EEF1F6] px-4 rounded-[6px]">
                <X /> $340 - $1,250
              </Button>
              <Button className="text-xs text-[#333D4C] underline dark:text-gray-200">
                clear all
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2">
            <h3>Sort by:</h3>
            <div className="ml-auto overflow-hidden">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Most popular" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mx-auto w-full">
        {/* sidebar */}
        <div className="w-full md:w-[25%] h-auto space-y-6 mt-10 md:mb-0">
          <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
            <h2 className="text-[#181D25] font-semibold dark:text-gray-100 mb-4">
              Status
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button className="text-[#333D4C] border border-[#E0E5EB] rounded-[6px] dark:text-gray-200">
                % Sale
              </Button>
              <Button className="text-[#333D4C] border border-[#E0E5EB] rounded-[6px] dark:text-gray-200">
                In Stock
              </Button>
              <Button className="text-[#333D4C] border border-[#E0E5EB] rounded-[6px] dark:text-gray-200">
                Same Day Delivery
              </Button>
            </div>
          </div>
          <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
            <h2 className="text-[#181D25] font-semibold dark:text-gray-100 mb-4">
              Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm text-[#333D4C] rounded-[6px] dark:text-gray-300">
                <p>Smartphones</p>
                <p>332</p>
              </div>
              <div className="flex justify-between items-center text-sm text-[#333D4C] rounded-[6px] dark:text-gray-300">
                <p>Wearable Electronics</p>
                <p>231</p>
              </div>
              <div className="flex justify-between items-center text-sm text-[#333D4C] rounded-[6px] dark:text-gray-300">
                <p>Computers & Laptops</p>
                <p>332</p>
              </div>
              <div className="flex justify-between items-center text-sm text-[#333D4C] rounded-[6px] dark:text-gray-300">
                <p>Accessories</p>
                <p>332</p>
              </div>
              <div className="flex justify-between items-center text-sm text-[#333D4C] rounded-[6px] dark:text-gray-300">
                <p>Headphones</p>
                <p>123</p>
              </div>
              <div className="flex justify-between items-center text-sm text-[#333D4C] rounded-[6px] dark:text-gray-300">
                <p>Cameras, Photo & Video</p>
                <p>23</p>
              </div>
            </div>
          </div>
        </div>

        {/* all card content */}
        <div className="w-full md:w-[75%] md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(data[0])
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
