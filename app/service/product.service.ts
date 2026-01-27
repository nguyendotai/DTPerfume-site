import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { readMockServer } from "../lib/mock.server";
import { readMockClient } from "../lib/mock.client";
import { Product } from "../types/product";

const PRODUCT_ENDPOINT = "/products";

/**
 * Home products
 */
export async function getHomeProducts(): Promise<Product[]> {
  if (USE_MOCK) {
    const mock = await readMockClient<{ data: Product[] }>("products.json");
    return (mock.data ?? []).filter(Boolean);
  }

  const res = await fetch(`${BASE_API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch home products failed");

  const json = await res.json();

  return Array.isArray(json.data)
    ? json.data.filter(Boolean)
    : [];
}



/**
 * Product detail
 */
export const getProductDetail = async (slug: string) => {
  const res = await fetch(`${BASE_API_URL}/products/${slug}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null; // ✅
  }

  if (!res.ok) {
    throw new Error("Fetch product detail failed");
  }

  const json = await res.json();
  console.log("API raw response:", json); // 👈 bắt buộc log lần đầu

  return json?.data ?? null;
};


/**
 * New Arrivals
 */
export async function getNewArrivals(): Promise<Product[]> {
  if (USE_MOCK) {
    const mock = await readMockClient<{ data: Product[] }>("products.json");
    return (mock.data ?? []).filter(Boolean);
  }

  const res = await fetch(`${BASE_API_URL}${PRODUCT_ENDPOINT}/new-arrivals`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch new arrivals failed");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * Best Sellers
 */
export async function getBestSellers(): Promise<Product[]> {
  if (USE_MOCK) {
    const mock = await readMockClient<{ data: Product[] }>("products.json");
    return (mock.data ?? []).filter(Boolean);
  }

  const res = await fetch(`${BASE_API_URL}${PRODUCT_ENDPOINT}/bestsellers`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch best sellers failed");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * Products by category slug
 */
export async function getProductsByCategorySlug(
  slug: string,
  limit = 10
): Promise<Product[]> {
  if (USE_MOCK) {
    const mock = await readMockClient<{ data: Product[] }>("products.json");
    return (mock.data ?? []).filter(
      (p) => p?.category?.slug === slug
    ).slice(0, limit);
  }

  const url = new URL(
    `${BASE_API_URL}${PRODUCT_ENDPOINT}/category/${slug}`
  );
  url.searchParams.append("limit", limit.toString());

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Fetch products by category failed");
  }

  const json = await res.json();

  return Array.isArray(json.data)
    ? json.data.filter(Boolean)
    : [];
}

/**
 * Search products by keyword
 */
export async function searchProducts(
  keyword: string,
  limit = 6,
  page = 1,
): Promise<Product[]> {
  if (!keyword.trim()) return [];

  if (USE_MOCK) {
    const mock = await readMockClient<{ data: Product[] }>("products.json");
    return (mock.data ?? [])
      .filter((p) =>
        p?.name?.toLowerCase().includes(keyword.toLowerCase()),
      )
      .slice(0, limit);
  }

  const url = new URL(`${BASE_API_URL}${PRODUCT_ENDPOINT}/search`);
  url.searchParams.append("keyword", keyword);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("page", page.toString());

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Search products failed");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}
