"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getHomeBrands } from "@/app/service/brand.service";
import { Brand } from "@/app/types/brand";

export default function HeroSection() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getHomeBrands()
      .then((data) => setBrands(data))
      .catch((err) => console.error("Fetch brands failed:", err));
  }, []);

  useEffect(() => {
    if (!brands.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % brands.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [brands]);

  if (!brands.length) return null;

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Slides */}
      {brands.map((brand, i) => (
        <div
          key={brand.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${brand.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center text-white">
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {brands.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
