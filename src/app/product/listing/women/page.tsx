import CommonListing from "@/components/CommonListing/CommonListing";
import { productByCategory } from "@/services/Product";

export default async function WomenAllProducts() {
  const getAllProducts = await productByCategory("women");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
