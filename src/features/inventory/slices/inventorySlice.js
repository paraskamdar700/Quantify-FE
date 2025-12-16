import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  selectedItem: null, // If null, we are in "Add Mode". If set, "Edit Mode"
  filters: {
    search: '',
    category_id: '',
    page: 1,
    limit: 10,
  },
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.selectedItem = null;
      state.isModalOpen = true;
    },
    openEditModal: (state, action) => {
      state.selectedItem = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedItem = null;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
      state.filters.page = 1; // Reset to page 1 on search
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
  },
});

export const { openAddModal, openEditModal, closeModal, setSearch, setPage } = inventorySlice.actions;
export default inventorySlice.reducer;