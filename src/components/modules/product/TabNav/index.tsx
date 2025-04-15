"use client";

export default function TabNav() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex gap-6 sticky top-0 z-10 dark:text-white">
      <button
        onClick={() => handleScroll("general-info")}
        className="font-medium hover:text-blue-600"
      >
        General Info
      </button>
      <button
        onClick={() => handleScroll("product-details")}
        className="font-medium hover:text-blue-600"
      >
        Product Details
      </button>
      <button
        onClick={() => handleScroll("review")}
        className="font-medium hover:text-blue-600"
      >
        Reviews
      </button>
    </div>
  );
}
