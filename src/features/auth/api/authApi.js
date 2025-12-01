import { apiClient } from '../../../shared/utils/apiClient.js';

export const authApi = {
  // 1. LOGIN API
  login: async (credentials) => {
    // credentials = { email, password }
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // 2. REGISTER API (Multipart/Form-Data)
  register: async (data) => {
    // We must manually construct FormData because of the file upload 
    // and the specific nested naming convention (firmdata[key])
    const formData = new FormData();

    // -- Firm Data --
    formData.append('firmdata[firm_name]', data.firmName);
    formData.append('firmdata[gst_no]', data.gstNo);
    formData.append('firmdata[firm_city]', data.city);
    formData.append('firmdata[firm_street]', data.street);

    // -- User Data --
    formData.append('userdata[fullname]', data.fullName);
    formData.append('userdata[email]', data.email);
    // Note: Your Postman shows 'password_hash', so we send it with that key
    formData.append('userdata[password_hash]', data.password); 
    formData.append('userdata[contact_no]', data.contactNo);
    formData.append('userdata[bio]', data.bio || '');

    // -- Avatar (File) --
    if (data.avatar) {
      formData.append('avatar', data.avatar); 
    }

    // Axios automatically sets 'Content-Type': 'multipart/form-data' 
    // when it sees a FormData object.
    const response = await apiClient.post('/auth/register', formData);
    return response.data;
  }
};