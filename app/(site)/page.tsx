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

// Import wrapper (client component)
import MotionSection from "../components/motion/MotionSection"; // điều chỉnh path cho đúng

export default async function HomePage() {
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
    getHomeCategories(3),
    getNonMainCategories(),
  ]);

  const categoryProducts: CategoryWithProducts[] = await Promise.all(
    nonMainCategories.map(async (category) => {
      const products = await getProductsByCategorySlug(category.slug, 10);
      return { category, products };
    })
  );

  return (
    <div className="min-h-screen">
      {/* Hero thường không cần whileInView vì luôn ở đầu trang */}
      <HeroSection />

      {/* Các section còn lại dùng MotionSection */}
      <MotionSection>
        <BrandsSection brands={brands} />
      </MotionSection>

      <MotionSection delay={0.1}>
        <section className="py-10 max-w-7xl mx-auto px-4">
          <BestSellersSection products={bestSellerProducts} />
        </section>
      </MotionSection>

      <MotionSection delay={0.15}>
        <section className="py-10 max-w-7xl mx-auto px-4">
          <NewArrivalsSection products={newArrivals} />
        </section>
      </MotionSection>

      <MotionSection delay={0.2}>
        <section className="py-10 max-w-7xl mx-auto">
          <CategoriesSection categories={mainCategories} />
        </section>
      </MotionSection>

      <MotionSection delay={0.25}>
        <CategoryProductsSection items={categoryProducts} />
      </MotionSection>

      <MotionSection delay={0.3}>
        <AboutUsSection />
      </MotionSection>

      <MotionSection delay={0.35}>
        <PoliciesSection />
      </MotionSection>

      <MotionSection delay={0.4}>
        <StoreSystemSection />
      </MotionSection>
    </div>
  );
}