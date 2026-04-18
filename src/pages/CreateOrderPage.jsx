import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { orderApi } from '../features/orders/api/orderApi.js';
import { useCustomers } from '../features/customers/hooks/useCustomers.js'; 
import { useInventory } from '../features/inventory/hooks/useInventory.js';

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { customers } = useCustomers({ limit: 100 });

  const { 
      stockItems, fetchStock
    } = useInventory();

    useEffect(() => {
    fetchStock({ limit: 1000, page: 1 }); 
  }, [fetchStock]);

  const [formData, setFormData] = useState({
    customer_id: '',
    order_date: new Date().toISOString().split('T')[0],
    payment_terms: '',
    delivery_instructions: '',
    items: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { stock_id: '', stock_name: '', quantity: 1, selling_price: 0, subtotal: 0 }
      ]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    const item = newItems[index];

    if (field === 'stock_id') {
      const stock = stockItems.find(s => s.id === parseInt(value));
      if (stock) {
        item.stock_id = stock.id;
        item.stock_name = stock.stock_name;
        item.selling_price = stock.buy_price;
      }
    } else {
      item[field] = value;
    }

    item.subtotal = Number(item.quantity) * Number(item.selling_price);
    
    setFormData({ ...formData, items: newItems });
  };

  const totalAmount = formData.items.reduce((sum, item) => sum + (item.subtotal || 0), 0);

  const createMutation = useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      navigate('/order');
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to create order");
    }
  });

  const handleSubmit = () => {
    if (!formData.customer_id) return alert("Please select a customer");
    if (formData.items.length === 0) return alert("Please add at least one item");
    if (formData.items.some(i => !i.stock_id)) return alert("Please select products for all rows");

    const payload = {
      customer_id: parseInt(formData.customer_id),
      order_date: formData.order_date,
      payment_terms: formData.payment_terms,
      delivery_instructions: formData.delivery_instructions,
      order_items: formData.items.map(i => ({
        stock_id: parseInt(i.stock_id),
        quantity: parseInt(i.quantity),
        selling_price: parseFloat(i.selling_price)
      }))
    };

    createMutation.mutate(payload);
  };

  return (
    <div className="p-4 md:p-6 min-h-screen pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/order')} className="p-2 border border-border rounded-lg hover:bg-muted text-foreground transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Create Order</h1>
            <p className="text-sm text-muted-foreground">Fill in the details to generate a new invoice.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/order')} className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted text-foreground transition-colors">
            Discard
          </button>
          <button 
            onClick={handleSubmit}
            disabled={createMutation.isPending}
            className="px-6 py-2 text-white rounded-lg font-medium hover:opacity-90 flex items-center gap-2 transition-opacity"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {createMutation.isPending ? "Saving..." : "Create Order"} <Save size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- LEFT COLUMN: ORDER DETAILS --- */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold mb-4 text-lg text-foreground">Customer Info</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Customer *</label>
                <select 
                  name="customer_id" 
                  value={formData.customer_id} 
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                >
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.fullname} ({c.firm_name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Order Date</label>
                <input 
                  type="date"
                  name="order_date"
                  value={formData.order_date}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-border bg-transparent text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Payment Terms</label>
                <input 
                  type="text"
                  name="payment_terms"
                  placeholder="e.g. Net 30, COD"
                  value={formData.payment_terms}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-border bg-transparent text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none placeholder:text-muted-foreground" 
                />
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold mb-4 text-lg text-foreground">Delivery Details</h3>
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Instructions</label>
              <textarea 
                name="delivery_instructions"
                rows="4"
                placeholder="e.g. Drop at rear gate..."
                value={formData.delivery_instructions}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-border bg-transparent text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none resize-none placeholder:text-muted-foreground" 
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ITEMS & SUMMARY --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-foreground">Order Items</h3>
              <button 
                onClick={addItem}
                className="text-sm font-medium hover:underline flex items-center gap-1"
                style={{ color: 'var(--primary-color)' }}
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted border-b border-border text-muted-foreground uppercase">
                  <tr>
                    <th className="px-4 py-3 min-w-[200px]">Product</th>
                    <th className="px-4 py-3 w-[100px]">Qty</th>
                    <th className="px-4 py-3 w-[120px]">Price</th>
                    <th className="px-4 py-3 w-[120px] text-right">Total</th>
                    <th className="px-4 py-3 w-[50px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {formData.items.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-muted-foreground border-dashed border-2 border-border rounded-lg m-4">
                        No items added. Click "Add Item" to start.
                      </td>
                    </tr>
                  ) : (
                    formData.items.map((item, index) => (
                      <tr key={index} className="group">
                        <td className="p-3">
                          <select 
                            value={item.stock_id}
                            onChange={(e) => updateItem(index, 'stock_id', e.target.value)}
                            className="w-full p-2 rounded border border-border bg-card text-foreground"
                          >
                            <option value="">Select Product</option>
                            {stockItems.map(s => (
                              <option key={s.id} value={s.id}>{s.stock_name} (Avail: {s.quantity_available})</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3">
                          <input 
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                            className="w-full p-2 rounded border border-border bg-transparent text-foreground text-center"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.selling_price}
                            onChange={(e) => updateItem(index, 'selling_price', e.target.value)}
                            className="w-full p-2 rounded border border-border bg-transparent text-foreground text-right"
                          />
                        </td>
                        <td className="p-3 text-right font-medium text-foreground">
                          ${Number(item.subtotal).toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => removeItem(index)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="mt-6 pt-4 border-t border-border flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;