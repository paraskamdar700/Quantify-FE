import { apiClient } from '../../../shared/utils/apiClient';

export const inventoryApi = {
  // 1. Fetch Stock (with dynamic filters)
  getStock: async ({ page = 1, limit = 10, search = '', category_id = '', startDate = '', endDate = '' }) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (category_id) params.append('category_id', category_id);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const { data } = await apiClient.get(`/stock/get-stock?${params.toString()}`);
    // Return the whole data object { stockItems: [], pagination: {} }
    return data.data; 
  },

  // 2. Add Stock
  addStock: async (stockData) => {
    const { data } = await apiClient.post('/stock/add-stock', stockData);
    return data;
  },

  // 3. Update Stock
  updateStock: async ({ id, ...stockData }) => {
    const { data } = await apiClient.put(`/stock/update-stock/${id}`, stockData);
    return data;
  },

  // 4. Delete Stock
  deleteStock: async (id) => {
    const { data } = await apiClient.delete(`/stock/delete-stock/${id}`);
    return data;
  }
};