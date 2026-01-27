import { ProductVariant } from "./product";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: number;
  order_id: number;
  variant_id: number;
  price: number | string;
  quantity: number;
  variant?: ProductVariant;
}

export interface Order {
  id: number;
  user_id?: number | null;
  total_price: number;
  discount: number;
  status: OrderStatus;
  payment_method: "stripe" | "cod";
  shipping_address: any;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}
