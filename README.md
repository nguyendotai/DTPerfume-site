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
│   │   │   └── 📁 register/
│   │   ├── 📁 (site)/
│   │   │   ├── 📁 brand/
│   │   │   │   └── 📁 [slug]/
│   │   │   ├── 📁 cart/
│   │   │   ├── 📁 category/
│   │   │   │   └── 📁 [slug]/
│   │   │   ├── 📁 favorite/
│   │   │   ├── 📁 orders/
│   │   │   ├── 📁 product/
│   │   │   │   ├── 📁 [slug]/
│   │   │   ├── 📁 profile/
│   │   │   ├── 📁 search/
│   │   ├── 📁 checkout/
│   │   ├── 📁 components/
│   │   │   ├── 📁 chat/
│   │   │   ├── 📁 common/
│   │   │   ├── 📁 home/
│   │   │   ├── 📁 layout/
│   │   │   ├── 📁 motion/
│   │   │   ├── 📁 product/
│   │   │   └── 📁 ui/
│   │   ├── 📁 lib/
│   │   ├── 📁 mock/
│   │   ├── 📁 payment-success/
│   │   ├── 📁 service/
│   │   ├── 📁 store/
│   │   │   ├── 📁 slices/
│   │   │   ├── 📁 thunks/
│   │   ├── 📁 types/
│   │   ├── 📁 utils/
│   ├── 📁 public/
│   │   ├── 📁 images/
```

### Backend (Express + Sequelize)

```
├── 📁 DTPerfume-backend/
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   ├── 📁 controllers/
│   │   ├── 📁 middlewares/
│   │   ├── 📁 models/
│   │   ├── 📁 routes/
│   │   ├── 📄 app.js
│   │   └── 📄 server.js
│   ├── 📁 uploads/
```
### Admin (Next.js)

```
├── 📁 dtperfume-admin/
│   ├── 📁 app/
│   │   ├── 📁 (admin)/
│   │   │   ├── 📁 brand/
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   │   └── 📁 edit/
│   │   │   │   ├── 📁 create/
│   │   │   ├── 📁 category/
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   │   └── 📁 edit/
│   │   │   │   ├── 📁 create/
│   │   │   ├── 📁 order/
│   │   │   ├── 📁 product/
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   │   ├── 📁 edit/
│   │   │   │   ├── 📁 create/
│   │   │   ├── 📁 user/
│   │   ├── 📁 components/
│   │   ├── 📁 login/
│   ├── 📁 public/
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
git clone https://github.com/nguyendotai/DTPerfume-admin.git
npm install
npm run dev
```

### 4. Cấu hình môi trường (.env)

Backend:

```
```

Frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
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
* GitHub repo: https://github.com/nguyendotai/DTPerfume-site

---

## 👤 Tác giả

**Tai Nguyen**
Frontend Developer

* GitHub: [*(link github)*](https://github.com/nguyendotai)
* Portfolio: [*(link portfolio)*](https://portfolio-xi-nine-jwe6t3zoza.vercel.app/)

---

## 📄 Giấy phép

Dự án phục vụ mục đích học tập và phi thương mại.

---

✨ Nếu bạn là nhà tuyển dụng hoặc người học khác, đừng ngần ngại liên hệ hoặc góp ý để dự án ngày càng hoàn thiện hơn!
