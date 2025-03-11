import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';

const SettingsPage: React.FC = () => {
  const { currentUser, updateUserProfile, logout } = useChatStore();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [status, setStatus] = useState<'online' | 'away' | 'offline'>(
    currentUser?.status || 'online'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await updateUserProfile({
        ...currentUser,
        username: username.trim(),
        avatar: avatar.trim(),
        status
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'online' | 'away' | 'offline')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
            
            <button
              type="button"
              onClick={logout}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
