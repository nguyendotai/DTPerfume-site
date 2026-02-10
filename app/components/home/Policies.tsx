// components/home/PoliciesSection.tsx
export default function PoliciesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Chính Sách Của Chúng Tôi</h2>
          <p className="mt-4 text-lg text-gray-600">
            Minh bạch - Công bằng - Vì quyền lợi khách hàng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chính sách đổi trả */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chính sách đổi trả</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Đổi/trả trong <strong>7 ngày</strong> kể từ ngày nhận hàng</li>
              <li>• Sản phẩm còn nguyên tem mác, chưa qua sử dụng</li>
              <li>• Không áp dụng cho hàng sale giảm giá trên 50%</li>
              <li>• Khách chịu phí vận chuyển khi đổi (trừ lỗi từ shop)</li>
              <li>• Hoàn tiền trong 3-5 ngày làm việc</li>
            </ul>
          </div>

          {/* Chính sách vận chuyển */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chính sách vận chuyển</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Giao hàng toàn quốc qua GHTK / J&T / Viettel Post</li>
              <li>• Miễn phí vận chuyển đơn từ 500.000đ</li>
              <li>• Thời gian giao: 2-5 ngày (nội thành), 3-7 ngày (ngoại tỉnh)</li>
              <li>• Kiểm tra hàng trước khi thanh toán (COD)</li>
              <li>• Phí ship nội thành TP.HCM: 25.000đ</li>
            </ul>
          </div>

          {/* Chính sách bảo mật & thanh toán */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bảo mật & Thanh toán</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Thanh toán an toàn: COD, chuyển khoản, Momo, VNPay</li>
              <li>• Thông tin khách hàng được bảo mật tuyệt đối</li>
              <li>• Không lưu trữ thông tin thẻ tín dụng</li>
              <li>• Hỗ trợ đổi size/màu nếu còn hàng</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600">
            Mọi thắc mắc vui lòng liên hệ hotline <strong>090xxxxxxx</strong> hoặc inbox fanpage.
          </p>
        </div>
      </div>
    </section>
  );
}