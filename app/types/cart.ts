import { ProductVariant } from "./product";

export interface CartItem {
  id: number;
  variant_id: number;
  quantity: number;

  price: string;
  discount_price?: string;

  variant: ProductVariant;
}
