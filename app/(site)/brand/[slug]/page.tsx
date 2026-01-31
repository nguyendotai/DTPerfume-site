import { getBrandDetail } from "@/app/service/brand.service";
import { getProductsByBrandSlug } from "@/app/service/product.service";
import BrandClient from "./BrandClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;

  const [brand, products] = await Promise.all([
    getBrandDetail(slug),
    getProductsByBrandSlug(slug, 100),
  ]);

  if (!brand) {
    return <div>Thương hiệu không tồn tại</div>;
  }

  return (
    <BrandClient
      brand={brand}
      products={products}
    />
  );
}
