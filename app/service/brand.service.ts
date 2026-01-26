import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { readMock } from "../lib/mock";
import { Brand } from "../types/brand";

const BRAND_ENDPOINT = "/brands";

/**
 * Home brands
 */
export async function getHomeBrands(limit?: number): Promise<Brand[]> {
  if (USE_MOCK) {
    const mock = await readMock<{ data: Brand[] }>("brands.json");
    const brands = (mock.data ?? []).filter(Boolean);
    return limit ? brands.slice(0, limit) : brands;
  }

  const url = new URL(`${BASE_API_URL}/brands`);
  if (limit) url.searchParams.append("limit", limit.toString());

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch home brands failed");

  const json = await res.json();

  const brands = Array.isArray(json.data) ? json.data.filter(Boolean) : [];
  return limit ? brands.slice(0, limit) : brands;
}




/**
 * brand detail
 */
export async function getBrandDetail(slug: string): Promise<Brand> {
  if (USE_MOCK) {
    return readMock<Brand>("brand-detail.json");
  }

  const res = await fetch(`${BASE_API_URL}${BRAND_ENDPOINT}/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch brand detail failed");
  return res.json();
}
