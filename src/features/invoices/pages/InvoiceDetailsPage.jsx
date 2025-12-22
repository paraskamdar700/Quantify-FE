import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, Download, ArrowLeft, Loader, FileText, MapPin, Phone, Mail } from 'lucide-react';
import { useInvoiceDetails, useDownloadInvoice } from '../hooks/useInvoice';

const InvoiceDetailsPage = () => {
  // Using invoiceId from params as per your code
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const componentRef = useRef();

  // Hooks
  const { data, isLoading, isError } = useInvoiceDetails(invoiceId);
  const downloadMutation = useDownloadInvoice();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin" /></div>;
  if (isError || !data) return <div className="p-10 text-center">Invoice not found</div>;

  const { order, firm, customer, items, summary } = data;

  console.log("Invoice Details Data:", data);
  // Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Fixed: Use invoiceId here instead of undefined 'orderId'
    downloadMutation.mutate(invoiceId, {
      onSuccess: () => {
        alert('Invoice PDF downloaded successfully!'); 
        window.print(); 
      },
      onError: () => alert('Failed to download invoice'),
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 print:bg-white print:p-0">
      
      {/* --- TOP BAR (Hidden on Print) --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/invoices')} className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Invoice #{order.invoice_no}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Created on {new Date(order.order_date).toLocaleDateString()}</p>
          </div>
        </div>
        
        {/* --- ACTION BUTTONS --- */}
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer size={18} /> Print
          </button>
          
          <button 
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg font-medium hover:opacity-90 flex items-center gap-2 shadow-sm transition-all disabled:opacity-70"
          >
            {downloadMutation.isPending ? <Loader size={18} className="animate-spin"/> : <Download size={18} />} 
            Download Invoice
          </button>
        </div>
      </div>

      {/* --- INVOICE PAPER PREVIEW --- */}
      <div 
        ref={componentRef}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden print:shadow-none print:border-none print:max-w-full print:dark:bg-white print:dark:text-black"
      >
        
        {/* Invoice Header */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-[var(--primary-color)] rounded-lg flex items-center justify-center text-white print:text-black print:border print:border-black print:bg-transparent">
                <FileText size={24} />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white print:text-black">{firm[0].firm_name}</h2>
               <p className="text-sm text-gray-500 print:text-gray-600">GSTIN: {firm[0].gst_no}</p>
             </div>
          </div>
          <div className="text-right">
            <h3 className="text-4xl font-light text-gray-300 dark:text-gray-600 print:text-gray-300 uppercase tracking-widest">Invoice</h3>
            <div className="mt-2">
              <span className="block text-xs text-gray-400 uppercase">Invoice No</span>
              <span className="text-lg font-mono font-medium text-gray-900 dark:text-white print:text-black">#{order.invoice_no}</span>
            </div>
             <div className="mt-1">
              <span className="block text-xs text-gray-400 uppercase">Date</span>
              <span className="text-base font-medium text-gray-900 dark:text-white print:text-black">{new Date(order.order_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* ADDRESS GRID: SELLER & BUYER */}
        <div className="p-8 grid grid-cols-2 gap-12 border-b border-gray-100 dark:border-gray-700 print:border-gray-300">
          
          {/* 1. SELLER DETAILS (FROM) */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">From (Seller)</h4>
            <div className="text-sm text-gray-700 dark:text-gray-200 print:text-black space-y-1">
              <p className="font-bold text-base text-gray-900 dark:text-white print:text-black">{firm[0].firm_name}</p>
              <div className="flex items-start gap-2 mt-2">
                <MapPin size={14} className="mt-0.5 text-gray-400 shrink-0" />
                <span>
                  {firm[0].firm_street}<br/>
                  {firm[0].firm_city}
                </span>
              </div>
              {firm[0].email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span>{firm[0].email}</span>
                </div>
              )}
               {firm[0].contact_no && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span>{firm[0].contact_no}</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. BUYER DETAILS (BILL TO) */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Bill To (Customer)</h4>
            <div className="text-sm text-gray-700 dark:text-gray-200 print:text-black space-y-1">
              <p className="font-bold text-base text-gray-900 dark:text-white print:text-black">{customer.firm_name}</p>
              <p className="text-gray-500">Attn: {customer.fullname}</p>
              <div className="flex items-start gap-2 mt-2">
                <MapPin size={14} className="mt-0.5 text-gray-400 shrink-0" />
                <span>
                  {customer.street}, {customer.city}
                </span>
              </div>
               <div className="flex items-center gap-2">
                 <span className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600 print:border-gray-300">
                    GST: {customer.gst_no}
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="px-8 py-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 print:bg-gray-100 text-gray-500 dark:text-gray-400 uppercase border-y border-gray-200 dark:border-gray-700 print:border-gray-300">
              <tr>
                <th className="py-3 px-4 w-[40%]">Description</th>
                <th className="py-3 px-4 text-center">Ordered</th>
                <th className="py-3 px-4 text-center">Delivered</th> {/* NEW COLUMN */}
                <th className="py-3 px-4 text-right">Rate</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 print:divide-gray-300">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900 dark:text-white print:text-black">{item.stock_name}</p>
                    {item.sku && <p className="text-xs text-gray-500">SKU: {item.sku}</p>}
                  </td>
                  <td className="py-4 px-4 text-center font-medium">{item.quantity}</td>
                  
                  {/* NEW: Delivered Quantity Column */}
                  <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                    {/* Safe check: displays quantity if available, else '-' */}
                    {item.quantity_delivered !== undefined && item.quantity_delivered !== null ? item.quantity_delivered : '-'}
                  </td>

                  <td className="py-4 px-4 text-right text-gray-600 dark:text-gray-400">
                    ${Number(item.selling_price).toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-gray-900 dark:text-white print:text-black">
                    ${Number(item.subtotal).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 print:bg-white print:border-gray-300">
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div>
                <h5 className="text-sm font-bold text-gray-900 dark:text-white print:text-black mb-1">Payment Instructions</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please make checks payable to <span className="font-medium">{firm.firm_name}</span>.
                </p>
              </div>
              <div>
                 <h5 className="text-sm font-bold text-gray-900 dark:text-white print:text-black mb-1">Terms & Conditions</h5>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{order.payment_terms || "Payment due within 30 days."}</p>
              </div>
            </div>

            <div className="w-full sm:w-72 space-y-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 print:text-gray-700">
                <span>Subtotal</span>
                <span>${Number(summary.total_amount).toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-600 print:bg-gray-300 my-2"></div>
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white print:text-black">
                <span>Total</span>
                <span>${Number(summary.total_amount).toFixed(2)}</span>
              </div>
              
              <div className="pt-4 space-y-2">
                 <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-medium">
                    <span>Amount Paid</span>
                    <span>${Number(order.total_amount_paid).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-base font-bold text-[var(--primary-color)] print:text-black bg-blue-50 dark:bg-blue-900/30 p-2 rounded print:bg-transparent">
                    <span>Balance Due</span>
                    <span>${Number(order.total_amount_paid-order.total_amount).toFixed(2)}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;