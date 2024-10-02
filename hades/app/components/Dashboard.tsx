import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="mb-4">
        This is the main area where you can see all your data, manage your account, and access application features.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">User Profile</h2>
          <p>View and edit your profile information.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p>Manage your application settings and preferences.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p>View statistics about your activity.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p>Check your recent messages and notifications.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
