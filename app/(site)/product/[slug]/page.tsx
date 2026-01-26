import { getProductDetail } from "@/app/service/product.service";
import { Product } from "@/app/types/product";
import ProductDetailClient from "./ProductDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params; // 👈 BẮT BUỘC await
  const product: Product = await getProductDetail(slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl text-gray-600">
        Không tìm thấy sản phẩm
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
