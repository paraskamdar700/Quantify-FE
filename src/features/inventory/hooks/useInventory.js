import { useState, useCallback } from 'react';
import { inventoryApi } from '../api/inventoryApi.js';

export const useInventory = () => {
  const [stockItems, setStockItems] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("checking useInventory hook");
  // Fetch Logic
  const fetchStock = useCallback(async (filters) => {
    
    setIsLoading(true);
    try {
      const result = await inventoryApi.getStock(filters);
      console.log("checking this hook function", result);

      setStockItems(result.stockItems || []);
      if (result.pagination) {
        setPagination(result.pagination);
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load inventory");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actions
  const addStockItem = async (data) => {
    try {
      await inventoryApi.addStock(data);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to add item" };
    }
  };

  const updateStockItem = async (id, data) => {
    try {
      await inventoryApi.updateStock({ id, ...data });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update item" };
    }
  };

  const deleteStockItem = async (id) => {
    try {
      await inventoryApi.deleteStock(id);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to delete item" };
    }
  };

  return {
    stockItems,
    pagination,
    isLoading,
    error,
    fetchStock,
    addStockItem,
    updateStockItem,
    deleteStockItem
  };
};