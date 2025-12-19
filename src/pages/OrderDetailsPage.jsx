import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { useOrderDetails } from '../features/orders/hooks/useOrders';
import { setActiveTab } from '../features/orders/slices/orderSlice';

// Import Tabs
import OrderSummaryTab from '../features/orders/components/details/OrderSummaryTab.jsx';
import OrderItemsTab from '../features/orders/components/details/OrderItemsTab.jsx';
import OrderPaymentsTab from '../features/orders/components/details/OrderPaymentsTab.jsx';
import OrderDeliveriesTab from '../features/orders/components/details/OrderDeliveriesTab.jsx';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.orders.activeTab);
  
  const { data: order, isLoading } = useOrderDetails(orderId);

  if (isLoading) return <div className="p-10 text-center">Loading Order Details...</div>;

  if (!order) return <div className="p-10 text-center">Order not found</div>;

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'items', label: 'Order Items' },
    { id: 'payments', label: 'Payments' },
    { id: 'deliveries', label: 'Deliveries' },
  ];

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Top Navigation */}
      <button 
        onClick={() => navigate('/order')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--primary-color)] transition-colors"
      >
        <ArrowLeft size={16} /> Back to Orders
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order #{order.invoice_no}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-gray-500">Created on {new Date(order.created_at || order.order_date).toLocaleDateString()}</span>
            {/* Reuse Badge here if needed */}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Printer size={16} /> Print
          </button>
          <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'summary' && <OrderSummaryTab order={order} />}
        {activeTab === 'items' && <OrderItemsTab orderId={orderId} />}
        {activeTab === 'payments' && <OrderPaymentsTab orderId={orderId} />}
        {activeTab === 'deliveries' && <OrderDeliveriesTab orderId={orderId} />}
      </div>
    </div>
  );
};

export default OrderDetailsPage;