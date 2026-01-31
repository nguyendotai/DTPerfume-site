"use client";

import FilterSidebar from "@/app/(site)/category/[slug]/FilterSidebar";
import ProductGrid from "@/app/(site)/category/[slug]/ProductGrid";
import SortBar from "@/app/(site)/category/[slug]/SortBar";
import { Product } from "@/app/types/product";
import { Brand } from "@/app/types/brand";

interface Props {
  brand: Brand;
  products: Product[];
}

export default function BrandClient({ brand, products }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex justify-between">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif">
            {brand.name}
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            {products.length} sản phẩm
          </p>
        </div>

        <SortBar />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-3">
          <FilterSidebar />
        </aside>

        <section className="col-span-12 lg:col-span-9">
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
