import { apiClient } from '../../../shared/utils/apiClient';

export const invoiceApi = {
  // Fetch comprehensive invoice data
  getInvoiceData: async (orderId) => {
    console.log("orderId in api",orderId);
    const { data } = await apiClient.get(`/invoice/${orderId}`);
    console.log("data in api",data);
    return data.data; 
  },

  // Mock Download Invoice (In production, this would return a Blob/PDF)
  downloadInvoicePDF: async (orderId) => {
    // Example: await apiClient.get(`/invoice/${orderId}/download`, { responseType: 'blob' });
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
};