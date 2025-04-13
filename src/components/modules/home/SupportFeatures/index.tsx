import { CreditCard, RefreshCcw, Truck } from "lucide-react";

export default function SupportFeatures() {
    return (
        <div className="w-[90%] mx-auto my-16 flex items-center justify-between">

            <div className="flex items-center gap-6">
                <Truck className="w-8 h-8 text-[#181D25] opacity-50"/>
                <div>
                    <h3 className="font-semibold text-[#181D25] opacity-50 mb-1">Free Shipping & Returns</h3>
                    <p className="font-normal text-sm text-[#4E5562] opacity-80">For all orders over $199.00</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <CreditCard className="w-8 h-8 text-[#181D25] opacity-50"/>
                <div>
                    <h3 className="font-semibold text-[#181D25] opacity-50 mb-1">Free Shipping & Returns</h3>
                    <p className="font-normal text-sm text-[#4E5562] opacity-80">For all orders over $199.00</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <RefreshCcw className="w-8 h-8 text-[#181D25] opacity-50"/>
                <div>
                    <h3 className="font-semibold text-[#181D25] opacity-50 mb-1">Free Shipping & Returns</h3>
                    <p className="font-normal text-sm text-[#4E5562] opacity-80">For all orders over $199.00</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <Truck className="w-8 h-8 text-[#181D25] opacity-50"/>
                <div>
                    <h3 className="font-semibold text-[#181D25] opacity-50 mb-1">Free Shipping & Returns</h3>
                    <p className="font-normal text-sm text-[#4E5562] opacity-80">For all orders over $199.00</p>
                </div>
            </div>

        </div>
    )
}
