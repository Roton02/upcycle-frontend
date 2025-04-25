import { getSingleProduct } from "@/services/Products";
import ProductDetailsClient from "@/components/modules/product/ProductDetailsClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = (await getSingleProduct(id)) ?? { data: {} };
  return <ProductDetailsClient data={data} />;
}
