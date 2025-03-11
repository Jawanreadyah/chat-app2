export interface User {
  id: string;
  username: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface Chat {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  lastMessage?: Message;
  participants?: User[];
}

export interface Message {
  id: string;
  chat_id: string;
  content: string;
  user_info: User;
  created_at: string;
  status: 'sent' | 'delivered' | 'seen';
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  user: User;
  created_at: string;
}
