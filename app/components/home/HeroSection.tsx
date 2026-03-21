"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getHomeBrands } from "@/app/service/brand.service";
import { Brand } from "@/app/types/brand";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function HeroSection() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    getHomeBrands()
      .then((data) => setBrands(data))
      .catch((err) => console.error("Fetch brands failed:", err));
  }, []);

  useEffect(() => {
    if (!brands.length) return;

    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % brands.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [brands.length]);

  if (!brands.length) return null;

  const currentBrand = brands[index];

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentBrand.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${currentBrand.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Click toàn bộ banner */}
          {currentBrand.slug && (
            <Link
              href={`/brand/${currentBrand.slug}`}
              className="absolute inset-0 z-10"
              aria-label={`Go to ${currentBrand.name}`}
            />
          )}

          {/* Overlay nhẹ */}
          <div className="absolute inset-0 " />
        </motion.div>
      </AnimatePresence>

      {/* Dots điều hướng */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {brands.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-white scale-125 shadow-md"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
