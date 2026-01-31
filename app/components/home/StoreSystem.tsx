// components/home/StoreSystemSection.tsx
export default function StoreSystemSection() {
  const stores = [
    {
      name: "Chi nhánh Quận 1",
      address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
      phone: "0901 234 567",
      time: "9:00 - 22:00",
    },
    {
      name: "Chi nhánh Quận 7",
      address: "45 Nguyễn Văn Linh, Tân Phong, Quận 7, TP.HCM",
      phone: "0902 345 678",
      time: "9:00 - 21:30",
    },
    {
      name: "Chi nhánh Gò Vấp",
      address: "78 Quang Trung, Phường 10, Gò Vấp, TP.HCM",
      phone: "0903 456 789",
      time: "9:30 - 22:00",
    },
    // Thêm chi nhánh khác nếu có
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hệ Thống Cửa Hàng</h2>
          <p className="mt-4 text-lg text-gray-600">
            Ghé thăm chúng tôi tại các địa điểm dưới đây
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{store.name}</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Địa chỉ:</span> {store.address}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Hotline:</span> {store.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Giờ mở cửa:</span> {store.time}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Hiện tại chúng tôi có {stores.length} chi nhánh tại TP.HCM.  
            Sắp tới sẽ mở rộng thêm tại Hà Nội và Đà Nẵng!
          </p>
        </div>
      </div>
    </section>
  );
}