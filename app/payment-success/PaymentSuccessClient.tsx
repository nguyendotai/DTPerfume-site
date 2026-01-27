"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BASE_API_URL } from "@/app/lib/api.config";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) return;

    const confirmPayment = async () => {
      try {
        await fetch(`${BASE_API_URL}/orders/confirm-stripe-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: Number(orderId) }),
        });

        // Sau khi xác nhận xong, chuyển về trang đơn hàng
        setTimeout(() => {
          router.push("/orders");
        }, 1500);
      } catch (error) {
        console.error("Confirm stripe payment error:", error);
      }
    };

    confirmPayment();
  }, [orderId, router]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Thanh toán thành công 🎉
      </h1>
      <p className="text-gray-600">Đang xác nhận đơn hàng...</p>
    </div>
  );
}
