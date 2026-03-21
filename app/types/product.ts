import { Category } from "./category";
import { Review } from "./review";
import { Brand } from "./brand";

export interface ProductVariant {
  id: number;
  product_id?: number;

  version?: string;
  volume_ml?: number;

  sku: string;
  barcode: string;

  price?: string; 
  discount_price?: string; 

  stock: number;

  createdAt?: string;
  updatedAt?: string;

  product?: Product;
  variantImages?: ProductImage[];
}

export interface ProductImage {
  id: number;

  url: string;
  alt: string;

  product_id?: number | null;
  variant_id?: number | null;

  is_main: boolean;

  createdAt?: string;
  updatedAt?: string;

  product?: Product;
  variants?: ProductVariant;
}
export type ProductType = "single" | "set";
export type ProductConcentration = "EDP" | "EDT" | "Parfum";
export type ProductGender = "male" | "female" | "unisex";

export interface Product {
  id: number;

  name: string;
  slug: string;

  type: ProductType;
  description?: string;

  brand_id: number;
  brand?: Brand;
  concentration: ProductConcentration;
  gender: ProductGender;

  status: boolean;

  createdAt?: string;
  updatedAt?: string;

  variants?: ProductVariant[];
  images?: ProductImage[];
  categories?: Category[];
  reviews?: Review[];
}
