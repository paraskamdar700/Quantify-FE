import { apiClient } from '../../../shared/utils/apiClient';

export const orderApi = {
  // 1. List Orders
  getOrders: async ({ page, limit, search, orderStatus, startDate, endDate }) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);
    if (orderStatus) params.append('order_status', orderStatus);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const { data } = await apiClient.get(`/order?${params.toString()}`);
    
    return data.data; // { orders: [], pagination: {} }
  },

  // 2. Get Order Details
  getOrderDetails: async (orderId) => {
    const { data } = await apiClient.get(`/order/${orderId}`);
    
    return data.data;
  },

  // 3. Create Order
  createOrder: async (orderData) => {
    const { data } = await apiClient.post('/order', orderData);
    return data;
  },

  // 4. Cancel Order
  cancelOrder: async (id) => {
    const { data } = await apiClient.patch(`/order/${id}/cancel`);
    return data;
  },
  
  // --- Payment & Delivery Integrations (Proxying to specific APIs for cleaner usage) ---
  
  // Get Payments for Order
  getOrderPayments: async (orderId) => {
    const { data } = await apiClient.get(`/payments/orderpayments/${orderId}`);
    
    return data.data;
  },

  recordPayment: async (paymentData) => {
    const { data } = await apiClient.post('/payments', paymentData);
    return data;
  },

  recordDelivery: async (deliveryData) => {
    // Payload: { order_stock_id, delivered_quantity, delivery_date, delivery_notes }
    const { data } = await apiClient.post('/delivery', deliveryData);
    return data;
  },

  // Get Delivery History for Order
  getOrderDeliveries: async (orderId) => {
    const { data } = await apiClient.get(`/delivery/order/${orderId}`);
    return data.data;
  },
  
  // Get Order Items
  getOrderItems: async (orderId) => {
    const { data } = await apiClient.get(`/order/items/${orderId}`);
    return data.data;
  }
};