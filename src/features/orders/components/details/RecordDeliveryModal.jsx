import React, { useState } from 'react';
import { X, Save, Calendar, Package, FileText, Loader, Truck } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../api/orderApi.js'; // Needed to fetch items list

export const RecordDeliveryModal = ({ isOpen, onClose, orderId }) => {
  const queryClient = useQueryClient();
  
  // 1. Fetch Order Items to populate the dropdown
  // We need to know what items exist to deliver them
  const { data: items = [], isLoading: isLoadingItems } = useQuery({
    queryKey: ['orderItems', orderId],
    queryFn: () => orderApi.getOrderItems(orderId),
    enabled: isOpen // Only fetch when modal is open
  });

  // Form State
  const [formData, setFormData] = useState({
    order_stock_id: '',
    delivered_quantity: '',
    delivery_date: new Date().toISOString().split('T')[0],
    delivery_notes: ''
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: orderApi.recordDelivery,
    onSuccess: () => {
      // Refresh delivery logs, items (to update qty delivered), and order summary
      queryClient.invalidateQueries(['orderDeliveries', orderId]);
      queryClient.invalidateQueries(['orderItems', orderId]);
      queryClient.invalidateQueries(['order', orderId]);
      
      onClose();
      // Reset form
      setFormData({
        order_stock_id: '',
        delivered_quantity: '',
        delivery_date: new Date().toISOString().split('T')[0],
        delivery_notes: ''
      });
      alert("Delivery recorded successfully!");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to record delivery");
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.order_stock_id) return alert("Please select an item.");
    if (!formData.delivered_quantity || parseInt(formData.delivered_quantity) <= 0) {
      return alert("Please enter a valid quantity.");
    }

    const payload = {
      order_stock_id: parseInt(formData.order_stock_id),
      delivered_quantity: parseInt(formData.delivered_quantity),
      delivery_date: formData.delivery_date,
      delivery_notes: formData.delivery_notes
    };

    mutation.mutate(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Truck size={20} className="text-[var(--primary-color)]" /> Record Delivery
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Item Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item to Deliver *</label>
            <div className="relative">
              <select 
                name="order_stock_id" 
                value={formData.order_stock_id} 
                onChange={handleChange}
                required
                disabled={isLoadingItems}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none appearance-none"
              >
                <option value="">{isLoadingItems ? "Loading items..." : "Select an Item"}</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.stock_name} (Ordered: {item.quantity})
                  </option>
                ))}
              </select>
              <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</label>
              <input 
                type="number" 
                name="delivered_quantity"
                value={formData.delivered_quantity} 
                onChange={handleChange} 
                required 
                min="1"
                placeholder="0"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <div className="relative">
                <input 
                  type="date"
                  name="delivery_date"
                  value={formData.delivery_date}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
                />
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Notes</label>
            <div className="relative">
              <textarea 
                rows="3"
                name="delivery_notes"
                value={formData.delivery_notes}
                onChange={handleChange}
                placeholder="e.g. Dispatched via DHL..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none resize-none" 
              />
              <FileText size={16} className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium disabled:opacity-70"
            >
              {mutation.isPending ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
              Save Delivery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};