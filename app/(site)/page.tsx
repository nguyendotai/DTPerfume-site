import HeroSection from "../components/home/HeroSection";
import BrandsSection from "../components/home/BrandSection";
import BestSellersSection from "../components/home/BestSellersSection";
import NewArrivalsSection from "../components/home/NewArrivalsSection";
import CategoriesSection from "../components/home/CategoriesSection";
import CategoryProductsSection from "../components/home/CategoryProductsSection";
import AboutUsSection from "../components/home/AboutUs";
import PoliciesSection from "../components/home/Policies";
import StoreSystemSection from "../components/home/StoreSystem";

import {
  getNewArrivals,
  getBestSellers,
  getProductsByCategorySlug,
} from "../service/product.service";

import { getHomeBrands } from "../service/brand.service";
import {
  getHomeCategories,
  getNonMainCategories,
} from "../service/category.service";
import { CategoryWithProducts } from "../components/home/CategoryProductsSection";

export default async function HomePage() {
  // 🔥 API server
  const [
    bestSellerProducts,
    brands,
    newArrivals,
    mainCategories,
    nonMainCategories,
  ] = await Promise.all([
    getBestSellers(),
    getHomeBrands(16),
    getNewArrivals(),
    getHomeCategories(3), // ✅ MAIN (icon grid)
    getNonMainCategories(), // ✅ NON-MAIN (product slider)
  ]);

  // 🔥 Lấy product theo từng category
  const categoryProducts: CategoryWithProducts[] = await Promise.all(
    nonMainCategories.map(async (category) => {
      const products = await getProductsByCategorySlug(category.slug, 10);

      return {
        category,
        products,
      };
    }),
  );

  return (
    <div>
      <HeroSection />

      <BrandsSection brands={brands} />

      <section className="py-10 max-w-7xl mx-auto px-4">
        <BestSellersSection products={bestSellerProducts} />
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4">
        <NewArrivalsSection products={newArrivals} />
      </section>

      {/* CATEGORY ICON GRID (MAIN) */}
      <section className="py-10 max-w-7xl mx-auto">
        <CategoriesSection categories={mainCategories} />
      </section>

      {/* CATEGORY + PRODUCTS (NON-MAIN) */}
      <CategoryProductsSection items={categoryProducts} />

      <AboutUsSection />
      <PoliciesSection />
      <StoreSystemSection />
    </div>
  );
}
