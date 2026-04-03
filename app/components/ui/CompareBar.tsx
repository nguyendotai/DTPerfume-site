"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, ChevronDown, Scale } from "lucide-react";

export default function CompareBar() {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.compare.items);
  
  const [isVisible, setIsVisible] = useState(true);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3">
      {/* Thanh so sánh chính */}
      <div
        className={`bg-white shadow-xl border border-zinc-200 rounded-2xl px-6 py-4 flex items-center gap-5 transition-all duration-300 ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Icon so sánh */}
        <div className="flex items-center gap-2 text-zinc-700">
          <Scale size={22} strokeWidth={1.5} />
        </div>

        {/* Hình ảnh sản phẩm preview */}
        <div className="flex gap-2">
          {items.slice(0, 4).map((item, index) => {
            const image =
              item.images?.find((img) => img.is_main)?.url ||
              item.images?.[0]?.url ||
              "/placeholder.png";

            return (
              <div
                key={item.id}
                className="w-11 h-11 rounded-xl overflow-hidden border border-zinc-100 shadow-sm flex-shrink-0"
              >
                <img
                  src={image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          {items.length > 4 && (
            <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center text-xs font-medium text-zinc-500 border border-zinc-200">
              +{items.length - 4}
            </div>
          )}
        </div>

        {/* Thông tin */}
        <div className="pr-4 border-r border-zinc-100">
          <p className="text-sm text-zinc-600">
            Đã chọn <span className="font-semibold text-zinc-900">{items.length}</span> sản phẩm
          </p>
          <p className="text-xs text-zinc-400">Tối đa 4 sản phẩm</p>
        </div>

        {/* Nút So sánh */}
        <button
          onClick={() => router.push("/compare")}
          disabled={items.length < 2}
          className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
            ${
              items.length >= 2
                ? "bg-zinc-900 hover:bg-black text-white shadow-sm active:scale-95"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
        >
          So sánh ngay
        </button>

        {/* Nút ẩn */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
          title="Ẩn thanh so sánh"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Nút hiện lại (khi đã ẩn) */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-white shadow-xl border border-zinc-200 rounded-2xl p-4 hover:bg-zinc-50 transition-all active:scale-95"
          title="Hiện thanh so sánh"
        >
          <div className="flex items-center gap-2 text-zinc-700">
            <Scale size={22} strokeWidth={1.5} />
            <div className="text-sm font-medium pr-1">
              {items.length}
            </div>
            <ChevronDown size={18} className="rotate-180" />
          </div>
        </button>
      )}
    </div>
  );
}