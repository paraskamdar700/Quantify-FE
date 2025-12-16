import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slices/authSlice.js';
import inventoryReducer from '../features/inventory/slices/inventorySlice.js';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
  },
});