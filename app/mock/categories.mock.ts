// ../mocks/categories.mock.ts
import { Category } from "../types/category";

export const categoriesMock: Category[] = [
  {
    id: 1,
    name: "Nước Hoa Nam",
    slug: "nuoc-hoa-nam",
    description:
      "Danh mục nước hoa nam mang đến những mùi hương tinh tế, mạnh mẽ và đầy cá tính...",
    image:
      "https://res.cloudinary.com/dovmfzcnk/image/upload/v1767890643/categories/n2zdcfhg7b9ih3oykmvw.jpg",
    isActive: true,
    isMain: true,
    createdAt: "2025-11-28T14:29:34.000Z",
    updatedAt: "2026-01-10T14:10:42.000Z",
  },
  {
    id: 2,
    name: "Nước Hoa Nữ",
    slug: "nuoc-hoa-nu",
    description:
      "Danh mục nước hoa nữ quy tụ những mùi hương tinh tế, quyến rũ và đầy cảm xúc...",
    image:
      "https://res.cloudinary.com/dovmfzcnk/image/upload/v1767890792/categories/tobl3obp1t6yfw2splf5.jpg",
    isActive: true,
    isMain: true,
    createdAt: "2025-11-28T14:30:50.000Z",
    updatedAt: "2026-01-10T14:10:48.000Z",
  },
  {
    id: 3,
    name: "Nước Hoa Mini",
    slug: "nuoc-hoa-mini",
    description:
      "Danh mục nước hoa mini mang đến những mùi hương thời thượng trong thiết kế nhỏ gọn...",
    image: "",
    isActive: true,
    isMain: false,
    createdAt: "2025-11-28T14:31:40.000Z",
    updatedAt: "2025-11-28T14:31:40.000Z",
  },
  {
    id: 4,
    name: "Giftset",
    slug: "giftset",
    description:
      "Danh mục Giftset mang đến những bộ quà tặng được thiết kế tinh tế và sang trọng...",
    image: "",
    isActive: true,
    isMain: false,
    createdAt: "2025-11-28T14:32:06.000Z",
    updatedAt: "2025-11-28T14:32:06.000Z",
  },
  {
    id: 6,
    name: "Bodycare & Homecare",
    slug: "bodycare-homecare",
    description:
      "Bodycare là nhóm sản phẩm chăm sóc toàn diện cho cơ thể...",
    image: "",
    isActive: true,
    isMain: false,
    createdAt: "2025-12-13T13:08:24.000Z",
    updatedAt: "2025-12-13T13:08:24.000Z",
  },
  {
    id: 7,
    name: "Nước hoa Niche",
    slug: "nuoc-hoa-niche",
    description:
      "Nước hoa niche là những sáng tạo mùi hương mang đậm dấu ấn cá nhân của nhà chế tác...",
    image:
      "https://res.cloudinary.com/dovmfzcnk/image/upload/v1767891792/categories/u68mdyiyim4b2atzsykz.jpg",
    isActive: true,
    isMain: true,
    createdAt: "2025-12-23T14:37:28.000Z",
    updatedAt: "2026-01-10T14:10:52.000Z",
  },
];
