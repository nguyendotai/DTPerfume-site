"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { Product } from "@/app/types/product";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  title: string;
  products: Product[];
  viewMoreHref?: string;
  sliderId: string; // để tránh trùng navigation
}

export default function ProductSliderSection({
  title,
  products,
  viewMoreHref,
  sliderId,
}: Props) {
  if (!products || products.length === 0) return null;

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif">{title}</h2>

        {viewMoreHref && (
          <Link
            href={viewMoreHref}
            className="text-gray-500 hover:text-black flex items-center gap-1"
          >
            Xem thêm <span className="text-xl">›</span>
          </Link>
        )}
      </div>

      {/* Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          loop
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 6 },
          }}
          navigation={{
            prevEl: `.prev-${sliderId}`,
            nextEl: `.next-${sliderId}`,
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev */}
        <button className={`prev-${sliderId} absolute -left-6 top-1/2 -translate-y-1/2 z-10`}>
          <ChevronLeft size={28} />
        </button>

        {/* Next */}
        <button className={`next-${sliderId} absolute -right-6 top-1/2 -translate-y-1/2 z-10`}>
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
