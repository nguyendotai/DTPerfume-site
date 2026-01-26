// FilterSidebar.tsx
"use client";

import { useState } from "react";

const brands = ["Gucci", "Dior", "Versace", "Calvin Klein", "Prada", "Chanel"];
const priceRanges = [
  "Dưới 1 triệu",
  "1 – 2 triệu",
  "2 – 3 triệu",
  "3 – 5 triệu",
  "Trên 5 triệu",
];

export default function FilterSidebar() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    brand: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-xl font-medium text-gray-900 border-b border-gray-100 pb-4">
        Bộ lọc
      </h3>

      {/* Brand */}
      <div>
        <button
          onClick={() => toggleSection("brand")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-black transition-colors"
        >
          <span>Thương hiệu</span>
          <span className="text-gray-500 text-xl leading-none">
            {openSections.brand ? "−" : "+"}
          </span>
        </button>

        {openSections.brand && (
          <div className="space-y-3 pl-1">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors group"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                />
                <span className="group-hover:underline decoration-1 underline-offset-4">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-black transition-colors"
        >
          <span>Mức giá</span>
          <span className="text-gray-500 text-xl leading-none">
            {openSections.price ? "−" : "+"}
          </span>
        </button>

        {openSections.price && (
          <div className="space-y-3 pl-1">
            {priceRanges.map((range) => (
              <label
                key={range}
                className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors group"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                />
                <span className="group-hover:underline decoration-1 underline-offset-4">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Có thể thêm sau: Nút Xóa bộ lọc */}
      {/* <button className="mt-6 text-sm text-gray-500 hover:text-black underline">
        Xóa tất cả bộ lọc
      </button> */}
    </div>
  );
}