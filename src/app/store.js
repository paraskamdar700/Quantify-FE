import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slices/authSlice.js';
import inventoryReducer from '../features/inventory/slices/inventorySlice.js';
import orderReducer from '../features/orders/slices/orderSlice.js';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
    orders: orderReducer,
  },
});