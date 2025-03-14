# Chat App

A modern real-time chat application built with React, TypeScript, and Supabase.

## Features

- Real-time messaging
- User authentication
- Chat rooms
- User profiles
- Message status tracking (sent, delivered, seen)
- Modern UI with Tailwind CSS

## Tech Stack

- React
- TypeScript
- Supabase (Backend and Real-time)
- Zustand (State Management)
- Tailwind CSS (Styling)
- Vite (Build Tool)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Jawanreadyah/chat-app2.git
cd chat-app2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase configuration:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/store` - Zustand store and actions
  - `/types` - TypeScript type definitions
  - `/pages` - Page components
  - `/lib` - Utility functions and configurations

## License

MIT
