import CommonListing from "@/components/CommonListing/CommonListing";
import { productByCategory } from "@/services/Product";

export default async function MenAllProducts() {
  const getAllProducts = await productByCategory("men");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
