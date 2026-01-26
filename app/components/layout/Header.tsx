"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, X, LogOut, Heart } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/app/store/slices/auth.slice";
import { resetCart } from "@/app/store/slices/cart.slice";
import { clearLocalCart } from "@/app/store/slices/cart.local.slice";

const CATEGORY_MENU = [
  { label: "Namperfume Favorites", slug: "favorites" },
  { label: "Deal Thơm", slug: "deal-thom" },
  { label: "Nước Hoa Nam", slug: "nuoc-hoa-nam" },
  { label: "Nước Hoa Nữ", slug: "nuoc-hoa-nu" },
  { label: "Nước Hoa Mini", slug: "nuoc-hoa-mini" },
  { label: "Giftset", slug: "giftset" },
  { label: "Nước Hoa Niche", slug: "nuoc-hoa-niche" },
  { label: "Bodycare & Homecare", slug: "bodycare-homecare" },
];

export default function Header() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(token);
  const userEmail = user?.email;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(
        searchQuery.trim(),
      )}`;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(clearLocalCart());
  };

  const cartCount = useSelector((state: RootState) =>
    token
      ? state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
      : state.cartLocal.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  const wishlistCount = useSelector((state: RootState) =>
    token ? state.favorite.items.length : state.favoriteLocal.items.length,
  );

  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold text-[#d4af37] flex-shrink-0"
          >
            DT Perfume
          </Link>

          {/* Desktop Search + Nmagazine */}
          <div className="hidden md:flex flex-1 items-center gap-8">
            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm nước hoa, thương hiệu..."
                  className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
                />
                <Search
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </form>

            {/* Nmagazine */}
            <Link
              href="/nmagazine"
              className="text-lg font-medium text-gray-800 hover:text-[#d4af37] transition whitespace-nowrap"
            >
              Nmagazine
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {/* Mobile Search Button */}
            <button
              onClick={toggleSearch}
              className="md:hidden text-gray-700 hover:text-[#d4af37]"
            >
              <Search size={24} />
            </button>

            {/* User Account */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-700 hover:text-[#d4af37] transition">
                <User size={24} />
                <span className="hidden lg:block text-sm font-medium">
                  {isLoggedIn
                    ? userEmail?.split("@")[0] || "Tài khoản"
                    : "Đăng nhập"}
                </span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 -translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-5 px-6">
                  {isLoggedIn ? (
                    <>
                      <div className="pb-4 border-b border-gray-100 mb-4">
                        <p className="text-sm text-gray-500">
                          Chào mừng trở lại!
                        </p>
                        <p className="font-semibold text-lg truncate">
                          {userEmail}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#d4af37]/5 transition"
                        >
                          <User size={18} />
                          Tài khoản của tôi
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#d4af37]/5 transition"
                        >
                          <ShoppingBag size={18} />
                          Đơn hàng
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#d4af37]/5 transition"
                        >
                          <Heart size={18} />
                          Yêu thích
                        </Link>

                        <hr className="my-3 border-gray-100" />

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#b59410] hover:bg-[#d4af37]/10 w-full transition"
                        >
                          <LogOut size={18} />
                          Đăng xuất
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center space-y-4">
                      <p className="text-gray-600">
                        Đăng nhập để mua sắm tiện lợi hơn
                      </p>
                      <Link
                        href="/login"
                        className="block bg-[#d4af37] text-white font-medium py-3 rounded-xl hover:bg-[#b59410] transition shadow-md"
                      >
                        Đăng nhập
                      </Link>
                      <p className="text-sm text-gray-500">
                        Chưa có tài khoản?{" "}
                        <Link
                          href="/register"
                          className="text-[#d4af37] hover:underline"
                        >
                          Đăng ký ngay
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wishlist */}
            {/* Wishlist */}
            <Link
              href="/favorite"
              className="text-gray-700 hover:text-[#d4af37] transition relative"
            >
              <Heart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-[#d4af37] transition"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Menu */}
      <nav className="border-t border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-12 flex items-center gap-8 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
            {CATEGORY_MENU.map((item) => (
              <Link
                key={item.slug}
                href={`/category/${item.slug}`}
                className="hover:text-[#d4af37] transition font-medium py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-white border-b shadow-lg z-40 px-4 py-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#d4af37]"
            />
            <button className="px-6 bg-[#d4af37] text-white rounded-full font-medium hover:bg-[#b59410] transition">
              Tìm
            </button>
            <button
              type="button"
              onClick={toggleSearch}
              className="text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
