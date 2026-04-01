"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeThunk, loginThunk } from "@/app/store/thunks/auth.thunk";
import { AppDispatch, RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import { syncCartThunk, getCartThunk } from "@/app/store/thunks/cart.thunks";
import { clearLocalCart } from "@/app/store/slices/cart.local.slice";
import {
  addToFavoriteThunk,
  getFavoriteThunk,
} from "@/app/store/thunks/favorite.thunks";
import { clearLocalFavorite } from "@/app/store/slices/favorite.local.slice";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type FormData = z.infer<typeof schema>;

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(res)) {
      await dispatch(getMeThunk()); 
    }
  };

  useEffect(() => {
    if (!user) return;

    const handleSync = async () => {
      const localCart = JSON.parse(localStorage.getItem("cart_local") || "[]");

      if (localCart.length > 0) {
        await dispatch(
          syncCartThunk({
            items: localCart.map((i: any) => ({
              variant_id: i.variant_id,
              quantity: i.quantity,
            })),
          }),
        );
        dispatch(clearLocalCart());
        dispatch(getCartThunk());
      }

      const localFavorite = JSON.parse(
        localStorage.getItem("local_favorite") || "[]",
      );

      if (localFavorite.length > 0) {
        await Promise.all(
          localFavorite.map((i: any) =>
            dispatch(addToFavoriteThunk({ variant_id: i.variant_id })),
          ),
        );
        dispatch(clearLocalFavorite());
        dispatch(getFavoriteThunk());
      }

      router.push("/");
    };

    handleSync();
  }, [user]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background giữ nguyên */}
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
            animation: fadeInOut 40s infinite;
          }
        `}</style>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            <h1 className="text-5xl font-extrabold text-white text-center mb-8">
              DT Perfume
            </h1>

            <p className="text-xl text-white/90 text-center mb-10 italic">
              Chào mừng quay trở lại
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-5 py-4 rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="nhap@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-5 py-4 rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
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
