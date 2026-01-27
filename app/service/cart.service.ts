import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { readMockServer } from "../lib/mock.server";
import { readMockClient } from "../lib/mock.client";

const CART_ENDPOINT = "/carts";

async function handleError(res: Response) {
  const text = await res.text();

  try {
    const json = JSON.parse(text);
    throw new Error(json.message || "Request failed");
  } catch {
    throw new Error(text || "Request failed");
  }
}

/* GET CART */
export async function getCartService(token: string) {
  if (USE_MOCK) return readMockClient("cart.json");

  const res = await fetch(`${BASE_API_URL}${CART_ENDPOINT}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) await handleError(res);
  return res.json();
}

/* ADD TO CART */
export async function addToCartService(
  payload: { variant_id: number; quantity: number },
  token: string
) {
  if (USE_MOCK) return readMockClient("cart-add.json");

  const res = await fetch(`${BASE_API_URL}${CART_ENDPOINT}/add`, {
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

/* UPDATE */
export async function updateCartItemService(
  item_id: number,
  quantity: number,
  token: string
) {
  if (USE_MOCK) return readMockClient("cart-update.json");

  const res = await fetch(
    `${BASE_API_URL}${CART_ENDPOINT}/item/${item_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    }
  );

  if (!res.ok) await handleError(res);
  return res.json();
}

/* REMOVE */
export async function removeCartItemService(item_id: number, token: string) {
  if (USE_MOCK) return readMockClient("cart-remove.json");

  const res = await fetch(
    `${BASE_API_URL}${CART_ENDPOINT}/item/${item_id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) await handleError(res);
  return res.json();
}

/* CLEAR */
export async function clearCartService(token: string) {
  if (USE_MOCK) return readMockClient("cart-clear.json");

  const res = await fetch(`${BASE_API_URL}${CART_ENDPOINT}/clear`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) await handleError(res);
  return res.json();
}

/* SYNC */
export async function syncCartService(
  items: { variant_id: number; quantity: number }[],
  token: string
) {
  if (USE_MOCK) return readMockClient("cart-sync.json");

  const res = await fetch(`${BASE_API_URL}${CART_ENDPOINT}/sync`, {
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
