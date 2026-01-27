// ../mocks/orders.mock.ts
import { Order } from "../types/order";

export const ordersMock: Order[] = [
  {
    id: 1,
    user_id: 5,
    total_price: 1200000,
    discount: 0,
    status: "pending",
    payment_method: "cod",
    shipping_address: {
      name: "Nguyễn Văn A",
      phone: "0900000000",
      address: "123 Nguyễn Trãi, Q.1, TP.HCM",
    },
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
    items: [],
  },
  {
    id: 2,
    user_id: 5,
    total_price: 950000,
    discount: 50000,
    status: "delivered",
    payment_method: "stripe",
    shipping_address: {
      name: "Nguyễn Văn A",
      phone: "0900000000",
      address: "123 Nguyễn Trãi, Q.1, TP.HCM",
    },
    createdAt: "2025-01-08T14:30:00Z",
    updatedAt: "2025-01-09T09:00:00Z",
    items: [],
  },
  {
    id: 3,
    user_id: 7,
    total_price: 780000,
    discount: 0,
    status: "shipped",
    payment_method: "cod",
    shipping_address: {
      name: "Trần Thị B",
      phone: "0911111111",
      address: "456 Lê Lợi, Q.3, TP.HCM",
    },
    createdAt: "2025-01-05T08:15:00Z",
    updatedAt: "2025-01-06T12:00:00Z",
    items: [],
  },
];
