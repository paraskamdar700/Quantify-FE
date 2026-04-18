import { apiClient } from '../../../shared/utils/apiClient';

export const inventoryReportApi = {
  /**
   * Fetch full inventory dashboard data (summary, category breakdown, sell-through).
   * Uses the combined /inventory/dashboard endpoint.
   */
  getDashboardData: async ({ startDate, endDate, targetRate } = {}) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (targetRate) params.append('targetRate', targetRate);

    const { data } = await apiClient.get(`/inventory/dashboard?${params.toString()}`);
    return data.data; // { dateRange, summary, categoryBreakdown, sellThrough }
  },
};
