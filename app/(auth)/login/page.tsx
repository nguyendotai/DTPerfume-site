"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/app/store/thunks/auth.thunk";
import { AppDispatch, RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import { syncCartThunk, getCartThunk } from "@/app/store/thunks/cart.thunks";
import { clearLocalCart } from "@/app/store/slices/cart.local.slice";
import {
  addToFavoriteThunk,
  getFavoriteThunk,
} from "@/app/store/thunks/favorite.thunks";
import { clearLocalFavorite } from "@/app/store/slices/favorite.local.slice";

const authImages = [
  "https://thumbs.dreamstime.com/b/elegant-glass-perfume-bottle-filled-amber-liquid-glowing-warmly-under-light-surrounded-swirling-smoke-bokeh-lights-403723199.jpg",
  "https://thumbs.dreamstime.com/b/elegant-glass-perfume-bottle-filled-amber-liquid-glowing-warmly-under-light-surrounded-swirling-smoke-bokeh-lights-403723204.jpg",
  "https://thumbs.dreamstime.com/b/elegant-perfume-bottle-faceted-cap-sits-reflective-surface-bottle-filled-dark-amber-liquid-its-398485361.jpg",
  "https://thumbs.dreamstime.com/b/elegant-perfume-bottle-golden-accents-smoke-dark-background-exquisite-design-details-swirling-against-black-perfect-393616658.jpg",
  "https://thumbs.dreamstime.com/b/ornate-perfume-bottle-gold-lid-sits-dark-surface-surrounded-soft-glowing-smoke-few-scattered-petals-321288321.jpg",
  "https://thumbs.dreamstime.com/b/ultra-realistic-ad-luxury-perfume-bottle-intricate-design-soft-lighting-floral-accents-376445995.jpg",
  "https://thumbs.dreamstime.com/b/luxury-perfume-bottles-gold-marble-veins-modern-design-two-elegant-perfume-bottles-black-transparent-glass-395030756.jpg",
  "https://thumbs.dreamstime.com/b/bottle-perfume-rose-design-marble-surface-surrounded-pearls-roses-ai-generated-bottle-perfume-sitting-404826752.jpg",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { token, loading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  const localFavoriteItems = useSelector(
    (state: RootState) => state.favoriteLocal.items,
  );

  const localItems = useSelector((state: RootState) => state.cartLocal.items);

  useEffect(() => {
    if (token) {
      // ===== SYNC CART =====
      const localCart = JSON.parse(localStorage.getItem("cart_local") || "[]");

      if (localCart.length > 0) {
        dispatch(
          syncCartThunk({
            items: localCart.map((i: any) => ({
              variant_id: i.variant_id,
              quantity: i.quantity,
            })),
          }),
        ).then(() => {
          dispatch(clearLocalCart());
          dispatch(getCartThunk());
        });
      }

      // ===== SYNC FAVORITE =====
      const localFavorite = JSON.parse(
        localStorage.getItem("local_favorite") || "[]",
      );

      if (localFavorite.length > 0) {
        Promise.all(
          localFavorite.map((i: any) =>
            dispatch(addToFavoriteThunk({ variant_id: i.variant_id })),
          ),
        ).then(() => {
          dispatch(clearLocalFavorite());
          dispatch(getFavoriteThunk());
        });
      }

      router.push("/");
    }
  }, [token]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {authImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeInOut"
            style={{
              backgroundImage: `url('${img}')`,
              animationDelay: `${index * 5}s`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            20% {
              opacity: 1;
            }
            25% {
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }
          .animate-fadeInOut {
            animation: fadeInOut 40s infinite; /* 8 ảnh x 5s */
          }
        `}</style>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Login Form */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            <h1 className="text-5xl font-extrabold text-white text-center tracking-widest mb-8 drop-shadow-lg">
              DT Perfume
            </h1>
            <p className="text-xl text-white/90 text-center mb-10 italic">
              Chào mừng quay trở lại
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                  placeholder="nhap@email.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full text-xl font-semibold text-white
             bg-gradient-to-r from-rose-600 to-amber-600
             disabled:opacity-50"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>

              {error && (
                <p className="text-red-400 text-center mt-4">{error}</p>
              )}
            </form>

            <p className="text-center text-white/70 mt-8">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="text-amber-400 hover:underline font-semibold"
              >
                Đăng ký ngay
              </Link>
            </p>

            <Link
              href="/"
              className="block text-center text-white/60 hover:text-white mt-6 text-sm"
            >
              ← Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
