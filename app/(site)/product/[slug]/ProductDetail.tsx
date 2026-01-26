"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/app/types/product";
import { formatPrice } from "@/app/utils/price";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  createReviewService,
  getReviewsByProductService,
} from "@/app/service/review.service";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [reviews, setReviews] = useState(product.reviews || []);
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);

  const variants = product.variants || [];
  const initialVariant =
    variants.find((v) => v.stock > 0) || variants[0] || ({} as ProductVariant);

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(initialVariant);

  const mainImage =
    selectedVariant.variantImages?.[0]?.url ||
    product.images?.find((img) => img.is_main)?.url ||
    product.images?.[0]?.url ||
    "/placeholder.png";

  const rating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : null;

  const handleSubmitReview = async () => {
    if (!token) {
      alert("Vui lòng đăng nhập để đánh giá!");
      return;
    }

    try {
      setLoadingReview(true);
      await createReviewService(
        {
          product_id: product.id,
          rating: ratingInput,
          comment: commentInput,
        },
        token,
      );

      const res = await getReviewsByProductService(product.id);
      setReviews(res.reviews);

      setRatingInput(5);
      setCommentInput("");
    } catch (err: any) {
      alert(err.message || "Gửi đánh giá thất bại!");
    } finally {
      setLoadingReview(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10 bg-gradient-to-b from-amber-50/30 to-white">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-5 font-medium">
        <Link href="/" className="hover:text-amber-700 transition-colors">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Images */}
        <div className="space-y-5">
          <div className="bg-white border border-amber-200/60 rounded-2xl overflow-hidden shadow-md shadow-amber-100/50">
            <div className="aspect-square relative">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-amber-300">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Image
                    src={img.url}
                    alt={img.alt || product.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-xl">★★★★★</span>
                <span className="text-sm font-medium text-gray-700">
                  {rating || "Chưa có đánh giá"} •{" "}
                  {product.reviews?.length || 0}
                </span>
              </div>
              {product.gender && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-amber-800">
                  {product.gender === "male"
                    ? "Nam"
                    : product.gender === "female"
                      ? "Nữ"
                      : "Unisex"}
                </span>
              )}
            </div>
          </div>

          {/* Brand & Info */}
          <div className="text-sm space-y-1.5 text-gray-700 font-medium">
            <p>
              Thương hiệu:{" "}
              <span className="text-amber-700 font-semibold">
                {product.brand?.name || "—"}
              </span>
            </p>
            <p>Nồng độ: {product.concentration || "—"}</p>
          </div>

          {/* Variants */}
          {variants.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Dung tích
              </p>
              <div className="flex flex-wrap gap-3">
                {variants.map((variant) => {
                  const variantImage =
                    variant.variantImages?.[0]?.url ||
                    product.images?.[0]?.url ||
                    "/placeholder.png";
                  const isActive = variant.id === selectedVariant.id;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`
                        group relative flex flex-col items-center w-24 p-3 rounded-xl border transition-all duration-300
                        ${
                          isActive
                            ? "border-amber-500 bg-gradient-to-b from-amber-50 to-white shadow-md shadow-amber-200/60"
                            : "border-amber-200 hover:border-amber-400 hover:shadow-md"
                        }
                      `}
                    >
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white border border-amber-100">
                        <Image
                          src={variantImage}
                          alt={`${product.name} ${variant.volume_ml}ml`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <span className="mt-2 text-sm font-semibold text-gray-800">
                        {variant.volume_ml}ml
                      </span>

                      {isActive && (
                        <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                          Đã chọn
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & CTA */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 border border-amber-200/70 rounded-2xl p-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-end gap-3">
                {selectedVariant.discount_price &&
                  selectedVariant.discount_price !== "0.00" &&
                  selectedVariant.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(Number(selectedVariant.price))}
                    </span>
                  )}

                <span className="text-4xl sm:text-5xl font-black text-amber-700 tracking-tight">
                  {formatPrice(
                    Number(
                      selectedVariant.discount_price !== "0.00"
                        ? selectedVariant.discount_price
                        : selectedVariant.price || 0,
                    ),
                  )}
                </span>
              </div>

              {selectedVariant.discount_price !== "0.00" &&
                selectedVariant.price && (
                  <p className="text-amber-700 font-medium">
                    Tiết kiệm{" "}
                    {Math.round(
                      ((Number(selectedVariant.price) -
                        Number(selectedVariant.discount_price)) /
                        Number(selectedVariant.price)) *
                        100,
                    )}
                    %
                  </p>
                )}

              <p
                className={`font-bold text-base ${
                  selectedVariant.stock > 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {selectedVariant.stock > 0 ? "CÒN HÀNG" : "HẾT HÀNG"}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Số lượng:</span>
                <select className="border border-amber-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-4 rounded-xl transition-all shadow-md">
                  Thêm vào giỏ
                </button>
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md">
                  Mua ngay
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 grid grid-cols-3 gap-2 text-xs text-gray-600 text-center">
              <div>🚚 Freeship toàn quốc</div>
              <div>🛡️ Chính hãng 100%</div>
              <div>🔁 Đổi trả miễn phí</div>
            </div>
          </div>

          <p className="text-center text-amber-700 font-medium text-sm mt-4">
            Hotline đặt hàng: 1900 0129 (9:00 - 21:00)
          </p>
        </div>
      </div>

      {/* Chi tiết */}
      <section className="mt-12 pt-10 border-t border-amber-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Chi tiết sản phẩm
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 text-gray-700 text-[15px]">
          <div className="space-y-3">
            <p>
              <span className="text-gray-500">Mã hàng:</span>{" "}
              {selectedVariant.sku || "—"}
            </p>
            <p>
              <span className="text-gray-500">Thương hiệu:</span>{" "}
              <span className="text-amber-700 font-medium">
                {product.brand?.name}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Danh mục:</span>{" "}
              {product.categories?.map((c) => c.name).join(", ") || "—"}
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <span className="text-gray-500">Giới tính:</span>{" "}
              {product.gender === "male"
                ? "Nam"
                : product.gender === "female"
                  ? "Nữ"
                  : "Unisex"}
            </p>
            <p>
              <span className="text-gray-500">Nồng độ:</span>{" "}
              {product.concentration || "—"}
            </p>
            <p>
              <span className="text-gray-500">Tình trạng:</span>{" "}
              {product.status ? "Đang bán" : "Ngừng bán"}
            </p>
          </div>
        </div>

        {product.description && (
          <div className="mt-10 prose prose-amber prose-headings:text-gray-900 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </section>
      {/* REVIEWS */}
      <section className="mt-16 pt-10 border-t border-amber-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Đánh giá từ khách hàng
        </h2>

        {/* FORM REVIEW */}
        {token && (
          <div className="mb-10 bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">
              Viết đánh giá của bạn
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-medium">Số sao:</span>
              <select
                value={ratingInput}
                onChange={(e) => setRatingInput(Number(e.target.value))}
                className="border border-amber-300 rounded-lg px-3 py-2"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} ⭐
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              className="w-full border border-amber-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-amber-400"
              rows={4}
            />

            <button
              onClick={handleSubmitReview}
              disabled={loadingReview}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition disabled:opacity-50"
            >
              {loadingReview ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </div>
        )}

        {/* LIST REVIEWS */}
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className="bg-white border border-amber-100 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900">
                    {review.user?.name || "Khách hàng"}
                  </div>
                  <div className="text-amber-500 font-bold">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">
            Chưa có đánh giá nào cho sản phẩm này.
          </p>
        )}
      </section>
    </main>
  );
}
