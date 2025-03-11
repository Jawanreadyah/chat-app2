export interface User {
  username: string;
  avatar: string;
  status?: string;
}

export interface Message {
  id: string;
  chat_id: string;
  content: string;
  created_at: string;
  user_info: User;
  status: 'sent' | 'delivered' | 'seen';
  reactions: MessageReaction[];
}

export interface MessageReaction {
  id: string;
  message_id: string;
  user_name: string;
  emoji: string;
  created_at: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  created_at: string;
  last_message?: string;
  last_message_at?: string;
  participants: string[];
}

export interface ChatStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  chats: Chat[];
  messages: Record<string, Message[]>;
  unreadCounts: Record<string, number>;
  lastReadTimestamps: Record<string, string>;
  currentChatId: string | null;
  typingUsers: Record<string, Set<string>>;
  userStatuses: Record<string, string>;
  userProfiles: Record<string, User>;
  incomingCall: any | null;
  blockedUsers: string[];
  pinnedMessages: Record<string, Message[]>;
  friendNames: Record<string, Record<string, string>>;
  profileVisibility: ProfileVisibility | null;
  profileUpdates: ProfileUpdate[];
  isUpdatingProfile: boolean;
  profileUpdateError: string | null;

  setCurrentUser: (user: User) => void;
  setCurrentChatId: (chatId: string | null) => void;
  markChatAsRead: (chatId: string) => Promise<void>;
  loadUnreadCounts: () => Promise<void>;
  subscribeToNewMessages: () => () => void;
  initializeFromStorage: () => Promise<void>;
}

export interface UserStatus {
  username: string;
  status: string;
  last_seen: string;
}

export interface BlockedUser {
  chat_id: string;
  user_name: string;
  blocked_at: string;
}

export interface ProfileVisibility {
  username: string;
  show_status: boolean;
  show_avatar: boolean;
  show_last_seen: boolean;
}

export interface ProfileUpdate {
  id: string;
  username: string;
  field: string;
  old_value: string;
  new_value: string;
  updated_at: string;
}
