// app/search/page.tsx
import { searchProducts } from "@/app/service/product.service";
import SearchClient from "./SearchClient";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const keyword = q?.trim() || "";

  if (!keyword) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-gray-500">
        Vui lòng nhập từ khóa để tìm kiếm sản phẩm.
      </div>
    );
  }

  const products = await searchProducts(keyword);

  return (
    <SearchClient
      keyword={keyword}
      products={products}
    />
  );
}
