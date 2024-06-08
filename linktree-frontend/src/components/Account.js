import React, { useState } from 'react';
import axios from '../axiosConfig';

const Account = ({ user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/${user.id}`, {
        user: { name, email }
      });
      setSuccess('Account information updated successfully');
      setError(null);
    } catch (error) {
      setError('Failed to update account information');
      setSuccess(null);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/${user.id}/password`, {
        user: { current_password: currentPassword, password: newPassword }
      });
      setSuccess('Password updated successfully');
      setError(null);
    } catch (error) {
      setError('Failed to update password');
      setSuccess(null);
    }
  };

  if (!user) {
    return <p>Please log in to view your account details.</p>;
  }

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h2 className="text-3xl text-center text-gray-800 mb-6">Account</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleUpdateInfo} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Update Info</button>
      </form>
      <form onSubmit={handleUpdatePassword} className="bg-white p-6 rounded shadow-md mt-6">
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {/* highlight button on hover */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Update Password</button>
      </form>
    </div>
  );
};

export default Account;
