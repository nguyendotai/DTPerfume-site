"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from 'lucide-react'; // Cần install @heroicons/react nếu chưa có
import { Category } from "@/app/types/category";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories, }: CategoriesSectionProps ) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className=" bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Grid danh mục */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl"
            >
              {/* Hình nền */}
              <div className="relative aspect-4/5 md:aspect-4/4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                {/* Nội dung */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
                    {category.name}
                  </h3>

                  {/* Nút xem thêm với hiệu ứng */}
                  <div className="flex items-center text-white font-medium text-lg">
                    Khám phá
                    <ChevronRight
                      className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                        hoveredId === category.id ? "translate-x-2" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}