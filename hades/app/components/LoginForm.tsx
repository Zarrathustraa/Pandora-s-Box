import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Use Next.js's useRouter for navigation
import { login } from '../apiService'; // Ensure this API service interacts with your backend

const LoginForm: React.FC = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const router = useRouter(); // Next.js router for navigation

  // Ensure the component is client-side rendered
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Event handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const data = await login(email, password); // Assume login sends a request to your backend
      localStorage.setItem('access_token', data.access_token);
      console.log('Login successful!');
      setLoading(false);
      if (isClient) {
        router.push('/dashboard'); // Redirect to the dashboard after successful login
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button
          type="submit"
          className="w-full font-bold bg-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

