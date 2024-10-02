import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../apiService';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate(); // Using useNavigate for programmatic navigation in React Router v6

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await logout(token);
      localStorage.removeItem('access_token');
      console.log(response.message); // Display "Logout successful"
      navigate('/login'); // Redirect the user to the login page after logout
    } catch (error: any) {
      console.error('Logout failed', error.message || 'An error occurred during logout.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

