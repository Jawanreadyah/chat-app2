import React from 'react';
import { Chat } from '../../types';
import { useChatStore } from '../../store/chatStore';

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const { chats, currentUser } = useChatStore();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="divide-y divide-gray-200">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onChatSelect(chat.id)}
          className="w-full px-4 py-3 flex items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 truncate">
                {chat.name}
              </p>
              {chat.lastMessage && (
                <p className="text-xs text-gray-500">
                  {new Date(chat.lastMessage.created_at).toLocaleTimeString()}
                </p>
              )}
            </div>
            {chat.lastMessage && (
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage.content}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;
