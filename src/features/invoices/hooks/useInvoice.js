import { useQuery, useMutation } from '@tanstack/react-query';
import { invoiceApi } from '../api/invoiceApi';

export const useInvoiceDetails = (orderId) => {
  return useQuery({
    queryKey: ['invoice', orderId],
    queryFn: () => invoiceApi.getInvoiceData(orderId),
    enabled: !!orderId,
  });
};

export const useDownloadInvoice = () => {
  return useMutation({
    mutationFn: invoiceApi.downloadInvoicePDF,
  });
};