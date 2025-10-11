import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BetslipProvider } from './Contexts/BetslipContext/BetslipContext.jsx'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext/AuthContext.jsx'
import { DepositProvider } from './Contexts/DepositContext/DepositContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DepositProvider>
      <AuthProvider>
        <BetslipProvider>
          <App />
        </BetslipProvider>
      </AuthProvider>
    </DepositProvider>
  </StrictMode>,
)
