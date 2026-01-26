"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/app/store";
import {
  getCartThunk,
  updateCartItemThunk,
  removeCartItemThunk,
} from "@/app/store/thunks/cart.thunks";
import {
  removeLocalItem,
  updateLocalQuantity,
} from "@/app/store/slices/cart.local.slice";

import { formatPrice } from "@/app/utils/price";

/* ================= TYPES ================= */
interface LocalCartItem {
  variant_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    image?: string;
    price: number;
  };
}

interface ServerCartItem {
  id: number;
  quantity: number;
  variant: {
    id: number;
    sku: string;
    price: number;
    discount_price?: number;
    variantImages?: { url: string; is_main: boolean }[];
    product: {
      id: number;
      name: string;
      brand?: { name: string };
      images?: { url: string; is_main?: boolean }[];
    };
  };
}

/* ================= PAGE ================= */

export default function CartPage() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => !!state.auth?.user);

  const serverItems = useSelector(
    (state: RootState) => state.cart.items
  ) as ServerCartItem[];
  const localItems = useSelector(
    (state: RootState) => state.cartLocal.items
  ) as LocalCartItem[];

  const cartItems = isAuthenticated ? serverItems : localItems;
  const hasItems = cartItems.length > 0;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartThunk());
    }
  }, []); // 👈 CHỈ CHẠY 1 LẦN KHI VÀO PAGE

  const subtotal = cartItems.reduce((sum, item) => {
    if (isAuthenticated) {
      const i = item as ServerCartItem;
      const price = i.variant.discount_price ?? i.variant.price;
      return sum + price * i.quantity;
    } else {
      const i = item as LocalCartItem;
      return sum + i.product.price * i.quantity;
    }
  }, 0);

  const handleUpdateQuantity = (
    item: ServerCartItem | LocalCartItem,
    delta: number
  ) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    if (isAuthenticated) {
      dispatch(
        updateCartItemThunk({
          item_id: (item as ServerCartItem).id,
          quantity: newQty,
        })
      );
    } else {
      dispatch(
        updateLocalQuantity({
          variant_id: (item as LocalCartItem).variant_id,
          quantity: newQty,
        })
      );
    }
  };

  const handleRemove = (item: ServerCartItem | LocalCartItem) => {
    if (isAuthenticated) {
      dispatch(removeCartItemThunk((item as ServerCartItem).id));
    } else {
      dispatch(removeLocalItem((item as LocalCartItem).variant_id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Giỏ hàng
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Tiếp tục mua sắm
            <ArrowRight size={16} />
          </Link>
        </div>

        {hasItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {cartItems.map((item) => {
                  let image = "/no-image.png";
                  let name = "";
                  let brand = "";
                  let price = 0;
                  let discountPrice: number | undefined;

                  if (isAuthenticated) {
                    const i = item as ServerCartItem;
                    image =
                      i.variant.variantImages?.find((x) => x.is_main)?.url ||
                      i.variant.product.images?.find((x) => x.is_main)?.url ||
                      i.variant.product.images?.[0]?.url ||
                      image;
                    name = i.variant.product.name;
                    brand = i.variant.product.brand?.name || "";
                    price = i.variant.price;
                    discountPrice = i.variant.discount_price;
                  } else {
                    const i = item as LocalCartItem;
                    image = i.product.image || image;
                    name = i.product.name;
                    price = i.product.price;
                    // Local cart hiện không có discount → discountPrice giữ undefined
                  }

                  // Logic quan trọng: có giảm giá thật sự hay không
                  const hasDiscount =
                    discountPrice !== undefined &&
                    discountPrice > 0 &&
                    discountPrice < price;

                  const displayPrice = hasDiscount ? discountPrice : price;

                  return (
                    <div
                      key={
                        isAuthenticated
                          ? (item as any).id
                          : (item as any).variant_id
                      }
                      className="flex gap-5 p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Ảnh sản phẩm */}
                      <div className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={image}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 112px, 128px"
                        />
                      </div>

                      {/* Thông tin */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        {brand && (
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {brand}
                          </span>
                        )}
                        <h3 className="mt-1 text-base font-medium text-gray-900 line-clamp-2">
                          {name}
                        </h3>

                        <div className="mt-2 flex items-center gap-3">
                          {hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(price)}
                            </span>
                          )}
                          <span
                            className={`text-lg font-semibold ${
                              hasDiscount ? "text-red-600" : "text-gray-900"
                            }`}
                          >
                            {formatPrice(displayPrice)}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="mt-auto pt-4 flex items-center gap-3">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleUpdateQuantity(item, -1)}
                              disabled={item.quantity <= 1}
                              className="w-10 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item, 1)}
                              className="w-10 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemove(item)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Xóa sản phẩm"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Thanh toán */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Thanh toán
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-red-600">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3.5 rounded-xl transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Tiến hành thanh toán
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Phí vận chuyển & thuế sẽ được tính ở bước tiếp theo
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-8">
              Hãy thêm vài sản phẩm yêu thích vào giỏ ngay nào!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Bắt đầu mua sắm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
