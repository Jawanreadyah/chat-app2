import { supabase } from '../../../lib/supabase';

export const loadMessages = async (chatId: string, set: any) => {
  if (!chatId) throw new Error('Chat ID is required');

  try {
    // Load messages with reactions
    const { data, error } = await supabase
      .from('messages')
      .select('*, reactions:message_reactions(*)')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    if (data) {
      const transformedMessages = data.map(msg => ({
        ...msg,
        user: msg.user_info,
        status: msg.status || 'sent',
        reactions: msg.reactions || []
      }));
      
      set(state => ({
        messages: {
          ...state.messages,
          [chatId]: transformedMessages
        }
      }));
    }

    // Subscribe to message status updates
    const statusChannel = supabase.channel('message_status_updates')
      .on(
        'broadcast',
        { event: 'message_status' },
        ({ payload }) => {
          if (payload.chatId === chatId) {
            set(state => {
              const chatMessages = state.messages[chatId] || [];
              const updatedMessages = chatMessages.map(msg => 
                msg.id === payload.messageId ? { ...msg, status: payload.status } : msg
              );
              
              return {
                messages: {
                  ...state.messages,
                  [chatId]: updatedMessages
                }
              };
            });
          }
        }
      )
      .subscribe();

    // Subscribe to typing status updates
    const typingChannel = supabase.channel('typing_status')
      .on(
        'broadcast',
        { event: 'typing_status' },
        ({ payload }) => {
          if (payload.chatId === chatId) {
            set(state => {
              const chatTypingUsers = state.typingUsers[chatId] || new Set();
              const updatedTypingUsers = new Set(chatTypingUsers);
              
              if (payload.isTyping) {
                updatedTypingUsers.add(payload.username);
              } else {
                updatedTypingUsers.delete(payload.username);
              }
              
              return {
                typingUsers: {
                  ...state.typingUsers,
                  [chatId]: updatedTypingUsers
                }
              };
            });
          }
        }
      )
      .subscribe();

    // Subscribe to reaction updates
    const reactionChannel = supabase.channel('reaction_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'message_reactions',
          filter: `message_id=in.(${data?.map(m => `"${m.id}"`).join(',') || '""'})`
        },
        () => {
          // Reload messages to get updated reactions
          loadMessages(chatId, set);
        }
      )
      .subscribe();

    return () => {
      statusChannel.unsubscribe();
      typingChannel.unsubscribe();
      reactionChannel.unsubscribe();
    };
  } catch (error) {
    console.error('Failed to load messages:', error);
    throw error;
  }
};