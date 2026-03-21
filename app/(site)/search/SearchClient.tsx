"use client";

import { useMemo, useState } from "react";
import FilterSidebar from "../category/[slug]/FilterSidebar";
import ProductGrid from "../category/[slug]/ProductGrid";
import SortBar from "../category/[slug]/SortBar";
import { Product } from "@/app/types/product";

interface Props {
  keyword: string;
  products: Product[];
}

export default function SearchClient({ keyword, products }: Props) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("best-selling");

  const getProductPrice = (product: Product): number => {
    if (!product.variants || product.variants.length === 0) return 0;

    const prices = product.variants.map((v) => {
      const price = v.discount_price || v.price || "0";
      return Number(price);
    });

    return Math.min(...prices);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.brand?.name || "")
      );
    }

    if (selectedPrices.length > 0) {
      result = result.filter((p) => {
        const price = getProductPrice(p);

        return selectedPrices.some((range) => {
          if (range === "Dưới 1 triệu") return price < 1_000_000;
          if (range === "1 – 2 triệu") return price >= 1_000_000 && price < 2_000_000;
          if (range === "2 – 3 triệu") return price >= 2_000_000 && price < 3_000_000;
          if (range === "3 – 5 triệu") return price >= 3_000_000 && price < 5_000_000;
          if (range === "Trên 5 triệu") return price >= 5_000_000;
          return false;
        });
      });
    }

    if (sort === "price-asc") {
      result.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    } else if (sort === "price-desc") {
      result.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    } else if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      );
    }

    return result;
  }, [products, selectedBrands, selectedPrices, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex justify-between">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">
            Có {filteredAndSortedProducts.length} kết quả
          </h1>
        </div>

        <SortBar sort={sort} onSortChange={setSort} />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-3">
          <FilterSidebar
            selectedBrands={selectedBrands}
            selectedPrices={selectedPrices}
            onBrandChange={setSelectedBrands}
            onPriceChange={setSelectedPrices}
          />
        </aside>

        <section className="col-span-12 lg:col-span-9">
          <ProductGrid products={filteredAndSortedProducts} />
        </section>
      </div>
    </div>
  );
}
