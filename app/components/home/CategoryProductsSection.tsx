import ProductSliderSection from "../common/ProductSliderSection";
import { Category } from "@/app/types/category";
import { Product } from "@/app/types/product";
import MotionSection from "../motion/MotionSection";

export interface CategoryWithProducts {
  category: Category;
  products: Product[];
}

interface Props {
  items: CategoryWithProducts[];
}

export default function CategoryProductsSection({ items }: Props) {
  return (
    <>
      {items.map(({ category, products }, index) => {
        if (!products || products.length === 0) return null;

        return (
          <MotionSection key={category.id} delay={0.1 * index}>
            <section className="py-10 max-w-7xl mx-auto px-4">
              <ProductSliderSection
                title={category.name}
                products={products}
                viewMoreHref={`/category/${category.slug}`}
                sliderId={`category-${category.id}`}
              />
            </section>
          </MotionSection>
        );
      })}
    </>
  );
}
