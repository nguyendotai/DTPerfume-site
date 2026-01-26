export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  isActive?: boolean;
  isMain?: boolean;
}
