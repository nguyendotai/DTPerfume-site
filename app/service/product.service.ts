import { Product } from "../types/product";
import { productsMock } from "../mock/productMock"; // bạn đổi đúng path mock

const PRODUCT_ENDPOINT = "/products";

/**
 * Home products
 */
export const getHomeProducts = async (): Promise<Product[]> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return productsMock.filter(Boolean);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${PRODUCT_ENDPOINT}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Fetch home products failed");

    const data = await res.json();
    return Array.isArray(data.data) ? data.data.filter(Boolean) : [];
  }
};

/**
 * Product detail
 */
export const getProductDetail = async (
  slug: string,
): Promise<Product | null> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return productsMock.find((p) => p.slug === slug) || null;
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${PRODUCT_ENDPOINT}/${slug}`,
      { cache: "no-store" },
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Fetch product detail failed");

    const data = await res.json();
    return data?.data ?? null;
  }
};

/**
 * New Arrivals
 */
export const getNewArrivals = async (): Promise<Product[]> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return productsMock.filter(Boolean);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${PRODUCT_ENDPOINT}/new-arrivals`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Fetch new arrivals failed");

    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  }
};

/**
 * Best Sellers
 */
export const getBestSellers = async (): Promise<Product[]> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return productsMock.filter(Boolean);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${PRODUCT_ENDPOINT}/bestsellers`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Fetch best sellers failed");

    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  }
};

/**
 * Products by category slug
 */
export const getProductsByCategorySlug = async (
  slug: string,
  limit = 10,
): Promise<Product[]> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return productsMock
      .filter((p) => p?.category?.slug === slug)
      .slice(0, limit);
  } else {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}${PRODUCT_ENDPOINT}/category/${slug}`,
    );
    url.searchParams.append("limit", limit.toString());

    const res = await fetch(url.toString(), { cache: "no-store" });

    if (!res.ok) throw new Error("Fetch products by category failed");

    const data = await res.json();
    return Array.isArray(data.data) ? data.data.filter(Boolean) : [];
  }
};

/**
 * Search products by keyword
 */
export const searchProducts = async (
  keyword: string,
  limit = 6,
  page = 1,
): Promise<Product[]> => {
  if (!keyword.trim()) return [];

  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return productsMock
      .filter((p) => p?.name?.toLowerCase().includes(keyword.toLowerCase()))
      .slice(0, limit);
  } else {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}${PRODUCT_ENDPOINT}/search`,
    );
    url.searchParams.append("keyword", keyword);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    const res = await fetch(url.toString(), { cache: "no-store" });

    if (!res.ok) throw new Error("Search products failed");

    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  }
};

/**
 * Products by brand slug
 */
export const getProductsByBrandSlug = async (
  slug: string,
  limit = 12,
  page = 1,
): Promise<Product[]> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return productsMock.filter((p) => p?.brand?.slug === slug).slice(0, limit);
  } else {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}${PRODUCT_ENDPOINT}/brand/${slug}`,
    );
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString());

    const res = await fetch(url.toString(), { cache: "no-store" });

    if (!res.ok) throw new Error("Fetch products by brand failed");

    const data = await res.json();
    return Array.isArray(data.data) ? data.data.filter(Boolean) : [];
  }
};
