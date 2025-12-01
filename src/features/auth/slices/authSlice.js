import { createSlice } from '@reduxjs/toolkit';

// Helper to load user for UI persistence (e.g., Name, Avatar)
const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (err) {
    return null;
  }
};

const user = loadUserFromStorage();

const initialState = {
  isAuthenticated: !!user, // If we have user data, assume logged in (Optimistic UI)
  user: user,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // payload is just { user: ... }
      state.isAuthenticated = true;
      state.user = action.payload.user;
      
      // Store User Details Only (NOT Token)
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
      // Note: We cannot delete HttpOnly cookies from JS. 
      // The API call to /auth/logout in authApi.js handles that.
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;