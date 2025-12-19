import apiClient from './client';
import type { Cart } from './types';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface AddToCartRequest {
  idProduct: number;
  quantity: number;
}

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    try {
      const response = await apiClient.get<ApiResponse<Cart>>('/shopping/send-cart');
      return response.data.data;
    } catch (error: unknown) {
      // Return empty cart if no cart exists yet (404)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 404) {
          return { id: 0, idUser: 0, email: '', total: 0, cartItems: [] };
        }
      }
      throw error;
    }
  },

  addItem: async (productId: number, quantity: number): Promise<Cart> => {
    const payload: AddToCartRequest = { idProduct: productId, quantity };
    const response = await apiClient.post<ApiResponse<Cart>>('/shopping/add-to-cart', payload);
    return response.data.data;
  },

  removeItem: async (productId: number): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>('/shopping/remove-from-cart', {
      data: { idProduct: productId },
    });
    return response.data.data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.get('/shopping/clear-cart');
  },
};
