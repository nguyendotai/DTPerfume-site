import ProductSliderSection from "../common/ProductSliderSection";
import { Product } from "@/app/types/product";

interface Props {
  products: Product[];
}

export default function NewArrivalsSection({ products }: Props) {
  return (
    <ProductSliderSection
      title="New Arrivals"
      products={products}
      viewMoreHref="/new-arrivals"
      sliderId="new-arrivals"
    />
  );
}
