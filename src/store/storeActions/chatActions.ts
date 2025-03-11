import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { Chat, Message, User } from '../../types';

interface ChatParticipant {
  chat_id: string;
  user_name: string;
}

interface GetState {
  currentUser: User | null;
  chats: Chat[];
  userProfiles: Record<string, User>;
}

interface SetState {
  (partial: Partial<GetState> | ((state: GetState) => Partial<GetState>)): void;
}

export const loadChats = async (get: () => GetState, set: SetState): Promise<void> => {
  const currentUser = get().currentUser;
  if (!currentUser) return;

  try {
    const { data: participants, error: participantsError } = await supabase
      .from('chat_participants')
      .select('chat_id, user_name')
      .eq('user_name', currentUser.username);

    if (participantsError) throw participantsError;
    if (!participants) return;

    const chatIds = participants.map(p => p.chat_id);

    const { data: chats, error: chatsError } = await supabase
      .from('chats')
      .select('*')
      .in('id', chatIds)
      .order('created_at', { ascending: false });

    if (chatsError) throw chatsError;
    if (!chats) return;

    const { data: blockedUsers } = await supabase
      .from('blocked_users')
      .select('chat_id')
      .eq('blocker_username', currentUser.username);

    const blockedChatIds = new Set((blockedUsers || []).map(bu => bu.chat_id));
    const filteredChats = chats.filter(chat => !blockedChatIds.has(chat.id));

    set({ chats: filteredChats });
  } catch (error) {
    console.error('Error loading chats:', error);
  }
};

export const sendMessage = async (chatId: string, content: string, userInfo: User): Promise<void> => {
  try {
    const message = {
      chat_id: chatId,
      content,
      user_info: userInfo,
      created_at: new Date().toISOString(),
      status: 'sent' as const,
      reactions: []
    };

    const { error } = await supabase
      .from('messages')
      .insert([message]);

    if (error) throw error;
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const updateMessageStatus = async (messageId: string, status: 'delivered' | 'seen'): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', messageId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating message status:', error);
  }
};

export const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};