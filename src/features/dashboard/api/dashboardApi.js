import { apiClient } from '../../../shared/utils/apiClient';

export const dashboardApi = {
  getDashboardData: async ({ startDate, endDate }) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const { data } = await apiClient.get(`/dashboard?${params.toString()}`);
    return data.data; // Returns summary, revenueChart, topSelling, recentOrders
  },

  exportDashboard: async ({ startDate, endDate }) => {
    const response = await apiClient.get(
      `/dashboard/export?startDate=${startDate}&endDate=${endDate}`,
      { responseType: 'blob' }
    );

    // Trigger browser download
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quantify_Orders_${startDate}_to_${endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
};