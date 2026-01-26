"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "@/app/store/slices/cart.slice";
import { clearLocalCart } from "@/app/store/slices/cart.local.slice";

export default function PaymentSuccessPage() {
  const dispatch = useDispatch();
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    dispatch(resetCart());
    dispatch(clearLocalCart());

    // Trigger explosion after a tiny delay for dramatic effect
    const timer = setTimeout(() => {
      setIsExploded(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Background subtle golden particles / bokeh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(245,158,11,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Confetti / explosion layer */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            isExploded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 animate-burst">
            {/* Simple CSS confetti simulation - you can replace with real confetti lib later */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-amber-400 rounded-full animate-particle-1" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-amber-300 rounded-full animate-particle-2" />
            <div className="absolute top-1/2 left-1/2 w-2 h-5 bg-yellow-300 rounded-full animate-particle-3" />
            <div className="absolute top-1/2 left-1/2 w-5 h-2 bg-amber-500 rounded-full animate-particle-4" />
            {/* Duplicate more for denser burst */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-amber-200 rounded-full animate-particle-5" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-particle-6" />
          </div>
        </div>

        {/* Main content */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isExploded
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-90 opacity-0 translate-y-12"
          }`}
        >
          <div className="relative inline-block mb-10">
            {/* Big checkmark with glow */}
            <div className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 animate-pulse-slow">
              ✓
            </div>

            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-500/20 blur-3xl animate-pulse-slow" />
          </div>

          <h1 className="text-4xl md:text-6xl font-light tracking-wider text-white uppercase mb-6">
            Thanh toán thành công!
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12">
            Cảm ơn bạn đã tin tưởng và ủng hộ{" "}
            <span className="text-amber-400 font-normal">DT Perfume</span> 💛
          </p>

          <div className="space-y-6">
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Đơn hàng của bạn đang được chuẩn bị tỉ mỉ. Chúng tôi sẽ sớm liên hệ
              để xác nhận và giao hàng nhanh chóng nhất có thể.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
              <a
                href="/orders"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-light tracking-widest uppercase rounded-xl shadow-xl hover:shadow-amber-900/40 transition-all duration-500 hover:scale-105"
              >
                Xem đơn hàng
              </a>

              <a
                href="/"
                className="inline-flex items-center px-10 py-5 border border-amber-600/50 text-amber-400 hover:bg-amber-950/30 font-light tracking-widest uppercase rounded-xl transition-all duration-500 hover:scale-105"
              >
                Tiếp tục mua sắm
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to tailwind.config or global CSS */}
      {/* For real burst effect, consider adding tailwind animate or framer-motion */}
      <style jsx global>{`
        @keyframes burst {
          0% {
            transform: scale(0.1) translate(-50%, -50%);
            opacity: 1;
          }
          100% {
            transform: scale(8) translate(-50%, -50%);
            opacity: 0;
          }
        }
        .animate-burst {
          animation: burst 1.8s ease-out forwards;
        }

        @keyframes particle-1 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-280px, -420px); opacity: 0; }
        }
        .animate-particle-1 { animation: particle-1 2s ease-out forwards; }

        @keyframes particle-2 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(320px, -380px); opacity: 0; }
        }
        .animate-particle-2 { animation: particle-2 2.2s ease-out forwards; }

        @keyframes particle-3 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-180px, 400px); opacity: 0; }
        }
        .animate-particle-3 { animation: particle-3 2.4s ease-out forwards; }

        @keyframes particle-4 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(400px, 320px); opacity: 0; }
        }
        .animate-particle-4 { animation: particle-4 2s ease-out forwards; }

        @keyframes particle-5 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(240px, -460px); opacity: 0; }
        }
        .animate-particle-5 { animation: particle-5 2.3s ease-out forwards; }

        @keyframes particle-6 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-360px, 280px); opacity: 0; }
        }
        .animate-particle-6 { animation: particle-6 2.1s ease-out forwards; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}