import { apiClient } from '../../../shared/utils/apiClient.js';

export const authApi = {

  // 1. LOGIN
  login: async (credentials) => {
    // credentials = { email, password }
    const res = await apiClient.post('/auth/login', credentials);
    return res.data; 
  },

  // 2. REGISTER (Multipart Form Data)
  register: async (data) => {
    const formData = new FormData();

    // Nested Objects for Backend structure
    formData.append('firmdata[firm_name]', data.firmName);
    formData.append('firmdata[gst_no]', data.gstNo);
    formData.append('firmdata[firm_city]', data.city);
    formData.append('firmdata[firm_street]', data.street);

    formData.append('userdata[fullname]', data.fullName);
    formData.append('userdata[email]', data.email);
    formData.append('userdata[password_hash]', data.password);
    formData.append('userdata[contact_no]', data.contactNo);
    formData.append('userdata[bio]', data.bio || '');

    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    // Note: We don't need to set headers here because we removed 
    // the default JSON header from apiClient. Axios handles it automatically.
    const res = await apiClient.post('/auth/register', formData);
    return res.data;
  },

  // 3. LOGOUT
  logout: async () => {
    // This calls the backend to clear the httpOnly Refresh Token cookie
    const res = await apiClient.post('/auth/logout');
    return res.data;
  },

  // 4. GET CURRENT USER (Session Persistence)
  getMe: async () => {
    // FIXED: Updated route based on your previous screenshot
    const res = await apiClient.get('/user/my-profile');
    return res.data; 
  }

};