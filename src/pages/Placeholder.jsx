import React, { useState } from 'react';
// Make sure this path is correct for your project structure
import { apiClient } from '../shared/utils/apiClient.js'; 

export const Placeholder = ({ title }) => { 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
          // Use apiClient (Axios) to make the GET request
          // Axios handles the URL base path and adds headers automatically
          const response = await apiClient.get('user/my-profile'); 
          
          // Axios automatically parses the JSON.
          // The actual data payload is stored in response.data.
          const data = response.data; 
          
          console.log("Axios response object:", response); // Full response object
          console.log("Parsed data payload:", data); // The actual data we want

          // Axios uses status codes for success/failure automatically within its try/catch blocks.
          // If the request was successful (e.g., status 200-299), it proceeds here.
          
          // Assuming 'data.data' matches your actual API response structure based on previous code review
          // If your API returns the profile directly, use setProfile(data) instead.
          setProfile(data.data); 
          
          // No need for a manual 'if (response.ok)' check like in native fetch

      } catch (err) {
          // Axios catches non-2xx status codes (401, 404, 500 etc.) as errors automatically.
          console.error("Fetch error:", err.response || err.message);
          setError('Failed to fetch user profile: ' + (err.response?.data?.message || err.message));
      } finally {
          setLoading(false);
      }
  };

  return (
    <>
      <div className="p-4 border border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center bg-white">
        <h2 className="text-2xl text-gray-400 font-light">{title} Feature Coming Soon</h2>
      </div>

      <div className="mt-4 p-4 border rounded-lg">
        <button 
          onClick={fetchUserProfile}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Fetch User Profile
        </button>

        {loading && <p className="mt-2 text-blue-600">Loading...</p>}
        {error && <p className="mt-2" style={{ color: 'red' }}>Error: {error}</p>}
        
        {profile && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">User Profile</h2>
                <p><strong>ID:</strong> {profile.id}</p>
                <p><strong>Name:</strong> {profile.fullname}</p>
                <p><strong>Contact Number:</strong> {profile.contact_no}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
            </div>
        )}
      </div>
    </>
  );
};
