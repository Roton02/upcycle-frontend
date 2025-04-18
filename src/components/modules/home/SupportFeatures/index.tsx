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
    <div className=" sm:container sm:mx-auto mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  px-4">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start gap-4">
          {feature.icon}
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
