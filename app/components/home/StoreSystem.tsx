export default function StoreSystemSection() {
  const stores = [
    {
      name: "Chi nhánh Quận 1",
      address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
      phone: "0901 234 567",
      time: "9:00 – 22:00 hàng ngày",
    },
    {
      name: "Chi nhánh Quận 7",
      address: "45 Nguyễn Văn Linh, Tân Phong, Quận 7, TP.HCM",
      phone: "0902 345 678",
      time: "9:00 – 21:30 hàng ngày",
    },
    {
      name: "Chi nhánh Gò Vấp",
      address: "78 Quang Trung, Phường 10, Gò Vấp, TP.HCM",
      phone: "0903 456 789",
      time: "9:30 – 22:00 hàng ngày",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl  text-white">
            Hệ Thống Showroom
          </h2>
          <p className="mt-6 text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Trải nghiệm sự tinh tế tại các không gian độc quyền của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {stores.map((store, index) => (
            <div
              key={index}
              className="p-10 bg-gray-900/60 backdrop-blur-sm border border-amber-800/30 rounded-2xl hover:border-amber-500/50 transition-all duration-500 group"
            >
              <h3 className="text-3xl font-medium text-white mb-8 group-hover:text-amber-400 transition-colors">
                {store.name}
              </h3>
              <div className="space-y-5 text-lg text-gray-200 font-light">
                <p>
                  <span className="text-amber-400 font-medium">Địa chỉ:</span> {store.address}
                </p>
                <p>
                  <span className="text-amber-400 font-medium">Hotline:</span> {store.phone}
                </p>
                <p>
                  <span className="text-amber-400 font-medium">Giờ mở cửa:</span> {store.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-xl text-gray-300 font-light">
            Hiện tại 3 showroom tại TP.HCM – Sắp mở rộng đến Hà Nội & Đà Nẵng.
          </p>
        </div>
      </div>
    </section>
  );
}