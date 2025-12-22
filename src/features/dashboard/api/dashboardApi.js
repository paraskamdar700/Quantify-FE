import { apiClient } from '../../../shared/utils/apiClient';

export const dashboardApi = {
  getDashboardData: async ({ startDate, endDate }) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const { data } = await apiClient.get(`/dashboard?${params.toString()}`);
    return data.data; // Returns summary, revenueChart, topSelling, etc.
  }
};