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

### 1. Clone dự án

```bash
git clone https://github.com/nguyendotai/DTPerfume-site.git
cd dtperfume
```

### 2. Cài đặt backend

```bash
cd backend
npm install
npm run dev
```

### 3. Cài đặt frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Cấu hình môi trường (.env)

Backend:

```
PORT=5000
DB_NAME=dtperfume
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
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

* Website: *(điền link deploy nếu có)*
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
