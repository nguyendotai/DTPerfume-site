import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { Category } from "../types/category";
import { categoriesMock } from "../mock/categories.mock";// đổi đúng path mock của bạn

const CATEGORY_ENDPOINT = "/categories";

/**
 * Home categories (isMain = true)
 */
export async function getHomeCategories(limit?: number): Promise<Category[]> {
  if (USE_MOCK) {
    const categories = categoriesMock
      .filter((c) => c?.isMain === true)
      .filter(Boolean);

    return limit ? categories.slice(0, limit) : categories;
  }

  const url = new URL(`${BASE_API_URL}${CATEGORY_ENDPOINT}`);
  url.searchParams.append("isMain", "true");
  if (limit) url.searchParams.append("limit", limit.toString());

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch home categories failed");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data.filter(Boolean) : [];
}

/**
 * Non-main categories (isMain = false)
 */
export async function getNonMainCategories(): Promise<Category[]> {
  if (USE_MOCK) {
    return categoriesMock
      .filter((c) => c?.isMain === false)
      .filter(Boolean);
  }

  const url = new URL(`${BASE_API_URL}${CATEGORY_ENDPOINT}`);
  url.searchParams.append("isMain", "false");

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch non-main categories failed");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data.filter(Boolean) : [];
}

/**
 * Category detail by slug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  if (USE_MOCK) {
    return (
      categoriesMock.find((c) => c.slug === slug) ?? null
    );
  }

  const res = await fetch(
    `${BASE_API_URL}${CATEGORY_ENDPOINT}/${slug}`,
    { cache: "no-store" }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Fetch category by slug failed");

  const json = await res.json();
  return json?.data ?? null;
}
