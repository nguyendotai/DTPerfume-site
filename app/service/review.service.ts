import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { reviewsMock } from "../mock/reviews.mock";

const REVIEW_ENDPOINT = "/reviews";

/* CREATE REVIEW */
export async function createReviewService(
  payload: { product_id: number; rating: number; comment: string }
) {
  if (USE_MOCK) {
    const newReview = {
      id: Date.now(),
      ...payload,
      user_id: 1,
      created_at: new Date().toISOString(),
    };
    reviewsMock.unshift(newReview);
    return { data: newReview };
  }

  const res = await fetch(`${BASE_API_URL}${REVIEW_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 QUAN TRỌNG
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* GET REVIEWS BY PRODUCT */
export async function getReviewsByProductService(productId: number) {
  if (USE_MOCK) {
    return {
      data: reviewsMock.filter((r) => r.product_id === productId),
    };
  }

  const res = await fetch(
    `${BASE_API_URL}${REVIEW_ENDPOINT}/product/${productId}`,
  );

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* GET MY REVIEWS */
export async function getMyReviewsService(token: string) {
  if (USE_MOCK) {
    return {
      data: reviewsMock.filter((r) => r.user_id === 1),
    };
  }

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
  token: string,
) {
  if (USE_MOCK) {
    const index = reviewsMock.findIndex((r) => r.id === id);
    if (index !== -1) {
      reviewsMock[index] = { ...reviewsMock[index], ...payload };
      return { data: reviewsMock[index] };
    }
    throw new Error("Review not found");
  }

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
  if (USE_MOCK) {
    const index = reviewsMock.findIndex((r) => r.id === id);
    if (index !== -1) {
      const deleted = reviewsMock.splice(index, 1)[0];
      return { data: deleted };
    }
    throw new Error("Review not found");
  }

  const res = await fetch(`${BASE_API_URL}${REVIEW_ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}
