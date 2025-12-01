import { createSlice } from '@reduxjs/toolkit';

// 1. HELPER FUNCTION: Try to load user from local storage safely
const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    return null;
  }
};

const loadTokenFromStorage = () => {
    return localStorage.getItem('token') || null;
}

// 2. DEFINE INITIAL STATE based on LocalStorage
const token = loadTokenFromStorage();
const user = loadUserFromStorage();

const initialState = {
  // If a token exists in storage, we assume they are logged in (until API rejects it)
  isAuthenticated: !!token, 
  user: user,
  token: token, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // payload should look like: { user: { name: '...', email: '...' }, token: 'xyz123' }
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // 3. WRITE to LocalStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // 4. DELETE from LocalStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;