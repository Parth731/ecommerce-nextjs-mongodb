import CommonListing from "@/components/CommonListing/CommonListing";
import { getAllAdminProducts } from "@/services/Product";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts();
  console.log(allAdminProducts);

  return <CommonListing data={allAdminProducts && allAdminProducts.data} />;
  // return <></>;
}
