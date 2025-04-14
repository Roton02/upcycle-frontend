import { ChevronRight } from "lucide-react";

export default function ProductDetailsSection() {
    return (
        <div>
            <h2 className="text-3xl text-[#181D25] font-semibold mb-8">Product details</h2>

            <div className="mb-8">
                <h3 className="text-[#181D25] font-semibold mb-4">General specs</h3>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Model:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">iPhone 14 Plus</p>
                </div>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Gender:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">Unisex</p>
                </div>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Screen type:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">Super Retina XDR</p>
                </div>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Screen refresh rate:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">120 Hz</p>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-[#181D25] font-semibold mb-4">Display</h3>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Screen diagonal:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">6.1”</p>
                </div>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Display resolution:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">2532x1170</p>
                </div>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Matrix type:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">OLED (Super Retina XDR)</p>
                </div>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Number of touch points:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">10</p>
                </div>

                <div className="flex items-center gap-2 mb-4"> 
                    <h4 className="text-sm text-[#4E5562]">Screen material:</h4>
                    <div className="flex-grow border-b border-dashed border-b-gray-300 pb-2"></div>
                    <p className="text-sm font-medium">Screen material</p>
                </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-[#F55266] font-medium cursor-pointer hover:underline">See all product details <ChevronRight className="w-[16px]"/> </div>
        </div>
    )
}
