import React from 'react';
import { LogOut, Loader } from 'lucide-react'; // Import Icon
import { useSettings } from '../hooks/useSettings';
import { ProfileSettings } from '../components/ProfileSettings';
import { FirmSettings } from '../components/FirmSettings';
import { SecuritySettings } from '../components/SecuritySettings';
import { TeamSettings } from '../components/TeamSettings';
import { useNavigate } from 'react-router-dom';
const SettingsPage = () => {
  const { 
    profileQuery, firmQuery, teamQuery,
    updateProfileMutation, updateAvatarMutation, 
    updateFirmMutation, changePasswordMutation,
    addMemberMutation, removeMemberMutation,
    logoutMutation // Destructure the new mutation
  } = useSettings();
  console.log('Profile Data:', profileQuery.data);

  if (profileQuery.isLoading || firmQuery.isLoading) {
    return <div className="p-10 text-center">Loading Settings...</div>;
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-20">
      
      {/* Header with Logout Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile, firm details, and team members.</p>
        </div>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900 transition-colors font-medium text-sm"
        >
          {logoutMutation.isPending ? <Loader size={18} className="animate-spin" /> : <LogOut size={18} />}
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ... Rest of your layout ... */}
        
        <div className="xl:col-span-2 space-y-6">
          <ProfileSettings 
            data={profileQuery.data}
            updateProfile={updateProfileMutation.mutate}
            updateAvatar={updateAvatarMutation.mutate}
            isUpdating={updateProfileMutation.isPending || updateAvatarMutation.isPending}
          />
          
          <FirmSettings 
            data={firmQuery.data} 
            updateFirm={updateFirmMutation.mutate}
            isUpdating={updateFirmMutation.isPending}
          />
        </div>

        <div className="space-y-6">
           <SecuritySettings 
            changePassword={changePasswordMutation.mutate}
            isUpdating={changePasswordMutation.isPending}
          />
          
          <TeamSettings 
            team={teamQuery.data} 
            addMember={addMemberMutation.mutate}
            removeMember={removeMemberMutation.mutate}
            isMutating={addMemberMutation.isPending || removeMemberMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;