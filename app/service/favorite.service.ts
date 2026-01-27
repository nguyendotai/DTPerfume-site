import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { readMockServer } from "../lib/mock.server";
import { readMockClient } from "../lib/mock.client";

const FAVORITE_ENDPOINT = "/favorites";

async function handleError(res: Response) {
  const text = await res.text();

  try {
    const json = JSON.parse(text);
    throw new Error(json.message || "Request failed");
  } catch {
    throw new Error(text || "Request failed");
  }
}

/* GET FAVORITE */
export async function getFavoriteService(token: string) {
  if (USE_MOCK) return readMockClient("favorite.json");

  const res = await fetch(`${BASE_API_URL}${FAVORITE_ENDPOINT}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) await handleError(res);
  return res.json();
}

/* ADD TO FAVORITE */
export async function addToFavoriteService(
  payload: { variant_id: number;},
  token: string
) {
  if (USE_MOCK) return readMockClient("favorite-add.json");

  const res = await fetch(`${BASE_API_URL}${FAVORITE_ENDPOINT}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) await handleError(res);
  return res.json();
}

/* REMOVE */
export async function removeFavoriteItemService(
  item_id: number,
  token: string
) {
  if (USE_MOCK) return readMockClient("favorite-remove.json");

  const res = await fetch(
    `${BASE_API_URL}${FAVORITE_ENDPOINT}/item/${item_id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) await handleError(res);
  return res.json();
}

/* CLEAR */
export async function clearFavoriteService(token: string) {
  if (USE_MOCK) return readMockClient("favorite-clear.json");

  const res = await fetch(`${BASE_API_URL}${FAVORITE_ENDPOINT}/clear`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) await handleError(res);
  return res.json();
}

/* SYNC */
export async function syncFavoriteService(
  items: { variant_id: number; }[],
  token: string
) {
  if (USE_MOCK) return readMockClient("favorite-sync.json");

  const res = await fetch(`${BASE_API_URL}${FAVORITE_ENDPOINT}/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) await handleError(res);
  return res.json();
}
