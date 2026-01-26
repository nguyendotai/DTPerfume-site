// app/category/[slug]/page.tsx
import { getCategoryBySlug } from "@/app/service/category.service";
import { getProductsByCategorySlug } from "@/app/service/product.service";
import CategoryClient from "./CategoryClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug, 100),
  ]);

  if (!category) {
    return <div>Danh mục không tồn tại</div>;
  }

  return (
    <CategoryClient
      category={category}
      products={products}
    />
  );
}
