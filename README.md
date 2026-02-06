# 🌸 DTPerfume - Website Thương Mại Điện Tử Nước Hoa

DTPerfume là một dự án website thương mại điện tử chuyên bán nước hoa, được xây dựng với mục tiêu học tập và áp dụng thực tế các kỹ năng frontend và backend. Dự án hỗ trợ đầy đủ các chức năng của một hệ thống bán hàng online hiện đại: người dùng, sản phẩm, giỏ hàng, đơn hàng, quản trị, và upload hình ảnh.

---

## 🚀 Tính năng chính

### 👤 Người dùng

* Đăng ký / đăng nhập
* Xác thực tài khoản qua email
* Cập nhật thông tin cá nhân
* Phân quyền (admin / người dùng)

### 🛍️ Sản phẩm

* Hiển thị danh sách sản phẩm
* Trang chi tiết sản phẩm
* Tìm kiếm, lọc theo danh mục / thương hiệu / giá
* Hiển thị giá gốc, giá khuyến mãi, trạng thái

### 🛒 Giỏ hàng & Đơn hàng

* Thêm / xoá / cập nhật số lượng sản phẩm trong giỏ hàng
* Thanh toán và tạo đơn hàng
* Theo dõi trạng thái đơn hàng

### 🛠️ Trang quản trị (Admin)

* Quản lý sản phẩm (thêm, sửa, xoá)
* Upload ảnh sản phẩm (ảnh chính, ảnh phụ, ảnh biến thể)
* Quản lý danh mục
* Quản lí thương hiệu
* Quản lý người dùng
* Quản lý đơn hàng

---

## 🧑‍💻 Công nghệ sử dụng

### Frontend (site)

* **Next.js (React)**
* **TypeScript / TSX**
* **Redux Toolkit** + redux-persist (quản lý giỏ hàng)
* **Framer Motion** (hiệu ứng UI)
* **Tailwind CSS** / CSS Modules
* **Fetch API** (gọi backend)

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **Sequelize ORM**
* **MySQL**
* **Multer** (upload ảnh)
* **JWT** (xác thực)

### Frontend (admin)

* **Next.js (React)**
* **TypeScript / TSX**
* **Framer Motion** (hiệu ứng UI)
* **Tailwind CSS** / CSS Modules
* **Fetch API** (gọi backend)
### Khác

* **Git & GitHub** (quản lý mã nguồn)
* **Vercel** (deploy frontend)

---

## 📁 Cấu trúc dự án

### Site (Next.js)

```
├── 📁 dtperfume-site/
│   ├── 📁 app/
│   │   ├── 📁 (auth)/
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 register/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 (site)/
│   │   │   ├── 📁 brand/
│   │   │   │   └── 📁 [slug]/
│   │   │   │       ├── 📄 BrandClient.tsx
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 cart/
│   │   │   │   ├── 📄 CartItem.tsx
│   │   │   │   ├── 📄 CartSummary.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 category/
│   │   │   │   └── 📁 [slug]/
│   │   │   │       ├── 📄 CategoryClient.tsx
│   │   │   │       ├── 📄 FilterSidebar.tsx
│   │   │   │       ├── 📄 ProductGrid.tsx
│   │   │   │       ├── 📄 SortBar.tsx
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 favorite/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 orders/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 product/
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   │   ├── 📄 ProductDetail.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 profile/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 search/
│   │   │   │   ├── 📄 SearchClient.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 checkout/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 components/
│   │   │   ├── 📁 chat/
│   │   │   │   └── 📄 chatBox.tsx
│   │   │   ├── 📁 common/
│   │   │   │   └── 📄 ProductSliderSection.tsx
│   │   │   ├── 📁 home/
│   │   │   │   ├── 📄 AboutUs.tsx
│   │   │   │   ├── 📄 BestSellersSection.tsx
│   │   │   │   ├── 📄 BrandSection.tsx
│   │   │   │   ├── 📄 CategoriesSection.tsx
│   │   │   │   ├── 📄 CategoryProductsSection.tsx
│   │   │   │   ├── 📄 HeroSection.tsx
│   │   │   │   ├── 📄 NewArrivalsSection.tsx
│   │   │   │   ├── 📄 Policies.tsx
│   │   │   │   └── 📄 StoreSystem.tsx
│   │   │   ├── 📁 layout/
│   │   │   │   ├── 📄 Footer.tsx
│   │   │   │   ├── 📄 Header.tsx
│   │   │   │   └── 📄 TopBar.tsx
│   │   │   ├── 📁 motion/
│   │   │   │   ├── 📄 MotionDiv.tsx
│   │   │   │   └── 📄 MotionSection.tsx
│   │   │   ├── 📁 product/
│   │   │   └── 📁 ui/
│   │   │       └── 📄 ProductCard.tsx
│   │   ├── 📁 lib/
│   │   │   ├── 📄 api.config.ts
│   │   │   ├── 📄 mock.client.ts
│   │   │   └── 📄 mock.server.ts
│   │   ├── 📁 mock/
│   │   │   ├── 📄 auth.mock.ts
│   │   │   ├── 📄 brands.mock.ts
│   │   │   ├── 📄 cart.mock.ts
│   │   │   ├── 📄 categories.mock.ts
│   │   │   ├── 📄 favorite.mock.ts
│   │   │   ├── 📄 orders.mock.ts
│   │   │   ├── 📄 productMock.ts
│   │   │   └── 📄 reviews.mock.ts
│   │   ├── 📁 payment-success/
│   │   │   ├── 📄 PaymentSuccessClient.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 service/
│   │   │   ├── 📄 auth.service.ts
│   │   │   ├── 📄 brand.service.ts
│   │   │   ├── 📄 cart.service.ts
│   │   │   ├── 📄 category.service.ts
│   │   │   ├── 📄 favorite.service.ts
│   │   │   ├── 📄 order.service.ts
│   │   │   ├── 📄 product.service.ts
│   │   │   └── 📄 review.service.ts
│   │   ├── 📁 store/
│   │   │   ├── 📁 slices/
│   │   │   │   ├── 📄 auth.slice.ts
│   │   │   │   ├── 📄 cart.local.slice.ts
│   │   │   │   ├── 📄 cart.slice.ts
│   │   │   │   ├── 📄 favorite.local.slice.ts
│   │   │   │   └── 📄 favorite.slice.ts
│   │   │   ├── 📁 thunks/
│   │   │   │   ├── 📄 auth.thunk.ts
│   │   │   │   ├── 📄 cart.thunks.ts
│   │   │   │   └── 📄 favorite.thunks.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 types/
│   │   │   ├── 📄 auth.ts
│   │   │   ├── 📄 brand.ts
│   │   │   ├── 📄 cart.ts
│   │   │   ├── 📄 category.ts
│   │   │   ├── 📄 order.ts
│   │   │   ├── 📄 product.ts
│   │   │   └── 📄 review.ts
│   │   ├── 📁 utils/
│   │   │   ├── 📄 cartLocal.ts
│   │   │   └── 📄 price.ts
│   │   ├── 📄 AuthBootstrap.tsx
│   │   ├── 📄 CartBootstrap.tsx
│   │   ├── 📄 FavoriteBootstrap.tsx
│   │   ├── 📄 favicon.ico
│   │   ├── 🎨 globals.css
│   │   ├── 📄 layout.tsx
│   │   └── 📄 providers.tsx
│   ├── 📁 public/
│   │   ├── 📁 images/
│   │   │   ├── 🖼️ about-image.jpg
│   │   │   └── 🖼️ bluechanel.jpg
│   │   ├── 🖼️ file.svg
│   │   ├── 🖼️ globe.svg
│   │   ├── 🖼️ next.svg
│   │   ├── 🖼️ vercel.svg
│   │   └── 🖼️ window.svg
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.mjs
│   ├── 📄 next-env.d.ts
│   ├── 📄 next.config.ts
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 postcss.config.mjs
│   └── ⚙️ tsconfig.json
```

### Backend (Express + Sequelize)

```
├── 📁 DTPerfume-backend/
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   ├── 📄 cloudinary.js
│   │   │   ├── 📄 database.js
│   │   │   └── 📄 multer.js
│   │   ├── 📁 controllers/
│   │   │   ├── 📄 authController.js
│   │   │   ├── 📄 brandController.js
│   │   │   ├── 📄 cartController.js
│   │   │   ├── 📄 categoryController.js
│   │   │   ├── 📄 dashboardController.js
│   │   │   ├── 📄 favoriteController.js
│   │   │   ├── 📄 orderController.js
│   │   │   ├── 📄 productControlller.js
│   │   │   ├── 📄 reviewController.js
│   │   │   └── 📄 stripeWebhook.js
│   │   ├── 📁 middlewares/
│   │   │   ├── 📄 middleware.js
│   │   │   ├── 📄 upload.js
│   │   │   ├── 📄 uploadBrand.js
│   │   │   └── 📄 uploadCategoryImage.js
│   │   ├── 📁 models/
│   │   │   ├── 📄 Brands.js
│   │   │   ├── 📄 CartItems.js
│   │   │   ├── 📄 Carts.js
│   │   │   ├── 📄 Categories.js
│   │   │   ├── 📄 FavoriteItems.js
│   │   │   ├── 📄 FavoritesList.js
│   │   │   ├── 📄 OrderItems.js
│   │   │   ├── 📄 Orders.js
│   │   │   ├── 📄 ProductCategory.js
│   │   │   ├── 📄 ProductImages.js
│   │   │   ├── 📄 ProductVariants.js
│   │   │   ├── 📄 Products.js
│   │   │   ├── 📄 Reviews.js
│   │   │   ├── 📄 Users.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 routes/
│   │   │   ├── 📄 authRoutes.js
│   │   │   ├── 📄 brandRoutes.js
│   │   │   ├── 📄 cartRoutes.js
│   │   │   ├── 📄 categoryRoutes.js
│   │   │   ├── 📄 chatRoutes.js
│   │   │   ├── 📄 dashboardRoutes.js
│   │   │   ├── 📄 favoriteRoutes.js
│   │   │   ├── 📄 orderRoutes.js
│   │   │   ├── 📄 productRoutes.js
│   │   │   ├── 📄 reviewRoutes.js
│   │   │   └── 📄 stripeRoutes.js
│   │   ├── 📄 app.js
│   │   └── 📄 server.js
│   ├── 📁 uploads/
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json
```
### Admin (Next.js)

```
├── 📁 dtperfume-admin/
│   ├── 📁 app/
│   │   ├── 📁 (admin)/
│   │   │   ├── 📁 brand/
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   │   └── 📁 edit/
│   │   │   │   │       └── 📄 page.tsx
│   │   │   │   ├── 📁 create/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 category/
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   │   └── 📁 edit/
│   │   │   │   │       └── 📄 page.tsx
│   │   │   │   ├── 📁 create/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 order/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 product/
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   │   ├── 📁 edit/
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 create/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 user/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 components/
│   │   │   ├── 📄 Header.tsx
│   │   │   └── 📄 Sidebar.tsx
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 favicon.ico
│   │   ├── 🎨 globals.css
│   │   └── 📄 layout.tsx
│   ├── 📁 public/
│   │   ├── 🖼️ file.svg
│   │   ├── 🖼️ globe.svg
│   │   ├── 🖼️ next.svg
│   │   ├── 🖼️ vercel.svg
│   │   └── 🖼️ window.svg
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.mjs
│   ├── 📄 next-env.d.ts
│   ├── 📄 next.config.ts
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 postcss.config.mjs
│   └── ⚙️ tsconfig.json
```
---

## ⚙️ Cài đặt & chạy dự án

### 1. Clone và cài đặt dự án(Backend)

```bash
git clone https://github.com/nguyendotai/DTPerfume-backend.git
npm install
npm run dev
```

### 2. Clone và cài đặt dự án(Frontend)

```bash
git clone https://github.com/nguyendotai/DTPerfume-site.git
npm install
npm run dev
```

### 3. Clone và cài đặt dự án(Admin)

```bash
git clone https://github.com/nguyendotai/DTPerfume-admni.git
npm install
npm run dev
```

### 4. Cấu hình môi trường (.env)

Backend:

```
PORT=4000
DB_NAME=dtperfume     
DB_USER=root             
DB_PASSWORD=            
DB_HOST=localhost

JWT_SECRET=supersecret

STRIPE_SECRET_KEY=sk_test_51SGfBD2Lfs8gA1ECrUc9EaW7nLpHmZdH9ReOItXE9JIFD97sh7aaOLTH2biph7LTlhfKPI7oh98RdMhAJ30uoGKz00KnriG3Uu
STRIPE_PUBLISHABLE_KEY=pk_test_51SGfBD2Lfs8gA1ECbc0ikICRWhbANoiwVMlbdMyVDAUBDwH4ObgNDMx74l5fw2ZYs4awZ4ScnN5zLy3ABnTqOtCT00D1OxTVrd
STRIPE_WEBHOOK_SECRET=whsec_9b58797a1cefb5d6d820db0f175580f9a7db28bf74f66b4209d7afb49a18126c

OPENAI_API_KEY=ssk-proj-8AP1PhZ_3KLmn7suT0fmnlquUB5ChHjclzCV74qhwDUXaeuIzaOQ5M-eR3EQM06XeaPAIBLtrzT3BlbkFJpjPixDbc4Qt3mXTnFZspriPf9SKHA4GIGWcEHPT0GsbjC3e6NZ16E6TBqjT_kXV0ytGk2wJ-oA

CLOUDINARY_CLOUD_NAME=dovmfzcnk
CLOUDINARY_API_KEY=347133623652791
CLOUDINARY_API_SECRET=tOHJ-yyb-7P0cVGjzK-yuYOuvqk
```

Frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_USE_MOCK=false
```

---

## 🧠 Mục tiêu học tập

* Hiểu và áp dụng mô hình **MVC** trong backend
* Xây dựng hệ thống xác thực người dùng thực tế
* Thực hành upload ảnh và quản lý file
* Làm việc với API RESTful
* Quản lý trạng thái frontend bằng Redux
* Tối ưu UI/UX với animation
* Triển khai dự án thực tế lên môi trường production

---

## 📸 Demo & Link dự án

* Website: https://dt-perfume-site-iidtbl0vn-nguyendotais-projects.vercel.app
* Admin panel: *(điền link nếu có)*
* GitHub repo: *(điền link nếu có)*

---

## 👤 Tác giả

**Tai Nguyen**
Frontend Developer (Intern)

* GitHub: [*(link github)*](https://github.com/nguyendotai)
* Portfolio: *(link portfolio)*

---

## 📄 Giấy phép

Dự án phục vụ mục đích học tập và phi thương mại.

---

✨ Nếu bạn là nhà tuyển dụng hoặc người học khác, đừng ngần ngại liên hệ hoặc góp ý để dự án ngày càng hoàn thiện hơn!
