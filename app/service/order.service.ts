import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { readMockServer } from "../lib/mock.server";
import { readMockClient } from "../lib/mock.client";
import { Order } from "../types/order";

/**
 * Lấy danh sách đơn hàng của user
 */
export async function getUserOrders(userId: number): Promise<Order[]> {
  if (USE_MOCK) {
    const mock = await readMockClient<{ data: Order[] }>("orders.json");
    return mock.data ?? [];
  }

  const res = await fetch(`${BASE_API_URL}/orders/user/${userId}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Fetch user orders failed");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * Lấy chi tiết đơn hàng
 */
export async function getOrderDetail(orderId: number): Promise<Order | null> {
  if (USE_MOCK) {
    const mock = await readMockClient<{ data: Order }>("order-detail.json");
    return mock.data ?? null;
  }

  const res = await fetch(`${BASE_API_URL}/orders/${orderId}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Fetch order detail failed");

  const json = await res.json();
  return json?.data ?? null;
}

/**
 * Lấy trạng thái đơn hàng
 */
export async function getOrderStatus(orderId: number) {
  const res = await fetch(`${BASE_API_URL}/orders/status/${orderId}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Fetch order status failed");

  const json = await res.json();
  return json?.data ?? null;
}
