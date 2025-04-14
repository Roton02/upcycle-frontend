import Image from "next/image";
import cardImage from '../../../../../public/iphone-14-plus.png'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw, ShoppingCart } from "lucide-react";

export default function ProductsCardOnDetailsPage() {
    return (
        <div className="p-6 border border-[#E0E5EB] rounded-[8px]">
            <div className="flex items-center gap-4 mb-7">
                <div>
                    <Image
                        src={cardImage}
                        alt="product image"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs text-[#9CA3AF] font-normal">
                        <Rating
                            style={{ maxWidth: 80 }}
                            value={3}
                            readOnly
                        />
                        68
                    </div>
                    <h2 className="text-sm text-[#181D25] font-medium">Apple iPhone 14 Plus 128GB Blue</h2>
                    <p className="text-xl text-[#181D25] font-semibold">$940.00</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button className="w-full text-sm text-white font-medium bg-[#F55266] hover:bg-[#cd4454] rounded-[8px]">
                    <ShoppingCart />
                    Add to cart
                </Button>
                <Button className="text-sm text--[#333D4C] font-medium bg-[#EEF1F6] hover:bg-[#c9ccd0] rounded-[8px]">
                    <Heart />
                </Button>
                <Button className="text-sm text--[#333D4C] font-medium bg-[#EEF1F6] hover:bg-[#c9ccd0] rounded-[8px]">
                    <RefreshCw />
                </Button>
            </div>
        </div>
    )
}
