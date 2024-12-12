import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/roboto-slab';
import './index.css'
import App from './App.jsx'
if (typeof global === 'undefined') {
  window.global = window;
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />,
  // </StrictMode>,
)
