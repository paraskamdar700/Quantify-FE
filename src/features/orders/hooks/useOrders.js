import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { orderApi } from '../api/orderApi';

// Hook for the List Page
export const useOrdersList = () => {
  const { filters, pagination } = useSelector((state) => state.orders);

  return useQuery({
    queryKey: ['orders', { ...filters, ...pagination }],
    queryFn: () => orderApi.getOrders({ ...filters, ...pagination }),
    keepPreviousData: true, // Prevents layout shift while fetching next page
  });
};

// Hook for Details Page
export const useOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderApi.getOrderDetails(orderId),
    enabled: !!orderId,
  });
};

// Hook for Order Sub-resources (Parallel Fetching in Details)
export const useOrderResources = (orderId) => {
  const itemsQuery = useQuery({ 
    queryKey: ['orderItems', orderId], 
    queryFn: () => orderApi.getOrderItems(orderId) 
  });
  
  const paymentsQuery = useQuery({ 
    queryKey: ['orderPayments', orderId], 
    queryFn: () => orderApi.getOrderPayments(orderId) 
  });

  const deliveriesQuery = useQuery({ 
    queryKey: ['orderDeliveries', orderId], 
    queryFn: () => orderApi.getOrderDeliveries(orderId) 
  });

  return { itemsQuery, paymentsQuery, deliveriesQuery };
};