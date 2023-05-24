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
  username: string;
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

export enum OrderStatus {
  PENDING,
  PAID,
  CONFIRMED,
  SHIPPED,
  DELIVERED,
  CANCELLED,
  REFUNDED
}

export interface Order { 
  id: string,
  userId: string,
  orderItems: CartItem[],
  status: OrderStatus,
  createdAt: Date
}

export interface Address {
  id?: string,
  fullName: string,
  city: string,
  postalCode: string,
  address: string
  userId?: string;
}