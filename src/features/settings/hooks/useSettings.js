import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../api/settingsApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../auth/slices/authSlice.js';
export const useSettings = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Queries
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: settingsApi.getProfile,
  });

  const firmQuery = useQuery({
    queryKey: ['firm'],
    queryFn: settingsApi.getFirm,
  });

  const teamQuery = useQuery({
    queryKey: ['team'],
    queryFn: settingsApi.getTeam,
  });

  // Mutations
  const updateProfileMutation = useMutation({
    mutationFn: settingsApi.updateProfile,
    onSuccess: () => queryClient.invalidateQueries(['profile']),
  });
  
  const updateAvatarMutation = useMutation({
    mutationFn: settingsApi.updateAvatar,
    onSuccess: () => queryClient.invalidateQueries(['profile']),
  });

  const updateFirmMutation = useMutation({
    mutationFn: settingsApi.updateFirm,
    onSuccess: () => queryClient.invalidateQueries(['firm']),
  });

  const changePasswordMutation = useMutation({
    mutationFn: settingsApi.changePassword,
  });

  const addMemberMutation = useMutation({
    mutationFn: settingsApi.addTeamMember,
    onSuccess: () => queryClient.invalidateQueries(['team']),
  });

  const removeMemberMutation = useMutation({
    mutationFn: settingsApi.removeMember,
    onSuccess: () => queryClient.invalidateQueries(['team']),
  });

  const logoutMutation = useMutation({
    mutationFn: settingsApi.logout,
    onSuccess: () => {
      // 1. Clear React Query Cache
      queryClient.clear();
      
      // 2. Clear Redux State (If you have this action)
      dispatch(logoutAction());
      
      // 3. Redirect to Login
      navigate('/login');
    },
    onError: (error) => {
      console.error("Logout failed", error);
      // Force redirect anyway for safety
      navigate('/login');
    }
  });

  return {
    profileQuery,
    firmQuery,
    teamQuery,
    updateProfileMutation,
    updateAvatarMutation,
    updateFirmMutation,
    changePasswordMutation,
    addMemberMutation,
    removeMemberMutation,
    logoutMutation
  };
};