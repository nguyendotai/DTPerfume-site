import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { readMock } from "../lib/mock";
import { Category } from "../types/category";

const CATEGORY_ENDPOINT = "/categories";

export async function getHomeCategories(limit?: number): Promise<Category[]> {
  // 🧪 MOCK
  if (USE_MOCK) {
    const mock = await readMock<{ data: Category[] }>("categories.json");
    const categories = (mock.data ?? []).filter((c) => c?.isMain === true);

    return limit ? categories.slice(0, limit) : categories;
  }

  // 🌐 API thật
  const url = new URL(`${BASE_API_URL}${CATEGORY_ENDPOINT}`);
  url.searchParams.append("isMain", "true");

  if (limit) {
    url.searchParams.append("limit", limit.toString());
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Fetch home categories failed");
  }

  const json = await res.json();

  return Array.isArray(json.data) ? json.data.filter(Boolean) : [];
}

export async function getNonMainCategories(): Promise<Category[]> {
  if (USE_MOCK) {
    const mock = await readMock<{ data: Category[] }>("categories.json");
    return (mock.data ?? []).filter(
      (c) => c?.isMain === false
    );
  }

  const url = new URL(`${BASE_API_URL}${CATEGORY_ENDPOINT}`);
  url.searchParams.append("isMain", "false");

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Fetch non-main categories failed");
  }

  const json = await res.json();
  return json.data ?? [];
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  // 🧪 MOCK
  if (USE_MOCK) {
    const mock = await readMock<{ data: Category[] }>("categories.json");
    return (
      (mock.data ?? []).find((c) => c.slug === slug) ?? null
    );
  }

  // 🌐 API thật
  const res = await fetch(
    `${BASE_API_URL}${CATEGORY_ENDPOINT}/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Fetch category by slug failed");
  }

  const json = await res.json();
  return json.data ?? null;
}
