import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/Product";

export default async function ProductDetails({ params }: any) {
  const productDetailsData = await productById(params.details);

  console.log(productDetailsData, "productDetailsData");

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}
