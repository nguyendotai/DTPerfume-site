import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl text-gray-900">
            Heritage & Tầm Nhìn
          </h2>
          <p className="mt-6 text-2xl text-gray-600 max-w-4xl mx-auto ">
            Thương hiệu thời trang Việt Nam cao cấp – nơi sự tinh tế hòa quyện cùng hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <Image
              src="/images/about-image.jpg"
              alt="Heritage của chúng tôi"
              width={600}
              height={700}
              className="rounded-2xl shadow-2xl object-cover w-full h-auto aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
          </div>

          <div className="space-y-10">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              Thành lập năm 2020 tại Sài Gòn, chúng tôi khởi nguồn từ đam mê thời trang cao cấp và khát vọng mang đến những thiết kế vượt thời gian cho thế hệ trẻ Việt Nam.
            </p>

            <p className="text-2xl font-serif font-medium text-gray-900 tracking-wide">
              Sứ mệnh: “Thời trang dành cho những ai trân trọng sự khác biệt.”
            </p>

            <ul className="space-y-6 text-lg text-gray-700 font-light leading-relaxed list-disc pl-6">
              <li>Chất liệu thượng hạng, bền vững và thân thiện</li>
              <li>Thiết kế độc quyền, cập nhật tinh tế theo mùa</li>
              <li>Giá trị minh bạch, xứng tầm chất lượng</li>
              <li>Trải nghiệm khách hàng được chăm chút tỉ mỉ</li>
            </ul>

            <p className="text-xl italic text-amber-600 font-light pt-8">
              Cảm ơn bạn đã đồng hành và tin tưởng vào hành trình của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}