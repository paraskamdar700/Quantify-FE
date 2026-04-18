import { useQuery } from '@tanstack/react-query';
import { inventoryReportApi } from '../api/inventoryReportApi';

export const useInventoryReport = (filters) => {
  return useQuery({
    queryKey: ['inventory-report', filters],
    queryFn: () => inventoryReportApi.getDashboardData(filters),
    keepPreviousData: true,
  });
};
