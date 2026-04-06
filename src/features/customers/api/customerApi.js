import { apiClient } from '../../../shared/utils/apiClient.js';

export const customerApi = {
  // 1. Get Customers (Paginated & Search)
  getCustomers: async ({ page = 1, limit = 10, search = '' }) => {
    const params = new URLSearchParams({ page, limit });
    if (search) params.append('search', search);

    const { data } = await apiClient.get(`/customer/get-customers-list?${params.toString()}`);
    // Controller returns: { statusCode, data: { customers, pagination }, ... }
    return data.data; 
  },

  // 2. Add Customer
  addCustomer: async (customerData) => {
    const { data } = await apiClient.post('/customer/add-customer', customerData);
    return data.data;
  },

  // 3. Update Customer
  updateCustomer: async ({ id, ...updateData }) => {
    const { data } = await apiClient.put(`/customer/update-customer/${id}`, updateData);
    return data.data;
  },

  // 4. Delete Customer
  deleteCustomer: async (id) => {
    const { data } = await apiClient.delete(`/customer/delete-customer/${id}`);
    return data;
  }
};