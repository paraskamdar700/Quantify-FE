import React, { useState } from 'react';
import { Users, Plus, Trash2, Shield, AlertTriangle } from 'lucide-react'; // Added AlertIcon
import { AddMemberModal } from './AddMemberModal.jsx';

export const TeamSettings = ({ team, removeMember, addMember, isMutating }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (member) => {
    // Check strict roles logic before calling API (Optional UI feedback)
    // Owner can delete Admin/Staff. Admin can only delete Staff.
    
    if (window.confirm(`Are you sure you want to deactivate ${member.fullname}? They will lose access immediately.`)) {
      // PASS THE ID NOW, NOT EMAIL
      console.log("Removing member with ID:", member.id);
      removeMember(member.id); 
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Users size={20} className="text-[var(--primary-color)]" /> Team Management
        </h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--primary-color)] text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {team?.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xs">
                      {member.fullname?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{member.fullname}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                    member.role === 'OWNER' 
                      ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300' 
                      : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {/* Logic: You cannot delete the OWNER, and you generally can't delete yourself via this button */}
                  {member.role !== 'OWNER' && (
                    <button 
                      onClick={() => handleDelete(member)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="Deactivate User"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {(!team || team.length === 0) && (
                <tr><td colSpan="3" className="p-4 text-center text-gray-500">No team members found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AddMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addMember}
        isSubmitting={isMutating}
      />
    </div>
  );
};