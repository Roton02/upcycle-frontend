import React, { Suspense } from "react";
import ProductListWrapper from "./ProductListWrapper ";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductListWrapper />
      </Suspense>
    </div>
  );
}
