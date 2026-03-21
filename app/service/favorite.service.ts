import { favoriteMock } from "../mock/favorite.mock"; 

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
export const getFavoriteService = async (token: string) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return favoriteMock.getFavorite();
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${FAVORITE_ENDPOINT}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) await handleError(res);
    return res.json();
  }
};

/* ADD TO FAVORITE */
export const addToFavoriteService = async (
  payload: { variant_id: number },
  token: string
) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return favoriteMock.addToFavorite(payload);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${FAVORITE_ENDPOINT}/add`,
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

/* REMOVE */
export const removeFavoriteItemService = async (
  item_id: number,
  token: string
) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return favoriteMock.removeItem(item_id);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${FAVORITE_ENDPOINT}/item/${item_id}`,
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
export const clearFavoriteService = async (token: string) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return favoriteMock.clear();
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${FAVORITE_ENDPOINT}/clear`,
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
export const syncFavoriteService = async (
  items: { variant_id: number }[],
  token: string
) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return favoriteMock.sync(items);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${FAVORITE_ENDPOINT}/sync`,
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
