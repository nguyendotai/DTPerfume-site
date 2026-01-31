// components/home/AboutUsSection.tsx
import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Về Chúng Tôi</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Chúng tôi là thương hiệu thời trang Việt Nam, mang đến những sản phẩm chất lượng, thiết kế hiện đại và giá cả hợp lý.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/images/about-image.jpg" // Thay bằng ảnh thật của bạn (đội ngũ, cửa hàng, sản phẩm...)
              alt="Về chúng tôi"
              width={600}
              height={500}
              className="rounded-xl shadow-lg object-cover w-full h-auto"
            />
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Được thành lập từ năm 2020 tại TP.HCM, chúng tôi bắt đầu từ niềm đam mê với thời trang đường phố và mong muốn mang đến cho giới trẻ Việt Nam những bộ trang phục chất lượng cao, hợp xu hướng nhưng vẫn giữ được sự thoải mái và cá tính riêng.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Với sứ mệnh <span className="font-semibold">"Thời trang cho mọi người"</span>, chúng tôi cam kết:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Sử dụng chất liệu thân thiện với da, bền đẹp theo thời gian</li>
              <li>Thiết kế độc quyền, cập nhật xu hướng nhanh chóng</li>
              <li>Giá cả minh bạch, phù hợp với học sinh, sinh viên và người đi làm</li>
              <li>Chú trọng trải nghiệm khách hàng và dịch vụ hậu mãi chu đáo</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-medium">
              Cảm ơn bạn đã đồng hành cùng chúng tôi trên hành trình lan tỏa phong cách!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}