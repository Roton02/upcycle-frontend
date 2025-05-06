import { getSingleProduct } from "@/services/Products";
import ProductDetailsClient from "@/components/modules/product/ProductDetailsClient"; // <-- your client component

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const { data } = (await getSingleProduct(id)) ?? { data: {} };
  return <ProductDetailsClient data={data} />;
}
