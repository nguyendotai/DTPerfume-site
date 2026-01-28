// components/footer/Policies.tsx
import Link from "next/link";

const policyItems = [
  { title: "Chính sách đổi trả", href: "/chinh-sach-doi-tra" },
  { title: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
  { title: "Điều khoản dịch vụ", href: "/dieu-khoan-dich-vu" },
  { title: "Hướng dẫn mua hàng", href: "/huong-dan-mua-hang" },
  { title: "Phương thức thanh toán", href: "/phuong-thuc-thanh-toan" },
  { title: "Chính sách vận chuyển", href: "/chinh-sach-van-chuyen" },
];

export default function Policies() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl md:text-2xl font-serif tracking-wider text-white">
        CHÍNH SÁCH
      </h3>

      <ul className="space-y-3">
        {policyItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-300 hover:text-gold transition-colors text-sm"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}