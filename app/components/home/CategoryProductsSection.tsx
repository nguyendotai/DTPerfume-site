import ProductSliderSection from "../common/ProductSliderSection";
import { Category } from "@/app/types/category";
import { Product } from "@/app/types/product";

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
      {items.map(({ category, products }) => {
        if (!products || products.length === 0) return null;

        return (
          <section
            key={category.id}
            className="py-10 max-w-7xl mx-auto px-4"
          >
            <ProductSliderSection
              title={category.name}
              products={products}
              viewMoreHref={`/category/${category.slug}`}
              sliderId={`category-${category.id}`}
            />
          </section>
        );
      })}
    </>
  );
}
