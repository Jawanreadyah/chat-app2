import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import { Chat } from '../../types';

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const navigate = useNavigate();
  const { chats, unreadCounts, currentChatId, setCurrentChatId } = useChatStore();

  const getTimeString = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay) {
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } else if (diff < 7 * oneDay) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handleChatClick = (chatId: string) => {
    setCurrentChatId(chatId);
    onChatSelect(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col space-y-2 p-4">
      {chats.map((chat: Chat) => (
        <div
          key={chat.id}
          className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
            currentChatId === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => handleChatClick(chat.id)}
        >
          <div className="relative">
            <img
              src={chat.avatar || '/default-avatar.png'}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold truncate">{chat.name}</h3>
              <div className="flex items-center space-x-2">
                {unreadCounts[chat.id] > 0 && (
                  <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCounts[chat.id]}
                  </div>
                )}
                <span className="text-xs text-gray-400">
                  {getTimeString(chat.last_message_at || chat.created_at)}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 truncate">
              {chat.last_message || 'No messages yet'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;