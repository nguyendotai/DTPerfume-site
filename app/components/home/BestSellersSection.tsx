import ProductSliderSection from "../common/ProductSliderSection";
import { Product } from "@/app/types/product";

interface Props {
  products: Product[];
}

export default function BestSellersSection({ products }: Props) {
  return (
    <ProductSliderSection
      title="Bestsellers"
      products={products}
      viewMoreHref="/best-sellers"
      sliderId="best-sellers"
    />
  );
}
