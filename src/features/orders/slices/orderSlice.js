import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // List View State
  filters: {
    search: '',
    orderStatus: '',
    paymentStatus: '',
    deliveryStatus: '',
    startDate: '',
    endDate: '',
  },
  pagination: {
    page: 1,
    limit: 10,
  },
  // Details View State
  activeTab: 'summary', // summary | items | payments | deliveries
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to page 1 on filter change
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setFilters, setPagination, clearFilters, setActiveTab } = orderSlice.actions;
export default orderSlice.reducer;