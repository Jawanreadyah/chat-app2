import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import { useChatStore } from '../../store/chatStore';

export const Layout: React.FC = () => {
  const { isAuthenticated } = useChatStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};