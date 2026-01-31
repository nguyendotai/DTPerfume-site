"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Brand } from "@/app/types/brand";

interface Props {
  brands: Brand[];
}

export default function BrandsSection({ brands }: Props) {
  const [activeBrand, setActiveBrand] = useState<Brand>(
    brands[0] || {
      id: 0,
      name: "No Brand",
      logo: "",
      banner: "",
      slug: "",
    }
  );

  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentIndex = brands.findIndex((b) => b.id === activeBrand.id);

  // Auto slider
  useEffect(() => {
    if (brands.length <= 1 || isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % brands.length;
      setActiveBrand(brands[nextIndex]);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, brands, isHovered]);

  const handleBrandClick = (brand: Brand) => {
    setActiveBrand(brand);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isHovered && brands.length > 1) {
      intervalRef.current = setInterval(() => {
        const nextIndex =
          (brands.findIndex((b) => b.id === brand.id) + 1) % brands.length;
        setActiveBrand(brands[nextIndex]);
      }, 3000);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-serif text-gray-900">Thương hiệu</h2>
          <Link
            href="/brands"
            className="text-gray-500 hover:text-black flex items-center gap-1"
          >
            Xem thêm <span className="text-xl">›</span>
          </Link>
        </div>

        {/* Content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Banner LEFT - click chuyển hướng */}
          <Link
            href={`/brand/${activeBrand.slug}`}
            className="relative rounded-2xl overflow-hidden aspect-4/3 lg:aspect-auto block"
          >
            <div className="absolute inset-0">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    brand.id === activeBrand.id
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                >
                  {brand.banner ? (
                    <img
                      src={brand.banner}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      No banner
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Link>

          {/* Logo grid RIGHT */}
          <div className="grid grid-cols-4 border border-gray-200 aspect-4/3 lg:aspect-auto">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className={`h-28 flex items-center justify-center border border-gray-100 transition-all duration-300 
                  ${
                    brand.id === activeBrand.id
                      ? "bg-gray-50 ring-2 ring-gray-900 ring-inset"
                      : "hover:bg-gray-50"
                  }`}
              >
                <img
                  src={brand.logo || "/placeholder.png"}
                  alt={brand.name}
                  className={`max-h-10 object-contain transition-all duration-300 
                    ${
                      brand.id === activeBrand.id
                        ? "grayscale-0 scale-110"
                        : "grayscale hover:grayscale-0"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
