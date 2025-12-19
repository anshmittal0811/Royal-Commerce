export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: UserRole;
  address?: string;
  phone?: string;
}

export type UserRole = 'ADMIN' | 'CLIENT';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  address?: string;
  phone?: string;
}

export interface ApiResponse {
  status: 'SUCCESS' | 'ERROR';
  message: string;
}

export interface LoginResponse {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  token: string | null;
}

export type ProductCategory = 'AAA' | 'AA' | 'A';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  imageUrl?: string;
}

export interface CartItem {
  id: number;
  idProduct: number;
  nameProduct: string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  id: number;
  idUser: number;
  email: string;
  total: number;
  cartItems: CartItem[];
}

export interface OrderItem {
  id: number;
  idProduct: number;
  nameProduct: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  orderId: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  address: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED';
  orderDate: string;
}

export type PaymentMethod = 'CARD' | 'PAYPAL' | 'UPI' | 'BANK_TRANSFER';

export interface Payment {
  id: number;
  orderId: number;
  total: number;
  currency: string;
  method: PaymentMethod;
  description?: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export interface CreatePaymentRequest {
  orderId: number;
  method: PaymentMethod;
  amount: number;
  currency: string;
  description?: string;
}
