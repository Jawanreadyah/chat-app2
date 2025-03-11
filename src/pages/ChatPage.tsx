import React from 'react';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const { chats, currentUser } = useChatStore();

  const currentChat = chatId ? chats.find(chat => chat.id === chatId) : null;

  if (!currentUser) {
    return <div className="flex-1 p-4">Please log in to view chats.</div>;
  }

  if (!currentChat && chatId) {
    return <div className="flex-1 p-4">Chat not found.</div>;
  }

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-semibold mb-2">Welcome to Chat</h2>
          <p>Select a chat from the sidebar or start a new conversation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold">{currentChat?.name}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will be rendered here */}
      </div>
    </div>
  );
};

export default ChatPage;
