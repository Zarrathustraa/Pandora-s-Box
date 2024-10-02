import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import Dashboard from './components/Dashboard';
import LogoutButton from './components/Logout'; // Corrected the component name

// Your main App component
const App: React.FC = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<LoginForm />} />
      
      {/* Signup Route */}
      <Route path="/signup" element={<SignupForm />} />
      
      {/* Dashboard Route - Protected Route */}
      <Route
        path="/dashboard"
        element={
          localStorage.getItem('access_token') ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Logout Route */}
      <Route path="/logout" element={<LogoutButton />} />

      {/* Redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;



