export interface Item {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: Item[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface Cart {
  id: string,
  user: User,
  items: CartItem[],
  createdAt: Date,
  updatedAt: Date
}

export interface CartItem {
  id?: string,
  item: Item,
  quantity: number
}