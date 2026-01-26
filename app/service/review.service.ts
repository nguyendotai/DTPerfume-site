import { BASE_API_URL, USE_MOCK } from "../lib/api.config";
import { readMock } from "../lib/mock";

const REVIEW_ENDPOINT = "/reviews";

/* CREATE REVIEW */
export async function createReviewService(
  payload: { product_id: number; rating: number; comment: string },
  token: string
) {
  if (USE_MOCK) return readMock("review-create.json");

  const res = await fetch(`${BASE_API_URL}${REVIEW_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* GET REVIEWS BY PRODUCT */
export async function getReviewsByProductService(productId: number) {
  if (USE_MOCK) return readMock("review-product.json");

  const res = await fetch(
    `${BASE_API_URL}${REVIEW_ENDPOINT}/product/${productId}`
  );

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* GET MY REVIEWS */
export async function getMyReviewsService(token: string) {
  if (USE_MOCK) return readMock("review-me.json");

  const res = await fetch(`${BASE_API_URL}${REVIEW_ENDPOINT}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* UPDATE REVIEW */
export async function updateReviewService(
  id: number,
  payload: { rating?: number; comment?: string },
  token: string
) {
  if (USE_MOCK) return readMock("review-update.json");

  const res = await fetch(`${BASE_API_URL}${REVIEW_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* DELETE REVIEW */
export async function deleteReviewService(id: number, token: string) {
  if (USE_MOCK) return readMock("review-delete.json");

  const res = await fetch(`${BASE_API_URL}${REVIEW_ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}
