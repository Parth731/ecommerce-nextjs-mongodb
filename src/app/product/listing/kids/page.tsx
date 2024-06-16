import CommonListing from "@/components/CommonListing/CommonListing";
import { productByCategory } from "@/services/Product";

export default async function KidsAllProducts() {
  const getAllProducts = await productByCategory("kids");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
