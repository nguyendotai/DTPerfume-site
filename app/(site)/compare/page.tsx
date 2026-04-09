"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  removeFromCompare,
  clearCompare,
} from "@/app/store/slices/compare.slice";
import { X, Trash2, Scale } from "lucide-react";

export default function ComparePage() {
  const { items } = useSelector((state: RootState) => state.compare);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">c
          <Scale className="mx-auto mb-6 text-zinc-300" size={80} strokeWidth={1} />
          <p className="text-3xl text-zinc-400 font-light">Chưa có sản phẩm để so sánh</p>
          <p className="text-zinc-500 mt-3 text-lg">Thêm sản phẩm để khám phá sự khác biệt</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Luxury */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-zinc-400" />
              <span className="uppercase tracking-[4px] text-sm font-medium text-zinc-500">Comparison</span>
            </div>
            <h1 className="text-7xl font-light tracking-tighter text-zinc-900 leading-none">
              So sánh sản phẩm
            </h1>
            <p className="text-2xl text-zinc-500 font-light max-w-md">
              Khám phá sự tinh tế trong từng chi tiết
            </p>
          </div>

          <button
            onClick={() => dispatch(clearCompare())}
            className="mt-10 md:mt-0 group flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-red-600 text-white rounded-2xl transition-all duration-300 text-sm uppercase tracking-widest font-medium active:scale-[0.97]"
          >
            <Trash2 size={19} className="group-hover:rotate-12 transition-transform" />
            XÓA TẤT CẢ
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item, index) => {
            const image =
              item.images?.find((img) => img.is_main)?.url ||
              item.images?.[0]?.url ||
              "/placeholder.png";

            const prices =
              item.variants?.map((v) =>
                Number(
                  v.discount_price && Number(v.discount_price) > 0
                    ? v.discount_price
                    : v.price
                )
              ) || [];

            const price =
              prices.length > 0
                ? Math.min(...prices).toLocaleString("vi-VN") + "đ"
                : "Liên hệ";

            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Nút xóa */}
                <button
                  onClick={() => dispatch(removeFromCompare(item.id))}
                  className="absolute top-6 right-6 z-20 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-zinc-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <X size={24} strokeWidth={2} />
                </button>

                {/* Hình ảnh */}
                <div className="relative h-80 bg-zinc-100 overflow-hidden">
                  <img
                    src={image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Nội dung Card */}
                <div className="p-9 space-y-9">
                  {/* Tên sản phẩm */}
                  <div>
                    <h3 className="text-2xl font-light leading-tight tracking-tight text-zinc-900 group-hover:text-black transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* Giá */}
                  <div className="space-y-2">
                    <div className="uppercase text-xs tracking-[2px] text-zinc-500 font-medium">Giá bán</div>
                    <div className="text-4xl font-light tracking-tighter text-amber-600">
                      {price}
                    </div>
                  </div>

                  {/* Thương hiệu */}
                  <div className="space-y-2">
                    <div className="uppercase text-xs tracking-[2px] text-zinc-500 font-medium">Thương hiệu</div>
                    <div className="text-xl font-light text-zinc-700">
                      {item.brand?.name || "Không xác định"}
                    </div>
                  </div>

                  {/* Mô tả */}
                  <div className="space-y-2">
                    <div className="uppercase text-xs tracking-[2px] text-zinc-500 font-medium">Mô tả</div>
                    <p className="text-zinc-600 leading-relaxed line-clamp-4 text-[15px]">
                      {item.description || "Không có mô tả chi tiết."}
                    </p>
                  </div>
                </div>

                {/* Decorative line */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mx-9 mb-6" />
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-zinc-100">
            <Scale size={18} className="text-zinc-400" />
            <p className="text-xs tracking-[2px] text-zinc-400 font-medium">
              ĐANG SO SÁNH {items.length}/4 SẢN PHẨM • THIẾT KẾ CAO CẤP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}