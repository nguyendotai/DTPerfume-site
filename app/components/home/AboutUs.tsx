// components/footer/AboutUs.tsx
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl md:text-2xl font-serif tracking-wider text-white">
        VỀ CHÚNG TÔI
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed">
        Luxe Noir là nhà phân phối nước hoa chính hãng cao cấp tại Việt Nam, 
        mang đến những mùi hương độc đáo từ các thương hiệu niche và haute parfumerie danh tiếng thế giới.
      </p>

      <p className="text-gray-300 text-sm leading-relaxed">
        Chúng tôi tin rằng mỗi chai nước hoa không chỉ là mùi hương, 
        mà còn là dấu ấn cá nhân, là câu chuyện riêng của từng người.
      </p>

      <div className="pt-2">
        <Link
          href="/ve-chung-toi"
          className="inline-flex items-center text-gold hover:text-gold-light text-sm font-medium tracking-wider uppercase transition-colors"
        >
          Tìm hiểu thêm →
        </Link>
      </div>
    </div>
  );
}