import { getSingleProduct } from "@/services/Products";
import ProductDetailsClient from "@/components/modules/product/ProductDetailsClient"; // <-- your client component

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = (await getSingleProduct(params.id)) ?? { data: {} };
  return <ProductDetailsClient data={data} />;
}
