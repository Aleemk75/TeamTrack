import React, { useState } from 'react';
import ErrorMessage from '../Common/ErrorMessage';

const LoginForm = ({ onSubmit, onToggleForm, loading, error: parentError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Combine local and parent errors
  const displayError = parentError || error;

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    await onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In - Teamtrack</h1>

        <ErrorMessage message={displayError} onClose={() => setError('')} />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Please wait...' : 'Sign In'}
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <button
            onClick={onToggleForm}
            className="text-blue-600 ml-1 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;