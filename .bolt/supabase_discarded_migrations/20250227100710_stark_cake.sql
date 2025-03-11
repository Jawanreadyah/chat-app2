/*
  # Add status column to messages table

  1. Changes
    - Add `status` column to the `messages` table to track message delivery status
    - This column will store values like 'sent', 'delivered', 'seen'
  
  2. Purpose
    - Enable tracking of message delivery status for better user experience
    - Support read receipts and delivery confirmations
*/

-- Add status column to messages table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'status'
  ) THEN
    ALTER TABLE messages ADD COLUMN status text;
  END IF;
END $$;

-- Create index for status column
CREATE INDEX IF NOT EXISTS messages_status_idx ON messages(status);