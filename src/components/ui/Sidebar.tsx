import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import ChatList from './ChatList';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useChatStore();

  const handleChatSelect = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser?.avatar || '/default-avatar.png'}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold">{currentUser?.username}</h2>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ChatList onChatSelect={handleChatSelect} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/settings"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
