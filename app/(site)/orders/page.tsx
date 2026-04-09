"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getUserOrders } from "@/app/service/order.service";
import { Order } from "@/app/types/order";
import Link from "next/link";

export default function OrdersPage() {
  const { user} = useSelector((state: RootState) => state.auth);
  const userId = user?.id;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold mb-3">
          Bạn cần đăng nhập để xem đơn hàng
        </h2>
        <Link
          href="/login"
          className="inline-block bg-[#d4af37] text-white px-6 py-3 rounded-full hover:bg-[#b59410] transition"
        >
          Đăng nhập
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-gray-500">
        Đang tải đơn hàng...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Đơn hàng của tôi</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          Bạn chưa có đơn hàng nào.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Mã đơn hàng:{" "}
                    <span className="font-medium text-gray-800">
                      #{order.id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngày đặt:{" "}
                    <span className="font-medium text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "paid"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "processing"
                            ? "bg-purple-100 text-purple-700"
                            : order.status === "shipped"
                              ? "bg-orange-100 text-orange-700"
                              : order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                    }`}
                  >
                    {translateOrderStatus(order.status, order.payment_method)}
                  </span>

                  <span className="text-sm font-semibold text-[#b59410]">
                    {order.total_price.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Thanh toán:{" "}
                  <span className="font-medium">
                    {order.payment_method === "stripe" ? "Thẻ / Stripe" : "COD"}
                  </span>
                </p>

                <Link
                  href={`/orders/${order.id}`}
                  className="text-sm font-medium text-[#d4af37] hover:underline"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function translateOrderStatus(status: string, paymentMethod?: string) {
  if (paymentMethod === "cod") {
    if (status === "pending") return "Đã đặt hàng";
    if (status === "processing") return "Đang xử lý";
    if (status === "shipped") return "Đang giao hàng";
    if (status === "delivered") return "Đã giao";
    if (status === "cancelled") return "Đã hủy";
  }

  if (paymentMethod === "stripe") {
    if (status === "pending") return "Chờ thanh toán";
    if (status === "paid") return "Đã thanh toán";
    if (status === "processing") return "Đang xử lý";
    if (status === "shipped") return "Đang giao hàng";
    if (status === "delivered") return "Đã giao";
    if (status === "cancelled") return "Đã hủy";
  }

  return status;
}
