import { cartMock } from "../mock/cart.mock"; // đổi đúng path mock của bạn

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
export const getCartService = async (token: string) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return cartMock.getCart();
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${CART_ENDPOINT}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) await handleError(res);
    return res.json();
  }
};

/* ADD TO CART */
export const addToCartService = async (
  payload: { variant_id: number; quantity: number },
  token: string
) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return cartMock.addToCart(payload);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${CART_ENDPOINT}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) await handleError(res);
    return res.json();
  }
};

/* UPDATE */
export const updateCartItemService = async (
  item_id: number,
  quantity: number,
  token: string
) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return cartMock.updateItem(item_id, quantity);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${CART_ENDPOINT}/item/${item_id}`,
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
};

/* REMOVE */
export const removeCartItemService = async (item_id: number, token: string) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return cartMock.removeItem(item_id);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${CART_ENDPOINT}/item/${item_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) await handleError(res);
    return res.json();
  }
};

/* CLEAR */
export const clearCartService = async (token: string) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return cartMock.clearCart();
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${CART_ENDPOINT}/clear`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) await handleError(res);
    return res.json();
  }
};

/* SYNC */
export const syncCartService = async (
  items: { variant_id: number; quantity: number }[],
  token: string
) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return cartMock.sync(items);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${CART_ENDPOINT}/sync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      }
    );

    if (!res.ok) await handleError(res);
    return res.json();
  }
};
