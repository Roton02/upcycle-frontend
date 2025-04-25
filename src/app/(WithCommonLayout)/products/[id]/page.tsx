import { getSingleProduct } from "@/services/Products";
import ProductDetailsClient from "@/components/modules/product/ProductDetailsClient";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data } = (await getSingleProduct(params.id)) ?? { data: {} };
  return <ProductDetailsClient data={data} />;
}
