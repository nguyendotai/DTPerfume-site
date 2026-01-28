// components/Footer.tsx
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      {/* Phần trên - dark luxury */}
      <div className="border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {/* Column 1 - Brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl md:text-3xl font-serif tracking-wider text-white mb-6">
                DT Perfume
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Nơi hương thơm trở thành dấu ấn cá nhân. 
                Bộ sưu tập nước hoa niche & haute parfumerie chính hãng.
              </p>
            </div>

            {/* Column 2 - Shop */}
            <div>
              <h4 className="text-white font-medium tracking-wider uppercase text-sm mb-6">
                Shop
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/collections/nuoc-hoa-nu" className="hover:text-gold transition-colors duration-300">
                    Nước hoa nữ
                  </Link>
                </li>
                <li>
                  <Link href="/collections/nuoc-hoa-nam" className="hover:text-gold transition-colors duration-300">
                    Nước hoa nam
                  </Link>
                </li>
                <li>
                  <Link href="/collections/unisex" className="hover:text-gold transition-colors duration-300">
                    Unisex
                  </Link>
                </li>
                <li>
                  <Link href="/collections/niche" className="hover:text-gold transition-colors duration-300">
                    Niche & Artisan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Thông tin */}
            <div>
              <h4 className="text-white font-medium tracking-wider uppercase text-sm mb-6">
                Thông tin
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/ve-chung-toi" className="hover:text-gold transition-colors duration-300">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/chinh-sach-doi-tra" className="hover:text-gold transition-colors duration-300">
                    Chính sách đổi trả
                  </Link>
                </li>
                <li>
                  <Link href="/chinh-sach-bao-mat" className="hover:text-gold transition-colors duration-300">
                    Bảo mật & Thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang" className="hover:text-gold transition-colors duration-300">
                    Hướng dẫn mua hàng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Liên hệ */}
            <div>
              <h4 className="text-white font-medium tracking-wider uppercase text-sm mb-6">
                Liên hệ
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-gold">✦</span>
                  <a href="mailto:hello@luxenoir.vn" className="hover:text-gold transition-colors">
                    hello@luxenoir.vn
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">✦</span>
                  <span>Hotline: 1900 123 456</span>
                </li>
                <li className="pt-2">
                  <div className="flex gap-5 mt-4">
                    <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                      <Youtube size={20} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Phần dưới - copyright */}
      <div className="border-t border-gold/10 bg-black/70">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {currentYear} Luxe Noir. All Rights Reserved.</p>
            
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link href="/chinh-sach-doi-tra" className="hover:text-gray-300 transition-colors">
                Đổi trả
              </Link>
              <Link href="/chinh-sach-bao-mat" className="hover:text-gray-300 transition-colors">
                Bảo mật
              </Link>
              <Link href="/dieu-khoan-dich-vu" className="hover:text-gray-300 transition-colors">
                Điều khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}