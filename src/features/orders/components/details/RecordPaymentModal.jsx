import React, { useState } from 'react';
import { X, Save, Calendar, DollarSign, CreditCard, FileText, Loader } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../api/orderApi.js';

export const RecordPaymentModal = ({ isOpen, onClose, orderId }) => {
  const queryClient = useQueryClient();
  
  // Form State
  const [formData, setFormData] = useState({
    amount_paid: '',
    payment_method: 'CASH', // Default
    payment_date: new Date().toISOString().split('T')[0], // Default today
    reference_no: '',
    remarks: ''
  });

  // Mutation to send data
  const mutation = useMutation({
    mutationFn: orderApi.recordPayment,
    onSuccess: () => {
      // Refresh the payments list and the order details (to update total paid)
      queryClient.invalidateQueries(['orderPayments', orderId]);
      queryClient.invalidateQueries(['order', orderId]); 
      onClose();
      // Reset form
      setFormData({
        amount_paid: '',
        payment_method: 'CASH',
        payment_date: new Date().toISOString().split('T')[0],
        reference_no: '',
        remarks: ''
      });
      alert("Payment recorded successfully!");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to record payment");
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount_paid || parseFloat(formData.amount_paid) <= 0) {
      return alert("Please enter a valid amount.");
    }

    const payload = {
      order_id: parseInt(orderId),
      amount_paid: parseFloat(formData.amount_paid),
      payment_method: formData.payment_method,
      payment_date: formData.payment_date,
      reference_no: formData.reference_no,
      remarks: formData.remarks
    };

    mutation.mutate(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Record Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Amount Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount Paid *</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="number" 
                step="0.01"
                name="amount_paid"
                value={formData.amount_paid} 
                onChange={handleChange} 
                required 
                placeholder="0.00"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
              />
            </div>
          </div>

          {/* Payment Method & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Method *</label>
              <div className="relative">
                <select 
                  name="payment_method" 
                  value={formData.payment_method} 
                  onChange={handleChange}
                  className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none appearance-none"
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="CARD">Card</option>
                </select>
                <CreditCard size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <div className="relative">
                <input 
                  type="date"
                  name="payment_date"
                  value={formData.payment_date}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
                />
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Reference No */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reference No / Transaction ID</label>
            <input 
              type="text" 
              name="reference_no"
              value={formData.reference_no} 
              onChange={handleChange} 
              placeholder="e.g. UPI-123456789"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks</label>
            <div className="relative">
              <textarea 
                rows="3"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Optional notes..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none resize-none" 
              />
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
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};