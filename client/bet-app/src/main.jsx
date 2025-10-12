import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BetslipProvider } from './Contexts/BetslipContext/BetslipContext.jsx'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <BetslipProvider>
          <App />
        </BetslipProvider>
      </AuthProvider>
  </StrictMode>
)
