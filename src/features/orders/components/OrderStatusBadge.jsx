import React from 'react';

const styles = {
  payment: {
    PAID: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400',
    PARTIALLY_PAID: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400',
    UNPAID: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400',
  },
  delivery: {
    DELIVERED: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
    PARTIALLY_DELIVERED: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400',
    PENDING: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400',
  },
  overall: {
    COMPLETED: 'bg-green-50 text-green-700 border-green-200',
    PENDING: 'bg-orange-50 text-orange-700 border-orange-200',
    CANCELLED: 'bg-gray-100 text-gray-500 border-gray-200 line-through',
  }
};

export const OrderStatusBadge = ({ status, type = 'overall' }) => {
  const badgeStyle = styles[type][status] || 'bg-gray-100 text-gray-600';
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle}`}>
      {status?.replace('_', ' ')}
    </span>
  );
};