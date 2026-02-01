import type { User, SellerProfile } from "./user";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  tags?: string[];
  seller: User & { sellerProfile: SellerProfile };
  rating?: number;
  reviewCount?: number;
  stock?: number;
  isDigital: boolean;
  digitalDeliveryUrl?: string;
  createdAt: string;
  updatedAt: string;
  status: ProductStatus;
}

export type ProductStatus = "draft" | "active" | "paused" | "sold" | "archived";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: ProductCategory[];
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  user: User;
  rating: number;
  title?: string;
  content: string;
  images?: string[];
  helpful: number;
  createdAt: string;
  updatedAt: string;
}
