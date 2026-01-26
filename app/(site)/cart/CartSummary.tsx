"use client";

import Link from "next/link";

export default function CartSummary({ items }: any) {
  const subtotal = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="border p-6 space-y-4">
      <div className="flex justify-between">
        <span>Tạm tính:</span>
        <span>{subtotal.toLocaleString()}đ</span>
      </div>

      <div className="flex justify-between">
        <span>Phí vận chuyển:</span>
        <span>Free</span>
      </div>

      <hr />

      <div className="flex justify-between font-semibold text-lg">
        <span>Tổng:</span>
        <span className="text-red-600">
          {subtotal.toLocaleString()}đ
        </span>
      </div>

      <button className="w-full bg-red-600 text-white py-3 rounded">
        Thanh toán
      </button>
    </div>
  );
}
