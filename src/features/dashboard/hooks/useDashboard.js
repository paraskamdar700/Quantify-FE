import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';

export const useDashboard = (filters) => {
  return useQuery({
    queryKey: ['dashboard', filters],
    queryFn: () => dashboardApi.getDashboardData(filters),
    keepPreviousData: true, // Prevents flickering when changing dates
  });
};