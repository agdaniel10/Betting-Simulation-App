import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BetslipProvider } from './Contexts/BetslipContext/BetslipContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BetslipProvider>
      <App />
    </BetslipProvider>
  </StrictMode>,
)
