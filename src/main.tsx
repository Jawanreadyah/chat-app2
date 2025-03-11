import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('main.tsx is executing');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  try {
    console.log('Creating React root');
    const root = createRoot(rootElement);
    console.log('Rendering App component');
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering React app:', error);
  }
} else {
  console.error('Root element not found!');
}
