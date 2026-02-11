export default function PoliciesSection() {
  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl text-gray-900">
            Cam Kết Thượng Hạng
          </h2>
          <p className="mt-6 text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Minh bạch • Tinh tế • Đặt trải nghiệm khách hàng lên hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Đổi trả */}
          <div className="space-y-8 border-t-2 border-amber-300/50 pt-10">
            <h3 className="text-3xl font-medium text-gray-900">
              Đổi Trả & Hoàn Tiền
            </h3>
            <ul className="space-y-6 text-lg text-gray-700 font-light leading-relaxed">
              <li>Đổi hoặc trả trong 7 ngày kể từ ngày nhận hàng</li>
              <li>Sản phẩm nguyên vẹn tem mác, chưa sử dụng</li>
              <li>Không áp dụng cho bộ sưu tập giảm giá đặc biệt</li>
              <li>Khách chịu phí vận chuyển đổi (miễn phí nếu lỗi từ chúng tôi)</li>
              <li>Hoàn tiền trong 3–5 ngày làm việc</li>
            </ul>
          </div>

          {/* Vận chuyển */}
          <div className="space-y-8 border-t-2 border-amber-300/50 pt-10">
            <h3 className="text-3xl font-medium text-gray-900 ">
              Vận Chuyển Tinh Tế
            </h3>
            <ul className="space-y-6 text-lg text-gray-700 font-light leading-relaxed">
              <li>Giao hàng toàn quốc qua đối tác cao cấp</li>
              <li>Miễn phí vận chuyển cho đơn từ 5.000.000 VNĐ</li>
              <li>1–3 ngày nội thành, 3–5 ngày ngoại tỉnh</li>
              <li>Kiểm tra sản phẩm trước thanh toán (COD)</li>
              <li>Phí ship nội thành TP.HCM: 30.000 VNĐ</li>
            </ul>
          </div>

          {/* Bảo mật & Thanh toán */}
          <div className="space-y-8 border-t-2 border-amber-300/50 pt-10">
            <h3 className="text-3xl font-medium text-gray-900 ">
              Bảo Mật & Thanh Toán
            </h3>
            <ul className="space-y-6 text-lg text-gray-700 font-light leading-relaxed">
              <li>Thanh toán an toàn: COD, chuyển khoản, ví điện tử</li>
              <li>Thông tin cá nhân được bảo vệ tuyệt đối</li>
              <li>Không lưu trữ thông tin thẻ tín dụng</li>
              <li>Hỗ trợ đổi size/màu nhanh chóng khi còn hàng</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-xl text-gray-600 font-light italic">
            Mọi thắc mắc xin liên hệ hotline{' '}
            <span className="text-amber-600 font-medium">090x xxx xxx</span> hoặc tin nhắn trực tiếp.
          </p>
        </div>
      </div>
    </section>
  );
}