import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useChatStore } from './store/chatStore';
import Layout from './components/layout/Layout';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  const { initializeFromStorage } = useChatStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<ChatPage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;