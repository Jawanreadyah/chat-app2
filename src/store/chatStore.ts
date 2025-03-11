import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Chat } from '../types';
import { loadChats } from './storeActions/chatActions';

interface ChatStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  chats: Chat[];
  userProfiles: Record<string, User>;
  login: (username: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (user: User) => Promise<void>;
  initializeFromStorage: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      chats: [],
      userProfiles: {},

      login: async (username: string) => {
        if (!username.trim()) {
          throw new Error('Username is required');
        }

        const user: User = {
          id: Math.random().toString(36).substring(2),
          username: username.trim(),
          status: 'online',
          lastSeen: new Date().toISOString()
        };

        set({ currentUser: user, isAuthenticated: true });
        await loadChats(get, set);
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false, chats: [] });
      },

      updateUserProfile: async (user: User) => {
        set({ currentUser: user });
      },

      initializeFromStorage: () => {
        const state = get();
        if (state.currentUser) {
          set({ isAuthenticated: true });
          loadChats(get, set);
        }
      }
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({
        currentUser: state.currentUser
      })
    }
  )
);