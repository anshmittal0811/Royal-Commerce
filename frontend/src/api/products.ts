import apiClient from './client';
import type { Product } from './types';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>('/product');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<ApiResponse<Product>>(`/product/${id}`);
    return response.data.data;
  },

  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    const response = await apiClient.post<ApiResponse<Product>>('/product/save', data);
    return response.data.data;
  },

  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put<ApiResponse<Product>>(`/product/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/product/${id}`);
  },

  // Decrease stock (for cart/order operations)
  decreaseStock: async (productId: number, quantity: number): Promise<Product> => {
    const response = await apiClient.put<ApiResponse<Product>>(
      `/product/update/stock/${productId}`,
      quantity
    );
    return response.data.data;
  },

  // Increase stock (restore/add stock)
  increaseStock: async (productId: number, quantity: number): Promise<Product> => {
    const response = await apiClient.put<ApiResponse<Product>>(
      `/product/restore/stock/${productId}`,
      quantity
    );
    return response.data.data;
  },
};
