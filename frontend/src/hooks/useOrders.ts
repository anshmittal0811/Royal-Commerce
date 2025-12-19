import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, paymentsApi } from '../api/orders';
import type { CreatePaymentRequest } from '../api/types';

export function useOrders() {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getMyOrders,
    enabled: !!token,
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
}

// Alias for useOrder - read-only view of order details
export const useOrderDetails = useOrder;

export function useOrderForPayment(id: number) {
  return useQuery({
    queryKey: ['payment', 'order', id],
    queryFn: () => paymentsApi.getOrderForPayment(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ordersApi.create(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreatePaymentRequest) => paymentsApi.createPayment(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['payment'] });
    },
  });
}

// Legacy hook for simple payment processing (quick pay with defaults)
export function useProcessPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      // Get order first to get amount
      const order = await paymentsApi.getOrderForPayment(orderId);
      // Create payment with default values
      return paymentsApi.createPayment({
        orderId,
        method: 'CARD',
        amount: order.totalAmount,
        currency: 'USD',
        description: `Payment for order #${orderId}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
