import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerApi } from '../api/customerApi.js';

export const useCustomers = (filters) => {
  const queryClient = useQueryClient();

  // --- QUERY: Fetch List ---
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['customers', filters],
    queryFn: () => customerApi.getCustomers(filters),
    keepPreviousData: true, // Prevents flickering when changing pages
    staleTime: 5000, // Cache for 5 seconds
  });

  const customers = data?.customers || [];
  const pagination = data?.pagination || { currentPage: 1, totalPages: 1 };

  // --- MUTATION: Add ---
  const addMutation = useMutation({
    mutationFn: customerApi.addCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });

  // --- MUTATION: Update ---
  const updateMutation = useMutation({
    mutationFn: customerApi.updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });

  // --- MUTATION: Delete ---
  const deleteMutation = useMutation({
    mutationFn: customerApi.deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });

  return {
    customers,
    pagination,
    isLoading,
    isError,
    error,
    addCustomer: addMutation.mutateAsync,
    updateCustomer: updateMutation.mutateAsync,
    deleteCustomer: deleteMutation.mutateAsync,
    isMutating: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
};
