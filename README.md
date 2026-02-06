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
* Quản lý người dùng
* Quản lý đơn hàng

---

## 🧑‍💻 Công nghệ sử dụng

### Frontend

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
* **Nodemailer** (gửi email kích hoạt tài khoản)

### Khác

* **EJS** (render một số view backend)
* **Git & GitHub** (quản lý mã nguồn)
* **Vercel** (deploy frontend)

---

## 📁 Cấu trúc dự án (tóm tắt)

### Frontend (Next.js)

```
app/
  (site)/
    products/
    product/[slug]/
    category/[slug]/
  admin/
components/
store/ (Redux)
types/
services/
```

### Backend (Express + Sequelize)

```
controllers/
models/
routes/
middlewares/
config/
app.ts
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
NEXT_PUBLIC_API_URL=http://localhost:5000
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
Frontend Developer (Intern/Junior)

* GitHub: *(link github)*
* Portfolio: *(link portfolio)*

---

## 📄 Giấy phép

Dự án phục vụ mục đích học tập và phi thương mại.

---

✨ Nếu bạn là nhà tuyển dụng hoặc người học khác, đừng ngần ngại liên hệ hoặc góp ý để dự án ngày càng hoàn thiện hơn!
