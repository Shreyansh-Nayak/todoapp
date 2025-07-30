import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Authcontext'
import { BrowserRouter } from 'react-router-dom';
window.addEventListener("error", function (event) {
  console.error("Global Error:", event.message, event.error);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
