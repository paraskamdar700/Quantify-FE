import { apiClient } from '../../../shared/utils/apiClient.js';

export const settingsApi = {
  // --- USER PROFILE ---
  getProfile: async () => {
    const { data } = await apiClient.get('/auth/getuser-details'); //
    console.log("data", data);
    return data.data; // Returns { user: {...}, firm: {...} }
  },
  updateProfile: async (userData) => {
    const { data } = await apiClient.patch('/auth/update-user-details', userData); //
    return data.data;
  },
  updateAvatar: async (formData) => {
    const { data } = await apiClient.patch('/auth/update-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }); //
    return data.data;
  },
  changePassword: async (passwordData) => {
    // passwordData: { currentPassword, newPassword }
    const { data } = await apiClient.patch('/auth/reset-password', passwordData); //
    return data;
  },

  // --- FIRM SETTINGS ---
  getFirm: async () => {
    const { data } = await apiClient.get('/firm/my-firm'); //
    return data.data;
  },
  updateFirm: async (firmData) => {
    const { data } = await apiClient.patch('/firm/update-firm', firmData); //
    return data.data;
  },

  // --- TEAM MANAGEMENT ---
  getTeam: async () => {
    const { data } = await apiClient.get('/user/list-firm-users'); //
    return data.data;
  },
  addTeamMember: async (memberData) => {
    const { data } = await apiClient.post('/user/register-staff-admin', memberData); //
    return data.data;
  },
  removeMember: async (userId) => {
    // Endpoint: /api/v1/users/deactivate-user/:id
    // Method: DELETE
    const { data } = await apiClient.delete(`/auth/deactivate-user/${userId}`);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  }
};