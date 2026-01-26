"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getFavoriteThunk } from "@/app/store/thunks/favorite.thunks";
import ProductCard from "@/app/components/ui/ProductCard";
import { Product } from "@/app/types/product";

export default function FavoritePage() {
  const dispatch = useDispatch<any>();
  const { items, loading } = useSelector((state: RootState) => state.favorite);

  useEffect(() => {
    dispatch(getFavoriteThunk());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-10">Đang tải danh sách yêu thích...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Yêu Thích</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có sản phẩm yêu thích.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {items.map((item) => {
            const variant = item.variant;
            const product = variant.product;

            if (!product) return null;

            const productData: Product = {
              ...product,
              variants: [variant],
              images: product.images ?? variant.variantImages ?? [],
            };

            return (
              <ProductCard
                key={item.id}
                product={productData}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
