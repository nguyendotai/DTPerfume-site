import { Brand } from "../types/brand";
import { brandsMock } from "../mock/brands.mock"; // đổi đúng path mock của bạn

const BRAND_ENDPOINT = "/brands";

/**
 * Home brands
 */
export const getHomeBrands = async (limit?: number): Promise<Brand[]> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    const brands = brandsMock.filter(Boolean);
    return limit ? brands.slice(0, limit) : brands;
  } else {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${BRAND_ENDPOINT}`);
    if (limit) url.searchParams.append("limit", limit.toString());

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Fetch home brands failed");

    const data = await res.json();
    const brands = Array.isArray(data.data) ? data.data.filter(Boolean) : [];
    return limit ? brands.slice(0, limit) : brands;
  }
};

/**
 * Brand detail
 */
export const getBrandDetail = async (slug: string): Promise<Brand> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return brandsMock.find((b) => b.slug === slug)!;
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${BRAND_ENDPOINT}/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Fetch brand detail failed");
    return res.json();
  }
};
