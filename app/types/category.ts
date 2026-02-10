export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  isActive: boolean;
  isMain: boolean;
  createdAt?: string;
  updatedAt?: string;
}
