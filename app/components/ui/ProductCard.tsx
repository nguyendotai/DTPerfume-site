"use client";

import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { Product } from "@/app/types/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk, getCartThunk } from "@/app/store/thunks/cart.thunks";
import { RootState } from "@/app/store";
import { addLocalItem } from "@/app/store/slices/cart.local.slice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  addToFavoriteThunk,
  removeFavoriteItemThunk,
  getFavoriteThunk,
} from "@/app/store/thunks/favorite.thunks";
import {
  addLocalFavoriteItem,
  removeLocalFavoriteItem,
} from "@/app/store/slices/favorite.local.slice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const images = product.images ?? [];
  const variants = product.variants ?? [];

  const dispatch = useDispatch<any>();
  const token = useSelector((state: RootState) => state.auth.token);

  const firstVariant = variants[0];

  const isLoggedIn = Boolean(
    token && token !== "null" && token !== "undefined",
  );

  // ===== FAVORITE STATE =====
  const localFavoriteItems = useSelector(
    (state: RootState) => state.favoriteLocal.items,
  );

  const favoriteItems = useSelector((state: RootState) => state.favorite.items);

  const favoriteItem = isLoggedIn
    ? favoriteItems.find((item) => item.variant?.id === firstVariant?.id)
    : localFavoriteItems.find((item) => item.variant_id === firstVariant?.id);

  const isFavorited = Boolean(favoriteItem);

  // ===== IMAGE =====
  const image =
    images.find((img) => img.is_main)?.url ||
    images[0]?.url ||
    "/placeholder.png";

  // ===== ADD TO CART =====
  const handleAddToCart = () => {
    if (!firstVariant) {
      toast.error("Sản phẩm chưa có phiên bản");
      return;
    }

    const price =
      firstVariant.discount_price != null &&
      Number(firstVariant.discount_price) > 0
        ? Number(firstVariant.discount_price)
        : Number(firstVariant.price);

    // 🔥 CHƯA LOGIN → LOCAL CART
    if (!isLoggedIn) {
      dispatch(
        addLocalItem({
          variant_id: firstVariant.id,
          quantity: 1,
          product: {
            id: product.id,
            name: product.name,
            image,
            price,
          },
        }),
      );

      toast.success("Đã thêm vào giỏ hàng");
      return;
    }

    // 🔥 ĐÃ LOGIN → API
    toast.loading("Đang thêm vào giỏ hàng...", { id: "add-cart" });

    dispatch(
      addToCartThunk({
        variant_id: firstVariant.id,
        quantity: 1,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Đã thêm vào giỏ hàng", { id: "add-cart" });
        dispatch(getCartThunk());
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Thêm vào giỏ hàng thất bại", { id: "add-cart" });
      });
  };

  // ===== TOGGLE FAVORITE =====
  const handleToggleFavorite = () => {
    if (!firstVariant) {
      toast.error("Sản phẩm chưa có phiên bản");
      return;
    }

    const variantId = firstVariant.id;

    // 🔥 CHƯA LOGIN → LOCAL FAVORITE
    if (!isLoggedIn) {
      if (isFavorited) {
        dispatch(removeLocalFavoriteItem(variantId));
        toast.success("Đã xóa khỏi yêu thích");
      } else {
        const price =
          firstVariant.discount_price && Number(firstVariant.discount_price) > 0
            ? Number(firstVariant.discount_price)
            : Number(firstVariant.price);

        dispatch(
          addLocalFavoriteItem({
            variant_id: variantId,
            product: {
              id: product.id,
              name: product.name,
              image,
              price,
            },
          }),
        );
        toast.success("Đã thêm vào yêu thích");
      }
      return;
    }

    // 🔥 ĐÃ LOGIN → API
    if (isFavorited && favoriteItem && "id" in favoriteItem) {
      dispatch(removeFavoriteItemThunk(favoriteItem.id))
        .unwrap()
        .then(() => {
          toast.success("Đã xóa khỏi yêu thích");
          dispatch(getFavoriteThunk());
        })
        .catch(() => toast.error("Xóa yêu thích thất bại"));
    }
  };

  // ===== PRICE RANGE =====
  const prices = variants
    .map((v) =>
      Number(
        v.discount_price && Number(v.discount_price) > 0
          ? v.discount_price
          : v.price,
      ),
    )
    .filter((p) => p > 0);

  let priceText = "Liên hệ";

  if (prices.length === 1) {
    priceText = `${prices[0].toLocaleString("vi-VN")}đ`;
  } else if (prices.length > 1) {
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    priceText =
      min === max
        ? `${min.toLocaleString("vi-VN")}đ`
        : `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  }

  const goToDetail = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToDetail}
    >
      {/* IMAGE */}
      <div className="relative aspect-square bg-white rounded-md overflow-hidden">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* INFO */}
      <div className="mt-4 space-y-1 text-left">
        {/* Brand */}
        <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          {product.brand?.name || "Unknown Brand"}
        </p>

        {/* Name */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-10">
          {product.name}
        </h3>

        {/* PRICE / ICONS */}
        <div className="relative h-10 overflow-hidden">
          {/* Price */}
          <p
            className={`absolute inset-0 text-[#d4af37] font-semibold text-sm transition-all duration-300 ${
              hovered ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {priceText}
          </p>

          {/* Icons */}
          <div
            className={`absolute inset-0 flex items-center gap-4 transition-all duration-300 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="p-2 border rounded-full hover:bg-black hover:text-white transition"
            >
              <ShoppingCart size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite();
              }}
              className={`p-2 border rounded-full transition ${
                isFavorited
                  ? "bg-red-500 text-white border-red-500"
                  : "hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2 border rounded-full hover:bg-gray-800 hover:text-white transition"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        {/* Sizes */}
        {variants.length > 0 && (
          <p className="text-xs text-gray-500">{variants.length} Sizes</p>
        )}
      </div>
    </div>
  );
}
