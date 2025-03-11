/*
  # Message Read Status Tracking

  1. New Tables
    - `message_read_status`
      - `message_id` (text) - Reference to the message
      - `user_name` (text) - Reference to the user
      - `chat_id` (text) - Reference to the chat
      - `read_at` (timestamptz) - When the message was read
      - Composite primary key (message_id, user_name)

  2. Changes
    - Add foreign key constraints
    - Enable RLS for security
    - Add policies for read/write access
*/

CREATE TABLE IF NOT EXISTS message_read_status (
  message_id text NOT NULL,
  user_name text NOT NULL,
  chat_id text NOT NULL,
  read_at timestamptz DEFAULT now(),
  PRIMARY KEY (message_id, user_name),
  FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
  FOREIGN KEY (user_name) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE message_read_status ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own message status"
  ON message_read_status
  FOR SELECT
  TO public
  USING (user_name = auth.uid());

CREATE POLICY "Users can update their own message status"
  ON message_read_status
  FOR INSERT
  TO public
  WITH CHECK (user_name = auth.uid());

-- Function to get unread message count for a chat
CREATE OR REPLACE FUNCTION get_unread_count(p_chat_id text, p_user_name text)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM messages m
    LEFT JOIN message_read_status mrs
      ON m.id = mrs.message_id
      AND mrs.user_name = p_user_name
    WHERE m.chat_id = p_chat_id
      AND m.user_info->>'username' != p_user_name
      AND mrs.read_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
