// components/footer/StoreSystem.tsx
import { MapPin, Phone, Mail } from "lucide-react";

const stores = [
  {
    name: "Luxe Noir - Quận 1",
    address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    phone: "1900 123 456",
    email: "quan1@luxenoir.vn",
  },
  {
    name: "Luxe Noir - Quận 7",
    address: "45 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh",
    phone: "1900 123 457",
    email: "quan7@luxenoir.vn",
  },
];

export default function StoreSystem() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl md:text-2xl font-serif tracking-wider text-white">
        HỆ THỐNG CỬA HÀNG
      </h3>

      <div className="space-y-6">
        {stores.map((store) => (
          <div key={store.name} className="space-y-3">
            <h4 className="text-gold font-medium text-base">{store.name}</h4>

            <div className="flex items-start gap-2 text-sm text-gray-300">
              <MapPin size={16} className="mt-1 text-gold flex-shrink-0" />
              <span>{store.address}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Phone size={16} className="text-gold flex-shrink-0" />
              <span>{store.phone}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Mail size={16} className="text-gold flex-shrink-0" />
              <a
                href={`mailto:${store.email}`}
                className="hover:text-gold transition-colors"
              >
                {store.email}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <a
          href="/he-thong-cua-hang"
          className="inline-flex items-center text-gold hover:text-gold-light text-sm font-medium tracking-wider uppercase transition-colors"
        >
          Xem tất cả cửa hàng →
        </a>
      </div>
    </div>
  );
}