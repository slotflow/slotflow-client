// import { StrictMode } from 'react'
import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { registerServiceWorker } from './shared/helper/registerServiceWorker.ts';

registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
)
