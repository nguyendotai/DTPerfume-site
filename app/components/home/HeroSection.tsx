"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  {
    image:
      "https://thumbs.dreamstime.com/b/elegant-black-perfume-bottle-display-luxurious-design-elegant-black-perfume-bottle-display-luxurious-design-studio-setting-close-370609572.jpg",
    title: "VALENTINO",
    cta: "/products",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/luxury-perfume-bottle-stone-platform-crystal-glass-golden-details-dramatic-studio-lighting-fragrance-product-388624307.jpg",
    title: "DIOR",
    cta: "/products",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/luxury-perfume-bottle-gold-glowing-background-standing-sparkling-surface-bokeh-fragrance-concept-beauty-marketing-419848177.jpg",
    title: "CHANEL",
    cta: "/products",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[520px] overflow-hidden">
      {/* Slides */}
      {heroImages.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlay nhẹ */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
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
