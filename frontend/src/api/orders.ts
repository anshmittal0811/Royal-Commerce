import apiClient from './client';
import type { Order, Payment, CreatePaymentRequest } from './types';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export const ordersApi = {
  getMyOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<ApiResponse<Order[]>>('/orders/my-orders');
    return response.data.data || [];
  },

  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get<ApiResponse<Order[]>>('/orders/all');
    return response.data.data || [];
  },

  getByUser: async (email: string): Promise<Order[]> => {
    const response = await apiClient.get<ApiResponse<Order[]>>(`/orders/user/${email}`);
    return response.data.data || [];
  },

  create: async (): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>('/orders/create');
    return response.data.data;
  },

  // Get order by ID (read-only, no status change)
  getById: async (orderId: number): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`);
    return response.data.data;
  },

  // Update order status to PROCESSING
  process: async (orderId: number): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/bring/${orderId}`);
    return response.data.data;
  },

  complete: async (orderId: number): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>(`/orders/complete/${orderId}`);
    return response.data.data;
  },
};

export const paymentsApi = {
  // Get order details for payment page
  getOrderForPayment: async (orderId: number): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/payment/${orderId}`);
    return response.data.data;
  },

  // Create and process payment
  createPayment: async (request: CreatePaymentRequest): Promise<Payment> => {
    const params = new URLSearchParams();
    params.append('orderid', request.orderId.toString());
    params.append('method', request.method);
    params.append('amount', request.amount.toString());
    params.append('currency', request.currency);
    params.append('description', request.description || `Payment for order #${request.orderId}`);

    const response = await apiClient.post<ApiResponse<Payment>>('/payment/create', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.data;
  },
};
