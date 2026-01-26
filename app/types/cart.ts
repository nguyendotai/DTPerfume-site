import { ProductVariant } from "./product";

export interface CartItem {
  id: number; // cart_item_id
  variant_id: number;
  quantity: number;

  price: string; // snapshot price
  discount_price?: string;

  variant: ProductVariant;
}
