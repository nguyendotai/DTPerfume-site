"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { formatPrice } from "@/app/utils/price";
import { resetCart } from "@/app/store/slices/cart.slice";
import { clearLocalCart } from "@/app/store/slices/cart.local.slice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.variant.discount_price || item.variant.price || "0";
    return sum + Number(price) * item.quantity;
  }, 0);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");

  const handleCheckout = async () => {
    if (!province || !district || !ward || !addressDetail) {
      alert("Vui lòng nhập đầy đủ địa chỉ giao hàng");
      return;
    }

    const payload = {
      user_id: user?.id || null,
      shipping_address: {
        province,
        district,
        ward,
        address_detail: addressDetail,
      },
      payment_method: paymentMethod,
      items: cartItems.map((item) => {
        const price = item.variant.discount_price ?? item.variant.price;
        return {
          variant_id: item.variant.id,
          quantity: item.quantity,
          price,
        };
      }),
    };

    if (paymentMethod === "cod") {
      const res = await fetch("http://localhost:4000/api/orders/create-cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(resetCart());
        dispatch(clearLocalCart());
        window.location.href = `/payment-success?order_id=${data.order_id}`;
      } else {
        alert(data.message || "Đặt hàng thất bại");
      }
      return;
    }

    const res = await fetch("http://localhost:4000/api/orders/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.message || "Không thể tạo phiên thanh toán");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-100">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-white">
            Thanh Toán
          </h1>
          <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          {/* Left - Forms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            {/* Shipping */}
            <section className="space-y-6">
              <h2 className="text-2xl font-light tracking-wide text-amber-100">
                Thông tin giao hàng
              </h2>
              <div className="space-y-6 p-8 bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-light tracking-wide text-gray-400 uppercase">
                      Tỉnh / Thành phố
                    </label>
                    <input
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 outline-none transition duration-300"
                      placeholder="TP. Hồ Chí Minh"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-light tracking-wide text-gray-400 uppercase">
                      Quận / Huyện
                    </label>
                    <input
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 outline-none transition duration-300"
                      placeholder="Quận 1"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-light tracking-wide text-gray-400 uppercase">
                      Phường / Xã
                    </label>
                    <input
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 outline-none transition duration-300"
                      placeholder="Bến Nghé"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-light tracking-wide text-gray-400 uppercase">
                    Địa chỉ chi tiết
                  </label>
                  <input
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 outline-none transition duration-300"
                    placeholder="Số nhà, đường, căn hộ..."
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="space-y-6">
              <h2 className="text-2xl font-light tracking-wide text-amber-100">
                Phương thức thanh toán
              </h2>
              <div className="space-y-5 p-8 bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 rounded-2xl">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1.5 h-5 w-5 accent-amber-600 bg-gray-950 border-gray-600"
                  />
                  <div>
                    <div className="text-lg font-light text-white group-hover:text-amber-300 transition">
                      Thanh toán khi nhận hàng (COD)
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      Thanh toán bằng tiền mặt khi nhận sản phẩm
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                    className="mt-1.5 h-5 w-5 accent-amber-600 bg-gray-950 border-gray-600"
                  />
                  <div>
                    <div className="text-lg font-light text-white group-hover:text-amber-300 transition">
                      Thanh toán qua Stripe
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      Thẻ tín dụng, Apple Pay, Google Pay – bảo mật cao cấp
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right - Summary (Sticky) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-12 p-8 lg:p-10 bg-gradient-to-br from-gray-900 to-black border border-gray-800/80 rounded-2xl shadow-2xl backdrop-blur-md">
              <h2 className="text-2xl font-light tracking-wide text-amber-100 mb-8">
                Đơn hàng của bạn
              </h2>

              <div className="space-y-6 mb-10">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-4 border-b border-gray-800 last:border-b-0"
                  >
                    <div>
                      <p className="font-light text-white">
                        {item.variant.product.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        × {item.quantity}
                      </p>
                    </div>
                    <span className="text-lg font-light text-amber-300 whitespace-nowrap">
                      {formatPrice(
                        Number(item.variant.discount_price || item.variant.price) *
                          item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-800">
                <div className="flex justify-between text-gray-300">
                  <span className="font-light">Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-2xl font-light text-white pt-4">
                  <span>Tổng cộng</span>
                  <span className="text-amber-400">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-10 w-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-white font-light tracking-widest uppercase py-5 rounded-xl transition-all duration-500 shadow-lg hover:shadow-amber-900/30 hover:scale-[1.02]"
              >
                Hoàn tất thanh toán
              </button>

              <p className="mt-6 text-center text-xs text-gray-500">
                Đơn hàng được bảo mật & mã hóa cao cấp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}