import { apiClient } from '../../../shared/utils/apiClient';

export const categoryApi = {
  // 1. Get All Categories
  getCategories: async () => {
    const { data } = await apiClient.get('/category/get-categories');
    return data; // Returns { data: [...categories], success: true }
  },

  // 2. Create Category
  // Note: Backend Create controller expects "categoryName" (camelCase)
  createCategory: async (categoryData) => {
    const payload = {
      categoryName: categoryData.name, 
      description: categoryData.description
    };
    const { data } = await apiClient.post('/category/create-category', payload);
    return data;
  },

  // 3. Update Category
  // Note: Backend Update controller expects "category_name" (snake_case)
  updateCategory: async ({ id, ...categoryData }) => {
    const payload = {
      category_name: categoryData.name,
      description: categoryData.description
    };
    const { data } = await apiClient.put(`/category/update-category/${id}`, payload);
    return data;
  },

  // 4. Delete Category
  deleteCategory: async (id) => {
    const { data } = await apiClient.delete(`/category/delete-category/${id}`);
    return data;
  }
};