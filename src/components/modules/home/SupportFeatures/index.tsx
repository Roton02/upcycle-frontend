import { CreditCard, RefreshCcw, Truck } from "lucide-react";

const features = [
  {
    icon: (
      <Truck className="w-8 h-8 text-gray-800 dark:text-gray-200 opacity-60" />
    ),
    title: "Free Shipping & Returns",
    description: "For all orders over $199.00",
  },
  {
    icon: (
      <CreditCard className="w-8 h-8 text-gray-800 dark:text-gray-200 opacity-60" />
    ),
    title: "Secure Payment",
    description: "Your payment info is safe with us",
  },
  {
    icon: (
      <RefreshCcw className="w-8 h-8 text-gray-800 dark:text-gray-200 opacity-60" />
    ),
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: (
      <Truck className="w-8 h-8 text-gray-800 dark:text-gray-200 opacity-60" />
    ),
    title: "Fast Delivery",
    description: "Get your items quickly & safely",
  },
];

export default function SupportFeatures() {
  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-10 bg-gray-200 dark:bg-[#222934] py-14 px-3">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center justify-center gap-4">
          <span> {feature.icon} </span>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 opacity-80 mb-1">
              {feature.title}
            </h3>
            <p className="font-normal text-sm text-gray-600 dark:text-gray-400 opacity-90">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
