import { useState, useEffect, useCallback } from 'react';
import { categoryApi } from '../api/categoryApi';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Logic
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await categoryApi.getCategories();
      // Ensure we target the array correctly based on your API response structure
      setCategories(response.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Actions
  const addCategory = async (data) => {
    try {
      await categoryApi.createCategory(data);
      await fetchCategories(); // Refresh list
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to add category" };
    }
  };

  const editCategory = async (id, data) => {
    try {
      await categoryApi.updateCategory({ id, ...data });
      await fetchCategories(); // Refresh list
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update category" };
    }
  };

  const removeCategory = async (id) => {
    try {
      await categoryApi.deleteCategory(id);
      await fetchCategories(); // Refresh list
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to delete category" };
    }
  };

  return {
    categories,
    isLoading,
    error,
    addCategory,
    editCategory,
    removeCategory,
    refreshCategories: fetchCategories
  };
};